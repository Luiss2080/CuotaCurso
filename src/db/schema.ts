// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE grupos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, cuota REAL NOT NULL DEFAULT 0, periodo TEXT NOT NULL DEFAULT 'mensual');
CREATE TABLE miembros (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE cuotas (id INTEGER PRIMARY KEY AUTOINCREMENT, miembro_id INTEGER NOT NULL REFERENCES miembros(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT, pagada INTEGER NOT NULL DEFAULT 0);
CREATE TABLE gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, concepto TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL);`,
];

export const TABLAS = ['grupos', 'miembros', 'cuotas', 'gastos'] as const;
