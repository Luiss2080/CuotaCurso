# Especificación del MVP — CuotaCurso

## 1. Resumen

Colectas de curso, comité o directiva: cuotas, deudores y rendición de cuentas.

**Usuario objetivo:** padres de familia, centros de estudiantes y directivas.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. CuotaCurso las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

## 2. Alcance del MVP

### Incluido

- Grupos (curso, comité, junta) con cuota y período.
- Miembros con teléfono y estado de pago.
- Cobro de cuotas y lista de deudores con aviso por WhatsApp.
- Gastos del grupo con concepto y monto.
- Rendición de cuentas en PDF: ingresos, gastos y saldo.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Grupos (curso, comité, junta) con cuota y período

**Como** usuario (padres de familia, centros de estudiantes y directivas), **quiero** grupos (curso, comité, junta) con cuota y período, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Miembros con teléfono y estado de pago

**Como** usuario (padres de familia, centros de estudiantes y directivas), **quiero** miembros con teléfono y estado de pago, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Cobro de cuotas y lista de deudores con aviso por WhatsApp

**Como** usuario (padres de familia, centros de estudiantes y directivas), **quiero** cobro de cuotas y lista de deudores con aviso por WhatsApp, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Gastos del grupo con concepto y monto

**Como** usuario (padres de familia, centros de estudiantes y directivas), **quiero** gastos del grupo con concepto y monto, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Rendición de cuentas en PDF: ingresos, gastos y saldo

**Como** usuario (padres de familia, centros de estudiantes y directivas), **quiero** rendición de cuentas en PDF: ingresos, gastos y saldo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de grupos | Ver, buscar y abrir cada registro |
| Formulario de grupos | Crear y editar con validaciones |
| Lista de miembros | Ver, buscar y abrir cada registro |
| Formulario de miembros | Crear y editar con validaciones |
| Lista de cuotas | Ver, buscar y abrir cada registro |
| Formulario de cuotas | Crear y editar con validaciones |
| Lista de gastos | Ver, buscar y abrir cada registro |
| Formulario de gastos | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **grupos**: id, nombre, cuota, periodo
- **miembros**: id, grupo_id, nombre, telefono
- **cuotas**: id, miembro_id, periodo, monto, fecha, pagada
- **gastos**: id, grupo_id, concepto, monto, fecha

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
