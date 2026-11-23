# GymFit

Frontend Angular para administrar socios, membresías, pagos, accesos, entrenadores y rutinas.

## Desarrollo

Inicia la API en `http://localhost:8080` y luego ejecuta:

```bash
npm start
```

Abre `http://localhost:4200`. Para compilar y ejecutar las pruebas:

```bash
npm run build
npm run test -- --watch=false
```

La URL base de la API se configura en `src/environment/environment.ts`.

## Organización

```text
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Protección de rutas
│   │   ├── interceptors/    # Token JWT para solicitudes protegidas
│   │   ├── models/          # Modelos por dominio
│   │   ├── services/        # Servicios HTTP por dominio
│   │   └── utils/           # Utilidades comunes
│   ├── features/            # Pantallas independientes con carga diferida
│   ├── shared/              # Componentes comunes, como la navegación
│   ├── app.config.ts        # Configuración global de Angular
│   └── app.routes.ts        # Rutas del sistema
└── environment/
    └── environment.ts       # Configuración del backend
```

Cada pantalla vive en su carpeta bajo `features` y mantiene su plantilla y lógica en archivos separados. Los modelos y servicios reutilizables se ubican en `core`; los componentes compartidos, en `shared`.
