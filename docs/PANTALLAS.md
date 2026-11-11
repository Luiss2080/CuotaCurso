# Pantallas y flujos — CuotaCurso

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Detalle de grupo | `app/detalle-de-grupo.tsx` | Detalle |
| Miembros | `app/miembros.tsx` | Lista / vista |
| Cuotas y deudores | `app/cuotas-y-deudores.tsx` | Lista / vista |
| Gastos | `app/gastos.tsx` | Lista / vista |
| Rendición | `app/rendicion.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Grupos con saldo y deudores
- **Acciones:** Crear grupo

**Bosquejo**

```
┌──────────────────────────────┐
│ CuotaCurso                   │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Detalle de grupo         │
│  ▸ Miembros                 │
│  ▸ Cuotas y deudores        │
│  ▸ Gastos                   │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Grupos con saldo y deudores |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Detalle de grupo

- **Archivo:** `app/detalle-de-grupo.tsx`
- **Qué muestra:** Pestañas Miembros, Cuotas, Gastos y Resumen
- **Acciones:** Abrir período, agregar miembro o gasto
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de grupo            │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay grupos. Tocá «Abrir período» para empezar. |
| Con datos | Pestañas Miembros, Cuotas, Gastos y Resumen |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Miembros

- **Archivo:** `app/miembros.tsx`
- **Qué muestra:** Lista con estado de pago del período
- **Acciones:** Agregar, editar, dar de baja
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Miembros                    │
├──────────────────────────────┤
│ nombre · grupo_id            │
│ nombre · grupo_id            │
│ nombre · grupo_id            │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay miembros. Tocá «Agregar» para empezar. |
| Con datos | Lista con estado de pago del período |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Cuotas y deudores

- **Archivo:** `app/cuotas-y-deudores.tsx`
- **Qué muestra:** Estado por miembro y total adeudado
- **Acciones:** Marcar pagada, avisar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Cuotas y deudores           │
├──────────────────────────────┤
│ periodo · miembro_id         │
│ periodo · miembro_id         │
│ periodo · miembro_id         │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay cuotas. Tocá «Marcar pagada» para empezar. |
| Con datos | Estado por miembro y total adeudado |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Gastos

- **Archivo:** `app/gastos.tsx`
- **Qué muestra:** Lista con concepto, monto y fecha
- **Acciones:** Registrar gasto
- **Historias relacionadas:** HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Gastos                      │
├──────────────────────────────┤
│ concepto · grupo_id          │
│ concepto · grupo_id          │
│ concepto · grupo_id          │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay gastos. Tocá «Registrar gasto» para empezar. |
| Con datos | Lista con concepto, monto y fecha |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Rendición

- **Archivo:** `app/rendicion.tsx`
- **Qué muestra:** Ingresos, gastos y saldo del período
- **Acciones:** Compartir PDF
- **Historias relacionadas:** HU-01, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Rendición                   │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Ingresos, gastos y saldo del período |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Crear grupos con cuota y período**

```
defino cuota 30 Bs mensual  →  se crea el grupo y puedo agregar miembros
```

**HU-02 — Cargar miembros**

```
los agrego  →  se genera su cuota pendiente en el período activo
```

**HU-03 — Cobrar cuotas y ver deudores**

```
la marco pagada  →  el total cobrado sube y el miembro sale de deudores
```

**HU-04 — Avisar a deudores**

```
toco «Avisar»  →  se abre WhatsApp con el mensaje prellenado
```

**HU-05 — Registrar gastos**

```
lo registro con concepto «Material de limpieza»  →  el saldo baja en 200 Bs
```

**HU-06 — Rendición de cuentas en PDF**

```
toco «Rendición PDF»  →  se genera un PDF con ingresos, gastos y saldo y se abre el menú de compartir
```
