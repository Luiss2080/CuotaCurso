# Especificación del MVP — CuotaCurso

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que la directiva sepa quién pagó la cuota, en qué se gastó y cuánto queda, y que lo pueda mostrar a los padres.

**Problema:** Las cuotas de cursos, comités y juntas se llevan en cuadernos o chats; hay dudas sobre quién pagó, no se sabe el saldo y rendir cuentas es un dolor de cabeza.

**Cómo se resuelve hoy:** Cuaderno de tesorería, planillas y chats de WhatsApp.

**Usuario objetivo:** Tesorero de un curso de colegio, comité, junta vecinal o centro de estudiantes con 10 a 80 miembros.

**Métricas de éxito del MVP:**

- Ver en una pantalla quién pagó y quién debe del período.
- Registrar un gasto con su concepto en menos de 20 segundos.
- Generar la rendición de cuentas en PDF sin planillas.

## 2. Alcance del MVP

### Incluido

- Grupos (curso, comité, junta) con cuota y período.
- Miembros con teléfono y estado de pago.
- Cobro de cuotas y lista de deudores con aviso por WhatsApp.
- Gastos del grupo con concepto y monto.
- Rendición de cuentas en PDF: ingresos, gastos y saldo.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Cada grupo define una cuota y un período (mensual, trimestral o único).
- **RN-02** Al crear un período se genera una cuota pendiente por cada miembro activo.
- **RN-03** Un miembro debe cuando su cuota del período está pendiente.
- **RN-04** Saldo del grupo = total cobrado − total gastado.
- **RN-05** Un gasto no puede dejar el saldo en negativo sin una confirmación explícita.
- **RN-06** La rendición de cuentas lista ingresos, gastos y saldo del período elegido.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Crear grupos con cuota y período

**Como** tesorero **quiero** crear un grupo con su cuota y período **para** empezar a cobrar.

**Fase:** 2 — Grupos y miembros

**Criterios de aceptación:**

1. **Dado:** el formulario de grupo. **Cuando:** defino cuota 30 Bs mensual. **Entonces:** se crea el grupo y puedo agregar miembros.
2. **Dado:** cuota vacía o 0. **Cuando:** intento guardar. **Entonces:** la app pide una cuota mayor a 0.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Cargar miembros

**Como** tesorero **quiero** agregar miembros con su teléfono **para** tener la lista de quienes pagan.

**Fase:** 2 — Grupos y miembros

**Criterios de aceptación:**

1. **Dado:** una lista de 25 miembros. **Cuando:** los agrego. **Entonces:** se genera su cuota pendiente en el período activo.
2. **Dado:** un miembro nuevo a mitad de período. **Cuando:** lo agrego. **Entonces:** se le genera su cuota del período actual.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Cobrar cuotas y ver deudores

**Como** tesorero **quiero** marcar quién pagó y ver quién debe **para** cobrar a quienes faltan.

**Fase:** 3 — Cuotas y deudores

**Criterios de aceptación:**

1. **Dado:** una cuota pendiente. **Cuando:** la marco pagada. **Entonces:** el total cobrado sube y el miembro sale de deudores.
2. **Dado:** miembros con cuota pendiente. **Cuando:** abro Deudores. **Entonces:** veo la lista con el monto adeudado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Avisar a deudores

**Como** tesorero **quiero** avisar por WhatsApp a los deudores **para** recordarles sin llamar uno por uno.

**Fase:** 3 — Cuotas y deudores

**Criterios de aceptación:**

1. **Dado:** un deudor con teléfono. **Cuando:** toco «Avisar». **Entonces:** se abre WhatsApp con el mensaje prellenado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Registrar gastos

**Como** tesorero **quiero** anotar gastos con concepto y monto **para** justificar el uso del dinero.

**Fase:** 4 — Gastos del grupo

**Criterios de aceptación:**

1. **Dado:** un gasto de 200 Bs. **Cuando:** lo registro con concepto «Material de limpieza». **Entonces:** el saldo baja en 200 Bs.
2. **Dado:** un gasto mayor al saldo. **Cuando:** intento guardarlo. **Entonces:** la app pide confirmación explícita por dejar saldo negativo.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Rendición de cuentas en PDF

**Como** tesorero **quiero** generar la rendición del período **para** mostrar transparencia a los padres.

**Fase:** 5 — Rendición de cuentas en PDF

**Criterios de aceptación:**

1. **Dado:** un período con ingresos y gastos. **Cuando:** toco «Rendición PDF». **Entonces:** se genera un PDF con ingresos, gastos y saldo y se abre el menú de compartir.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Grupos con saldo y deudores | Crear grupo |
| Detalle de grupo | Pestañas Miembros, Cuotas, Gastos y Resumen | Abrir período, agregar miembro o gasto |
| Miembros | Lista con estado de pago del período | Agregar, editar, dar de baja |
| Cuotas y deudores | Estado por miembro y total adeudado | Marcar pagada, avisar |
| Gastos | Lista con concepto, monto y fecha | Registrar gasto |
| Rendición | Ingresos, gastos y saldo del período | Compartir PDF |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `grupos`

Cada curso o comité con su cuota y período.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `cuota` | REAL | Obligatorio; Por defecto 0 |
| `periodo` | TEXT | Obligatorio; Por defecto “mensual” |

### `miembros`

Integrantes con teléfono.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `grupo_id` | INTEGER | Obligatorio; Referencia a grupos (se borra en cascada) |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |

### `cuotas`

Cobro de cada período por miembro.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `miembro_id` | INTEGER | Obligatorio; Referencia a miembros (se borra en cascada) |
| `periodo` | TEXT | Obligatorio |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Opcional |
| `pagada` | INTEGER | Obligatorio; Por defecto 0 |

### `gastos`

Gastos del grupo con concepto.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `grupo_id` | INTEGER | Obligatorio; Referencia a grupos (se borra en cascada) |
| `concepto` | TEXT | Obligatorio |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Miembro que se retira a mitad de período: su cuota pagada se conserva y la pendiente se anula.
- Cuota única (evento): un solo período sin repetición.
- Pago parcial: se registra como pago por el monto y queda saldo pendiente en la cuota.
- Cambio de la cuota: aplica desde el próximo período.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Desconfianza de los padres | Rendición en PDF con detalle de ingresos y gastos. |
| Teléfonos mal cargados | Normalización +591 y vista previa antes de abrir WhatsApp. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en CuotaCurso |
|---|---|
| `grupos` | Cada curso o comité con su cuota y período. |
| `miembros` | Integrantes con teléfono. |
| `cuotas` | Cobro de cada período por miembro. |
| `gastos` | Gastos del grupo con concepto. |
| `grupos.periodo` | Valores: mensual, trimestral, unico |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Crear grupos con cuota y período | 2 | CP-01-1, CP-01-2 |
| HU-02 Cargar miembros | 2 | CP-02-1, CP-02-2 |
| HU-03 Cobrar cuotas y ver deudores | 3 | CP-03-1, CP-03-2 |
| HU-04 Avisar a deudores | 3 | CP-04-1 |
| HU-05 Registrar gastos | 4 | CP-05-1, CP-05-2 |
| HU-06 Rendición de cuentas en PDF | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
