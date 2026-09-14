# Revisión de dependencias

- Fecha y hora de revisión: 2026-08-06 13:29:23 -06:00 (America/Mexico_City)
- Node.js: `v24.16.0`
- npm: `11.13.0`
- Registry: `https://registry.npmjs.org/`
- Lockfile: `package-lock.json` versión 3, con 446 entradas (raíz incluida).

## Dependencias directas revisadas

Todas las versiones están fijadas de forma exacta en `package.json`, sin rangos, dependencias Git, `file:`, URL externas ni paquetes locales. Antes de crear el lockfile se consultaron los metadatos de npm para cada una: nombre, versión, integridad, `shasum`, repositorio, scripts y fecha de publicación.

| Paquete | Versión | Repositorio oficial verificado |
| --- | --- | --- |
| `next` | `16.3.0` | `vercel/next.js` |
| `react` | `19.2.6` | `facebook/react` |
| `react-dom` | `19.2.6` | `facebook/react` |
| `lucide-react` | `0.563.0` | `lucide-icons/lucide` |
| `typescript` | `5.9.3` | `microsoft/TypeScript` |
| `@types/node` | `20.19.13` | `DefinitelyTyped/DefinitelyTyped` |
| `@types/react` | `19.2.2` | `DefinitelyTyped/DefinitelyTyped` |
| `@types/react-dom` | `19.2.2` | `DefinitelyTyped/DefinitelyTyped` |
| `tailwindcss` | `4.1.17` | `tailwindlabs/tailwindcss` |
| `@tailwindcss/postcss` | `4.1.17` | `tailwindlabs/tailwindcss` |
| `eslint` | `9.39.2` | `eslint/eslint` |
| `eslint-config-next` | `16.3.0` | `vercel/next.js` |

## Decisiones de seguridad

- Se rechazó `react` y `react-dom` `19.2.4` por avisos altos de React Server Components. Se fijaron `19.2.6`, versiones posteriores a los parches revisados.
- Se rechazó `next` `16.2.12`: la auditoría indicó `postcss` y `sharp` vulnerables. Se fijó `next@16.3.0`, publicación estable de Vercel del 2026-08-03, que usa `postcss@8.5.23` y `sharp@0.35.3`.
- Se fijaron dos ramas transitivas con `overrides`, tras consultar sus metadatos oficiales, para eliminar la alerta alta de `brace-expansion`: `minimatch@3.1.5 > brace-expansion@1.1.18` y `@typescript-eslint/typescript-estree@8.65.0 > minimatch@10.2.6 > brace-expansion@5.0.9`.
- Se revisaron GitHub Advisory Database, avisos oficiales de GitHub, metadata y páginas de npm, y repositorios oficiales. Las versiones bloqueadas conocidas del encargo no están presentes como dependencias directas ni transitivas.
- La revisión estática del lockfile comprobó 445 paquetes: todas las entradas resueltas tienen `integrity` y URL bajo `https://registry.npmjs.org/`; no hay referencias Git, `file:`, directorios ni tarballs/URL externos.

## Scripts de ciclo de vida

Se generó el lockfile con `npm install --package-lock-only --ignore-scripts` y se instaló con `npm ci --ignore-scripts`. No se ejecutó ningún script de dependencias.

El escaneo local detectó 22 scripts de ciclo de vida declarados por dependencias transitivas (21 `prepare` y un `postinstall`): `@eslint/eslintrc`, `eslint-visitor-keys`, `@humanfs/core`, `@humanfs/node`, `@humanfs/types`, `@humanwhocodes/module-importer`, `@humanwhocodes/retry`, `balanced-match`, `brace-expansion`, `minimatch`, `acorn`, `axe-core`, `enhanced-resolve`, `globals`, `is-bun-module`, `keyv`, `lightningcss`, `ts-api-utils`, `unrs-resolver` y `zod-validation-error` (algunos aparecen en más de una ruta).

`unrs-resolver@1.12.2` declara `postinstall: node postinstall.js` para bindings N-API opcionales. Se inspeccionó en metadata oficial y no se aprobó ni ejecutó. El proyecto compila sin habilitarlo.

## Resultados posteriores a la instalación

| Verificación | Resultado |
| --- | --- |
| `npm audit --audit-level=high` | Correcto: `found 0 vulnerabilities`. |
| `npm audit signatures` | Correcto: 359 paquetes con firmas verificadas de registry y 82 con atestaciones verificadas. |
| `npm ls --all` | Correcto (código 0). Muestra únicamente dependencias opcionales de otras plataformas como no instaladas. |
| `npm run security:check` | Correcto. Revisó 25,057 archivos y 359 manifests instalados; no encontró versiones bloqueadas, `setup.mjs`, `Math_Symbol.js`, URLs externas ni indicadores sospechosos. |
| `npm run typecheck` | Correcto. |
| `npm run lint` | Correcto. |
| `npm run build` | Correcto. Generó `/` y `/precios` como rutas estáticas. |

