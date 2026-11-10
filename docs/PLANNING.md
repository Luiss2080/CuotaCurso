# Plan de desarrollo — CuotaCurso

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Grupos y miembros

**Estimación:** 4 días.

**Objetivo:** grupos (curso, comité, junta) con cuota y período; miembros con teléfono y estado de pago.

**Tareas**

- [ ] Consultas de `grupos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `miembros` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: grupos (curso, comité, junta) con cuota y período.
- [ ] Pantalla(s) y formulario(s) para: miembros con teléfono y estado de pago.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Grupos (curso, comité, junta) con cuota y período: funciona sin internet y persiste al reiniciar.
- [ ] Miembros con teléfono y estado de pago: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Cuotas y deudores

**Estimación:** 4 días.

**Objetivo:** cobro de cuotas y lista de deudores con aviso por WhatsApp.

**Tareas**

- [ ] Consultas de `cuotas` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: cobro de cuotas y lista de deudores con aviso por WhatsApp.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Cobro de cuotas y lista de deudores con aviso por WhatsApp: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — Gastos del grupo

**Estimación:** 3 días.

**Objetivo:** gastos del grupo con concepto y monto.

**Tareas**

- [ ] Consultas de `gastos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: gastos del grupo con concepto y monto.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Gastos del grupo con concepto y monto: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — Rendición de cuentas en PDF

**Estimación:** 3 días.

**Objetivo:** rendición de cuentas en PDF: ingresos, gastos y saldo.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: rendición de cuentas en PDF: ingresos, gastos y saldo.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Rendición de cuentas en PDF: ingresos, gastos y saldo: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
