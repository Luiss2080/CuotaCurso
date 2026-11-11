# Roadmap de CuotaCurso

> Que la directiva sepa quién pagó la cuota, en qué se gastó y cuánto queda, y que lo pueda mostrar a los padres.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Colectas de curso, comité o directiva: cuotas, deudores y rendición de cuentas.
- **Usuario:** Tesorero de un curso de colegio, comité, junta vecinal o centro de estudiantes con 10 a 80 miembros.
- **Duración estimada:** ~15 días de trabajo efectivo (~3 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Grupos y miembros | Grupos y miembros. | 3 | 1 |
| 3 | Cuotas y deudores | Cuotas y deudores. | 4 | 2 |
| 4 | Gastos del grupo | Gastos del grupo. | 3 | 3 |
| 5 | Rendición de cuentas en PDF | Rendición de cuentas en PDF. | 3 | 3 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Grupos y miembros

**Demo:** Puedo cargar un grupo de 30 miembros y verlo tras reiniciar.

### Hito 3 — Cuotas y deudores

**Demo:** La lista de deudores coincide con los casos de prueba.

### Hito 4 — Gastos del grupo

**Demo:** El saldo siempre coincide con cobrado − gastado.

### Hito 5 — Rendición de cuentas en PDF

**Demo:** El PDF coincide con los números de la app.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Grupos y miembros

- **Objetivo:** Grupos y miembros.
- **Historias cubiertas:** HU-01 Crear grupos con cuota y período; HU-02 Cargar miembros
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Puedo cargar un grupo de 30 miembros y verlo tras reiniciar.

### Fase 3 — Cuotas y deudores

- **Objetivo:** Cuotas y deudores.
- **Historias cubiertas:** HU-03 Cobrar cuotas y ver deudores; HU-04 Avisar a deudores
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - La lista de deudores coincide con los casos de prueba.

### Fase 4 — Gastos del grupo

- **Objetivo:** Gastos del grupo.
- **Historias cubiertas:** HU-05 Registrar gastos
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El saldo siempre coincide con cobrado − gastado.

### Fase 5 — Rendición de cuentas en PDF

- **Objetivo:** Rendición de cuentas en PDF.
- **Historias cubiertas:** HU-06 Rendición de cuentas en PDF
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El PDF coincide con los números de la app.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Grupos y miembros
- [ ] **Fase 3:** Cuotas y deudores
- [ ] **Fase 4:** Gastos del grupo
- [ ] **Fase 5:** Rendición de cuentas en PDF

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Crear grupos con cuota y período | 2 | Grupos y miembros |
| HU-02 Cargar miembros | 2 | Grupos y miembros |
| HU-03 Cobrar cuotas y ver deudores | 3 | Cuotas y deudores |
| HU-04 Avisar a deudores | 3 | Cuotas y deudores |
| HU-05 Registrar gastos | 4 | Gastos del grupo |
| HU-06 Rendición de cuentas en PDF | 5 | Rendición de cuentas en PDF |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 34 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 10 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
