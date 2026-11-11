# Plan de desarrollo — CuotaCurso

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Grupos y miembros | 3 | 5 |
| 3 | Cuotas y deudores | 4 | 9 |
| 4 | Gastos del grupo | 3 | 12 |
| 5 | Rendición de cuentas en PDF | 3 | 15 |

Total: **15 días** (~3 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Grupos y miembros

**Estimación:** 3 días. **Rama sugerida:** `fase-2-grupos-y-miembros`.

**Objetivo:** Grupos y miembros.

**Historias que se completan:** HU-01 (Crear grupos con cuota y período), HU-02 (Cargar miembros).

**Tareas**

- [ ] **F2-T1** CRUD de grupos y miembros.
- [ ] **F2-T2** Validación de cuota, período y teléfono.
- [ ] **F2-T3** Pantallas de lista y detalle.
- [ ] **F2-T4** Baja de miembros sin perder su historial.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — el formulario de grupo → defino cuota 30 Bs mensual → se crea el grupo y puedo agregar miembros.
- [ ] HU-01 — cuota vacía o 0 → intento guardar → la app pide una cuota mayor a 0.
- [ ] HU-02 — una lista de 25 miembros → los agrego → se genera su cuota pendiente en el período activo.
- [ ] HU-02 — un miembro nuevo a mitad de período → lo agrego → se le genera su cuota del período actual.

**Criterio de salida:**

- [ ] Puedo cargar un grupo de 30 miembros y verlo tras reiniciar.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Cuotas y deudores

**Estimación:** 4 días. **Rama sugerida:** `fase-3-cuotas-y-deudores`.

**Objetivo:** Cuotas y deudores.

**Historias que se completan:** HU-03 (Cobrar cuotas y ver deudores), HU-04 (Avisar a deudores).

**Tareas**

- [ ] **F3-T1** Apertura de período que genera cuotas pendientes por miembro en una transacción.
- [ ] **F3-T2** Marcar y desmarcar cuotas pagadas.
- [ ] **F3-T3** Función pura de deuda por miembro con pruebas.
- [ ] **F3-T4** Pantalla Deudores y aviso por WhatsApp.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — una cuota pendiente → la marco pagada → el total cobrado sube y el miembro sale de deudores.
- [ ] HU-03 — miembros con cuota pendiente → abro Deudores → veo la lista con el monto adeudado.
- [ ] HU-04 — un deudor con teléfono → toco «Avisar» → se abre WhatsApp con el mensaje prellenado.

**Criterio de salida:**

- [ ] La lista de deudores coincide con los casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Gastos del grupo

**Estimación:** 3 días. **Rama sugerida:** `fase-4-gastos-del-grupo`.

**Objetivo:** Gastos del grupo.

**Historias que se completan:** HU-05 (Registrar gastos).

**Tareas**

- [ ] **F4-T1** CRUD de gastos con concepto, monto y fecha.
- [ ] **F4-T2** Cálculo del saldo con función pura y pruebas.
- [ ] **F4-T3** Confirmación al dejar el saldo negativo.
- [ ] **F4-T4** Lista de gastos por período.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — un gasto de 200 Bs → lo registro con concepto «Material de limpieza» → el saldo baja en 200 Bs.
- [ ] HU-05 — un gasto mayor al saldo → intento guardarlo → la app pide confirmación explícita por dejar saldo negativo.

**Criterio de salida:**

- [ ] El saldo siempre coincide con cobrado − gastado.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Rendición de cuentas en PDF

**Estimación:** 3 días. **Rama sugerida:** `fase-5-rendicion-de-cuentas-en-pdf`.

**Objetivo:** Rendición de cuentas en PDF.

**Historias que se completan:** HU-06 (Rendición de cuentas en PDF).

**Tareas**

- [ ] **F5-T1** Consulta de ingresos, gastos y saldo por período.
- [ ] **F5-T2** Plantilla HTML de la rendición.
- [ ] **F5-T3** Generación con expo-print y compartir con expo-sharing.
- [ ] **F5-T4** Pruebas del armado de datos.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-06 — un período con ingresos y gastos → toco «Rendición PDF» → se genera un PDF con ingresos, gastos y saldo y se abre el menú de compartir.

**Criterio de salida:**

- [ ] El PDF coincide con los números de la app.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Grupos y miembros

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de grupos y miembros.; `F2-T2` Validación de cuota, período y teléfono.; `F2-T3` Pantallas de lista y detalle..
- **Día 4** (día 2 de la fase): `F2-T4` Baja de miembros sin perder su historial.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Cuotas y deudores

- **Día 6** (día 1 de la fase): `F3-T1` Apertura de período que genera cuotas pendientes por miembro en una transacción.; `F3-T2` Marcar y desmarcar cuotas pagadas..
- **Día 7** (día 2 de la fase): `F3-T3` Función pura de deuda por miembro con pruebas.; `F3-T4` Pantalla Deudores y aviso por WhatsApp..
- **Día 8** (día 3 de la fase): `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 9** (día 4 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Gastos del grupo

- **Día 10** (día 1 de la fase): `F4-T1` CRUD de gastos con concepto, monto y fecha.; `F4-T2` Cálculo del saldo con función pura y pruebas.; `F4-T3` Confirmación al dejar el saldo negativo..
- **Día 11** (día 2 de la fase): `F4-T4` Lista de gastos por período.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Rendición de cuentas en PDF

- **Día 13** (día 1 de la fase): `F5-T1` Consulta de ingresos, gastos y saldo por período.; `F5-T2` Plantilla HTML de la rendición.; `F5-T3` Generación con expo-print y compartir con expo-sharing..
- **Día 14** (día 2 de la fase): `F5-T4` Pruebas del armado de datos.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 15** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
