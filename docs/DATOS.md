# Modelo de datos — CuotaCurso

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `miembros.grupo_id` | `grupos` | Al borrar el padre se borran los hijos |
| `cuotas.miembro_id` | `miembros` | Al borrar el padre se borran los hijos |
| `gastos.grupo_id` | `grupos` | Al borrar el padre se borran los hijos |

```
grupos  ──<  miembros, gastos
miembros  ──<  cuotas
cuotas
gastos
```

## 3. Detalle por tabla

### 3.1 `grupos`

Cada curso o comité con su cuota y período.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `cuota` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un monto mayor a 0» |
| `periodo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `mensual`, `trimestral`, `unico`; Valor inicial `mensual` | «Elegí una opción» |

**Consultas base** (en `src/db/grupos.ts`):

```ts
listar(): Promise<Grupo[]>            // SELECT * FROM grupos ORDER BY id DESC
obtener(id: number): Promise<Grupo | null>   // SELECT * FROM grupos WHERE id = ?
crear(datos: NuevoGrupo): Promise<number>   // INSERT INTO grupos (nombre, cuota, periodo) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoGrupo): Promise<void>   // UPDATE grupos SET nombre = ?, cuota = ?, periodo = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM grupos WHERE id = ?
```

### 3.2 `miembros`

Integrantes con teléfono.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `grupo_id` | INTEGER → `number` | Selector de grupos | Obligatorio; Debe existir en `grupos` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_miembros_grupo_id ON miembros(grupo_id);
```

**Consultas base** (en `src/db/miembros.ts`):

```ts
listar(): Promise<Miembro[]>            // SELECT * FROM miembros ORDER BY id DESC
obtener(id: number): Promise<Miembro | null>   // SELECT * FROM miembros WHERE id = ?
crear(datos: NuevoMiembro): Promise<number>   // INSERT INTO miembros (grupo_id, nombre, telefono) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoMiembro): Promise<void>   // UPDATE miembros SET grupo_id = ?, nombre = ?, telefono = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM miembros WHERE id = ?
listarPorGrupo(grupo_id: number): Promise<Miembro[]>   // WHERE grupo_id = ?
```

### 3.3 `cuotas`

Cobro de cada período por miembro.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `miembro_id` | INTEGER → `number` | Selector de miembros | Obligatorio; Debe existir en `miembros` | «Elegí un registro» |
| `periodo` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí periodo» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `pagada` | INTEGER → `number` | Interruptor | Obligatorio; 0 o 1; Valor inicial `0` | — |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_cuotas_miembro_id ON cuotas(miembro_id);
CREATE INDEX IF NOT EXISTS idx_cuotas_fecha ON cuotas(fecha);
```

**Consultas base** (en `src/db/cuotas.ts`):

```ts
listar(): Promise<Cuota[]>            // SELECT * FROM cuotas ORDER BY id DESC
obtener(id: number): Promise<Cuota | null>   // SELECT * FROM cuotas WHERE id = ?
crear(datos: NuevoCuota): Promise<number>   // INSERT INTO cuotas (miembro_id, periodo, monto, fecha, pagada) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoCuota): Promise<void>   // UPDATE cuotas SET miembro_id = ?, periodo = ?, monto = ?, fecha = ?, pagada = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM cuotas WHERE id = ?
listarPorMiembro(miembro_id: number): Promise<Cuota[]>   // WHERE miembro_id = ?
```

### 3.4 `gastos`

Gastos del grupo con concepto.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `grupo_id` | INTEGER → `number` | Selector de grupos | Obligatorio; Debe existir en `grupos` | «Elegí un registro» |
| `concepto` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí concepto» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_gastos_grupo_id ON gastos(grupo_id);
CREATE INDEX IF NOT EXISTS idx_gastos_fecha ON gastos(fecha);
```

**Consultas base** (en `src/db/gastos.ts`):

```ts
listar(): Promise<Gasto[]>            // SELECT * FROM gastos ORDER BY id DESC
obtener(id: number): Promise<Gasto | null>   // SELECT * FROM gastos WHERE id = ?
crear(datos: NuevoGasto): Promise<number>   // INSERT INTO gastos (grupo_id, concepto, monto, fecha) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoGasto): Promise<void>   // UPDATE gastos SET grupo_id = ?, concepto = ?, monto = ?, fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM gastos WHERE id = ?
listarPorGrupo(grupo_id: number): Promise<Gasto[]>   // WHERE grupo_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Grupo {
  id: number;
  nombre: string;
  cuota: number;
  periodo: string;
}
export type NuevoGrupo = Omit<Grupo, 'id'>;

export interface Miembro {
  id: number;
  grupo_id: number;
  nombre: string;
  telefono: string | null;
}
export type NuevoMiembro = Omit<Miembro, 'id'>;

export interface Cuota {
  id: number;
  miembro_id: number;
  periodo: string;
  monto: number;
  fecha: string | null;
  pagada: number;
}
export type NuevoCuota = Omit<Cuota, 'id'>;

export interface Gasto {
  id: number;
  grupo_id: number;
  concepto: string;
  monto: number;
  fecha: string;
}
export type NuevoGasto = Omit<Gasto, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`grupos.periodo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `mensual` | Mensual |
| `trimestral` | Trimestral |
| `unico` | Unico |

```ts
export const GRUPOS_PERIODO = ['mensual', 'trimestral', 'unico'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 3 | Plantilla del aviso a deudores y nombre de la directiva para la rendición. |

**Migración 2** (fase 3)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE grupos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, cuota REAL NOT NULL DEFAULT 0, periodo TEXT NOT NULL DEFAULT 'mensual');
CREATE TABLE miembros (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE cuotas (id INTEGER PRIMARY KEY AUTOINCREMENT, miembro_id INTEGER NOT NULL REFERENCES miembros(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT, pagada INTEGER NOT NULL DEFAULT 0);
CREATE TABLE gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, concepto TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Cada grupo define una cuota y un período (mensual, trimestral o único).
- **RN-02** Al crear un período se genera una cuota pendiente por cada miembro activo.
- **RN-03** Un miembro debe cuando su cuota del período está pendiente.
- **RN-04** Saldo del grupo = total cobrado − total gastado.
- **RN-05** Un gasto no puede dejar el saldo en negativo sin una confirmación explícita.
- **RN-06** La rendición de cuentas lista ingresos, gastos y saldo del período elegido.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
