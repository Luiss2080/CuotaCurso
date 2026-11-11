<div align="center">

<img src="docs/assets/logo.svg" alt="CuotaCurso" width="96" height="96">

# CuotaCurso

**Colectas de curso, comité o directiva: cuotas, deudores y rendición de cuentas.** Pensado para padres de familia, centros de estudiantes y directivas, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Grupos (curso, comité, junta) con cuota y período.
- Miembros con teléfono y estado de pago.
- Cobro de cuotas y lista de deudores con aviso por WhatsApp.
- Gastos del grupo con concepto y monto.
- Rendición de cuentas en PDF: ingresos, gastos y saldo.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| PDF | Generación de PDF (expo-print) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `grupos` (id, nombre, cuota, periodo)
- `miembros` (id, grupo_id, nombre, telefono)
- `cuotas` (id, miembro_id, periodo, monto, fecha, pagada)
- `gastos` (id, grupo_id, concepto, monto, fecha)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Grupos y miembros
3. Cuotas y deudores
4. Gastos del grupo
5. Rendición de cuentas en PDF

> Detalle fase por fase: [docs/ROADMAP.md](docs/ROADMAP.md) · [docs/SPEC.md](docs/SPEC.md) · [docs/PLANNING.md](docs/PLANNING.md) · [docs/DATOS.md](docs/DATOS.md) · [docs/PANTALLAS.md](docs/PANTALLAS.md) · [docs/PRUEBAS.md](docs/PRUEBAS.md) · [docs/BACKLOG.md](docs/BACKLOG.md)

## 📂 Estructura

```
CuotaCurso/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/CuotaCurso.git
cd CuotaCurso
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
