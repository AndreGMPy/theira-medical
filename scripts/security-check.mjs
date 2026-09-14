import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const lockfilePath = path.join(projectRoot, "package-lock.json");
const rootManifestPath = path.join(projectRoot, "package.json");
const modulesPath = path.join(projectRoot, "node_modules");

const registryPrefix = "https://registry.npmjs.org/";
const blockedVersions = new Set([
  "keyv@6.0.0",
  "flat-cache@6.1.24",
  "file-entry-cache@11.1.6",
  "cacheable-request@13.0.20",
  "cacheable@2.5.1",
  "@cacheable/memory@2.2.1",
  "cache-manager@7.2.10",
  "@cacheable/node-cache@3.1.2",
  "@cacheable/utils@2.5.1",
  "@cacheable/net@2.1.1",
  "ecto@5.0.1",
  "@deliveroo/reevent@1.0.1",
  "@or-sdk/invitations@1.4.9",
  "@picsart/ai-sdk@3.32.2",
  "@qlik/embed-runtime@1.6.4",
  "picasso.js@2.11.6",
]);

const lifecycleScripts = new Set(["preinstall", "install", "postinstall", "prepare"]);
const allowedRootScripts = new Set([
  "dev",
  "build",
  "start",
  "lint",
  "typecheck",
  "security:check",
  "security:sbom",
]);
const suspiciousNames = new Set(["setup.mjs", "math_symbol.js"]);
const suspiciousStrings = [
  "npm-cache.com",
  "shai-hulud",
  "math_symbol",
  "node setup.mjs",
];
const prohibitedSpecs = /^(?:git\+|git:|github:|https?:|ssh:|file:|link:|\.\.?[\\/])/i;
const suspiciousLifecycleCommand = /(powershell(?:\.exe)?|cmd(?:\.exe)?|\bbash\b|\bcurl\b|\bwget\b|invoke-webrequest|npm-cache\.com|process\.env)/i;
const jsExtensions = new Set([".js", ".mjs", ".cjs"]);

const failures = [];
const warnings = [];
const foundLifecycleScripts = [];
const packageRoots = new Map();
let scannedFiles = 0;
let scannedPackages = 0;

function relative(filePath) {
  return path.relative(projectRoot, filePath).replaceAll("\\", "/");
}

function fail(message, filePath, packageLabel = "desconocido") {
  failures.push({ message, path: relative(filePath), package: packageLabel });
}

function warn(message, filePath, packageLabel = "desconocido") {
  warnings.push({ message, path: relative(filePath), package: packageLabel });
}

function readJson(filePath, packageLabel = "proyecto") {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`JSON inválido o ilegible: ${error instanceof Error ? error.message : String(error)}`, filePath, packageLabel);
    return null;
  }
}

function packageNameFromLockPath(lockPath, entry) {
  if (entry?.name) return entry.name;
  const marker = "node_modules/";
  const index = lockPath.lastIndexOf(marker);
  return index === -1 ? "desconocido" : lockPath.slice(index + marker.length);
}

function packageLabel(manifest) {
  return `${manifest.name ?? "desconocido"}@${manifest.version ?? "sin-versión"}`;
}

function isExternalSpec(spec) {
  return typeof spec === "string" && prohibitedSpecs.test(spec);
}

function inspectDependencySpecs(specs, filePath, label, field) {
  for (const [name, spec] of Object.entries(specs ?? {})) {
    if (isExternalSpec(spec)) {
      fail(`Dependencia ${field} no permitida: ${name} -> ${spec}`, filePath, label);
    }
  }
}