## SBOM

El inventario CycloneDX está en [`sbom.cdx.json`](./sbom.cdx.json). Fue generado localmente con `npm sbom --sbom-format=cyclonedx` y no incluye secretos del proyecto.

## Corrección controlada de `js-yaml` (2026-08-06)

- Dependencia de origen: `eslint@9.39.2` > `@eslint/eslintrc@3.3.6` > `js-yaml@4.3.0` (sólo en el árbol de desarrollo).
- Hallazgo anterior: `CVE-2026-59870` / `GHSA-5p4m-2wfm-xmqj`, reportado por npm para `js-yaml >=4.0.0 <4.3.1`.
- Versión corregida: `js-yaml@4.3.1`. Se conservó la rama mayor 4 y no se actualizó ESLint ni `@eslint/eslintrc`, ya que éste declara compatibilidad con `^4.3.0`.
- Método aplicado: override exacto en `package.json`: `"js-yaml": "4.3.1"`. El lockfile cambió únicamente la entrada transitiva `node_modules/js-yaml`, de `4.3.0` a `4.3.1`.
- `npm explain js-yaml`: confirma `js-yaml@4.3.1 dev overridden`, introducido por `@eslint/eslintrc@3.3.6`.
- `npm ls js-yaml --all`: muestra una sola instalación, `js-yaml@4.3.1 overridden`; no queda `4.3.0`.
- `npm ci --ignore-scripts`: correcto; instaló 359 paquetes y auditó 360 sin vulnerabilidades. Los scripts de instalación permanecieron bloqueados.
- `npm run security:check`: correcto; revisó 25,057 archivos y 359 `package.json`, sin versiones bloqueadas ni indicadores sospechosos. Conserva 30 advertencias contextuales de dependencias con scripts de ciclo de vida, todos bloqueados por `ignore-scripts=true`.
- `npm audit --audit-level=high`: correcto, `found 0 vulnerabilities`. La comparación de `npm-audit-before.json` y `npm-audit-after.json` pasó de 1 vulnerabilidad alta a 0 altas y 0 críticas; el advisory de `js-yaml` desapareció y no aparecieron nuevos advisories.
- `npm audit signatures`: correcto; 359 paquetes con firmas de registry verificadas y 82 con atestaciones verificadas.
- `npm run typecheck`, `npm run lint` y `npm run build`: correctos. El build de Next.js 16.3.0 genera `/` y `/precios` como rutas estáticas.
- Se preservaron `.npmrc`, el registry oficial, `save-exact=true`, `ignore-scripts=true`, `package-lock.json` y los controles de seguridad existentes. El lockfile no contiene URLs `resolved` fuera de `https://registry.npmjs.org/`, integridades faltantes ni dependencias Git, `file:` o URL externas.
- No se utilizó `npm audit fix`, `npm audit fix --force`, ni se actualizó ninguna dependencia no relacionada.
- Para liberar el binario nativo bloqueado de `lightningcss`, sólo se detuvieron los procesos de desarrollo de TheiraMedical: npm (PID 16100), Next/Turbopack (36356), servidor del puerto 3000 (50032) y worker de PostCSS (49984). No se detuvieron procesos Node de Codex ni de otros proyectos.

Las comprobaciones disponibles confirman que el hallazgo conocido fue corregido; no constituyen una garantía absoluta de seguridad futura.

## Advertencias registradas

- npm 11.13.0 advierte que `allow-remote=none` aún no es un ajuste reconocido. Se conserva en `.npmrc` por requisito del proyecto; las validaciones del lockfile y del script local rechazan de forma explícita cualquier URL `resolved` externa y dependencia Git/URL/`file:`/directorio.
- El escaneo encontró referencias de texto a `Math_Symbol` en analizadores de expresiones regulares empaquetados (`@eslint-community/regexpp`, `acorn`, `jiti` y copias compiladas de Next). No existe ningún archivo `Math_Symbol.js`, ningún `setup.mjs` ni script de ciclo de vida asociado; se registró como coincidencia contextual, no como indicador ejecutable.
- Los scripts de ciclo de vida listados arriba se mantienen bloqueados por `ignore-scripts=true`; no se habilitaron de forma automática.

Las dependencias fueron revisadas contra las fuentes y alertas disponibles en la fecha indicada; esto reduce el riesgo, pero no garantiza la ausencia absoluta de amenazas futuras.