function inspectScriptContent(filePath, label) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    warn("El archivo objetivo de un script de ciclo de vida no está presente.", filePath, label);
    return;
  }

  const stats = fs.statSync(filePath);
  if (stats.size > 2 * 1024 * 1024) {
    fail("Archivo JavaScript de ciclo de vida anormalmente grande (>2 MB).", filePath, label);
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  inspectTextIndicators(content, filePath, label);

  const longestLine = content.split(/\r?\n/).reduce((longest, line) => Math.max(longest, line.length), 0);
  const obfuscationTokens = (content.match(/(?:eval\(|new Function|String\.fromCharCode|Buffer\.from\([^,]+,\s*["']base64)/g) ?? []).length;
  if (stats.size > 256 * 1024 && longestLine > 10_000 && obfuscationTokens > 1) {
    fail("Archivo JavaScript grande y potencialmente ofuscado asociado a un script de ciclo de vida.", filePath, label);
  }
}

function inspectTextIndicators(content, filePath, label) {
  const lower = content.toLowerCase();
  for (const indicator of suspiciousStrings.filter((item) => item !== "math_symbol")) {
    if (lower.includes(indicator)) {
      fail(`Indicador conocido de malware detectado: ${indicator}`, filePath, label);
    }
  }
  if (lower.includes("math_symbol.js")) {
    fail("Referencia bloqueada a Math_Symbol.js detectada.", filePath, label);
  } else if (lower.includes("math_symbol")) {
    warn("Cadena Math_Symbol detectada sin archivo o script asociado; requiere trazabilidad contextual.", filePath, label);
  }
}

function inspectLifecycleScript(name, command, manifestPath, label) {
  foundLifecycleScripts.push({ package: label, path: relative(manifestPath), script: `${name}: ${command}` });
  if (suspiciousLifecycleCommand.test(command)) {
    fail(`Comando de ciclo de vida sospechoso: ${name}: ${command}`, manifestPath, label);
  } else {
    warn(`Script de ciclo de vida presente y bloqueado por npm: ${name}: ${command}`, manifestPath, label);
  }

  const nodeMatch = command.match(/^node\s+(?:\.\/)?([^\s;&|]+)$/);
  if (nodeMatch) {
    inspectScriptContent(path.resolve(path.dirname(manifestPath), nodeMatch[1]), label);
  }
}

function inspectManifest(manifestPath, expectedEntry) {
  const manifest = readJson(manifestPath);
  if (!manifest) return;

  if (!expectedEntry) {
    inspectTextIndicators(JSON.stringify(manifest), manifestPath, "manifiesto interno");
    return;
  }

  scannedPackages += 1;
  const label = packageLabel(manifest);
  packageRoots.set(path.dirname(manifestPath), { manifest, label });

  if (!manifest.name || !manifest.version) {
    fail("package.json sin nombre o versión.", manifestPath, label);
  }
  if (blockedVersions.has(label)) {
    fail("Versión incluida en la lista de versiones comprometidas bloqueadas.", manifestPath, label);
  }
  if (expectedEntry && expectedEntry.version !== manifest.version) {
    fail(`La versión instalada (${manifest.version}) no coincide con el lockfile (${expectedEntry.version}).`, manifestPath, label);
  }

  inspectDependencySpecs(manifest.dependencies, manifestPath, label, "dependencies");
  inspectDependencySpecs(manifest.optionalDependencies, manifestPath, label, "optionalDependencies");
  for (const [scriptName, command] of Object.entries(manifest.scripts ?? {})) {
    if (lifecycleScripts.has(scriptName) && typeof command === "string") {
      inspectLifecycleScript(scriptName, command, manifestPath, label);
    }
  }
}

function inspectRootManifest() {
  const manifest = readJson(rootManifestPath);
  if (!manifest) return;
  const scripts = manifest.scripts ?? {};
  for (const scriptName of Object.keys(scripts)) {
    if (!allowedRootScripts.has(scriptName)) {
      fail(`Script de proyecto no permitido: ${scriptName}`, rootManifestPath, "proyecto");
    }
  }
  for (const scriptName of lifecycleScripts) {
    if (scripts[scriptName]) {
      fail(`Script de ciclo de vida no permitido en el proyecto: ${scriptName}`, rootManifestPath, "proyecto");
    }
  }
  inspectDependencySpecs(manifest.dependencies, rootManifestPath, "proyecto", "dependencies");
  inspectDependencySpecs(manifest.devDependencies, rootManifestPath, "proyecto", "devDependencies");
}

function inspectLockfile() {
  const lockfile = readJson(lockfilePath, "lockfile");
  if (!lockfile) return new Map();
  const entries = new Map(Object.entries(lockfile.packages ?? {}));

  for (const [lockPath, entry] of entries) {
    if (lockPath === "") continue;
    const name = packageNameFromLockPath(lockPath, entry);
    const label = `${name}@${entry.version ?? "sin-versión"}`;
    if (blockedVersions.has(label)) {
      fail("Versión incluida en la lista de versiones comprometidas bloqueadas.", lockfilePath, label);
    }
    if (entry.resolved && !entry.resolved.startsWith(registryPrefix)) {
      fail(`URL resolved fuera del registro oficial: ${entry.resolved}`, lockfilePath, label);
    }
    if (entry.resolved && !entry.integrity) {
      fail("Entrada resuelta sin integrity.", lockfilePath, label);
    }
    inspectDependencySpecs(entry.dependencies, lockfilePath, label, "dependencies");
    inspectDependencySpecs(entry.optionalDependencies, lockfilePath, label, "optionalDependencies");
    inspectDependencySpecs(entry.peerDependencies, lockfilePath, label, "peerDependencies");
  }
  return entries;
}

function lockEntryForManifest(manifestPath, lockEntries) {
  const relativePath = relative(path.dirname(manifestPath));
  return lockEntries.get(relativePath);
}

function walk(directory, lockEntries) {
  let entries;
  try {
    entries = fs.readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    fail(`No fue posible leer el directorio: ${error instanceof Error ? error.message : String(error)}`, directory);
    return;
  }

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".cache") continue;
      walk(filePath, lockEntries);
      continue;
    }
    if (!entry.isFile()) continue;

    scannedFiles += 1;
    const activePackage = [...packageRoots.entries()]
      .filter(([packageRoot]) => filePath.startsWith(`${packageRoot}${path.sep}`))
      .sort(([left], [right]) => right.length - left.length)[0]?.[1];
    const label = activePackage?.label ?? "desconocido";
    const normalizedName = entry.name.toLowerCase();

    if (suspiciousNames.has(normalizedName)) {
      fail(`Nombre de archivo bloqueado detectado: ${entry.name}`, filePath, label);
    }

    if (entry.name === "package.json") {
      inspectManifest(filePath, lockEntryForManifest(filePath, lockEntries));
      continue;
    }

    if (jsExtensions.has(path.extname(entry.name).toLowerCase())) {
      const stats = fs.statSync(filePath);
      if (stats.size <= 2 * 1024 * 1024) {
        inspectTextIndicators(fs.readFileSync(filePath, "utf8"), filePath, label);
      }
    }
  }
}

if (!fs.existsSync(lockfilePath) || !fs.existsSync(rootManifestPath) || !fs.existsSync(modulesPath)) {
  console.error("Faltan package.json, package-lock.json o node_modules; no se puede realizar la revisión local completa.");
  process.exit(1);
}

inspectRootManifest();
const lockEntries = inspectLockfile();
walk(modulesPath, lockEntries);

console.log(`Archivos revisados: ${scannedFiles}`);
console.log(`package.json revisados: ${scannedPackages}`);
console.log(`Scripts de ciclo de vida detectados: ${foundLifecycleScripts.length}`);
for (const item of foundLifecycleScripts) {
  console.log(`LIFECYCLE ${item.package} | ${item.path} | ${item.script}`);
}

if (warnings.length) {
  console.log(`Advertencias: ${warnings.length}`);
  for (const item of warnings) {
    console.log(`WARNING ${item.package} | ${item.path} | ${item.message}`);
  }
}

if (failures.length) {
  console.error(`Hallazgos sospechosos: ${failures.length}`);
  for (const item of failures) {
    console.error(`FAIL ${item.package} | ${item.path} | ${item.message}`);
  }
  process.exit(1);
}

console.log("Revisión local aprobada: sin versiones bloqueadas, archivos o indicadores sospechosos.");
