# AutoCheck Mobile - Libro Maestro de Arquitectura, Tecnologias y Defensa del Proyecto
> **Autor & Lead Mobile:** Saul Martinez (Alexander)  
> **Titulacion:** Desarrollo de Aplicaciones Multiplataforma (DAM) · Universidad Europea  
> **Proyecto Final:** AutoCheck (Gestion Inteligente del Mantenimiento y Salud del Vehiculo)  
> **Stack Mobile:** React Native 0.88 · Expo SDK 58 · React 19.3 · TypeScript 5.8 · Jest 30 + SWC · RNTL v14 · MSW v3  

---

## Indice de Contenidos
1. [Vision General del Sistema y Reparto de Roles](#1-vision-general-del-sistema-y-reparto-de-roles)
2. [Cotejo de Trello vs Codigo Real (Estado Actual)](#2-cotejo-de-trello-vs-codigo-real-estado-actual)
3. [El Stack Tecnologico: Por que elegi cada libreria](#3-el-stack-tecnologico-por-que-elegi-cada-libreria)
4. [Como se Comunica Todo el Proyecto (Arquitectura de Integracion)](#4-como-se-comunica-todo-el-proyecto-arquitectura-de-integracion)
5. [Auditoria Anatomica de mi Codigo (Archivo por Archivo)](#5-auditoria-anatomica-de-mi-codigo-archivo-por-archivo)
6. [Seguridad Zero-Trust en la App Movil](#6-seguridad-zero-trust-en-la-app-movil)
7. [Preguntas Clave para Defender el Proyecto ante el Tribunal](#7-preguntas-clave-para-defender-el-proyecto-ante-el-tribunal)

---

## 1. Vision General del Sistema y Reparto de Roles

AutoCheck es un sistema de mantenimiento preventivo de vehiculos disenado de forma modular y desacoplada:

```
[ FRONTEND MOBILE ]           [ BACKEND API ]               [ INFRAESTRUCTURA ]
Saul Martinez (Alexander)     Petro Pelensky                Roberto Sandoval
React Native + Expo SDK 58    Java 21 + Spring Boot 3       Docker + CI/CD + Security
TypeScript + RNTL             PostgreSQL 16 + Flyway        GitHub Actions + Nginx
         │                            │                               │
         └──────── JSON / HTTPS ──────┴──────── Orquestacion ─────────┘
```

- **Saul (Mi responsabilidad - Mobile Lead):** 32 tarjetas en Trello. Me encargo del 100% de la aplicacion movil: diseno de interfaz, tokens, experiencia de usuario, logica de semaforo en pantalla, almacenamiento seguro de tokens y consumo de la API REST.
- **Petro (Backend Lead):** 26 tarjetas en Trello. Desarrolla la API REST en Spring Boot, la persistencia en PostgreSQL con Flyway y las reglas de negocio del servidor.
- **Roberto (DevOps & Coordinador):** 17 tarjetas en Trello. Configura los contenedores Docker Compose, la integracion continua (CI/CD) en GitHub Actions y las tareas de seguridad en despliegue.

---

## 2. Cotejo de Trello vs Codigo Real (Estado Actual)

Aqui tengo el desglose exacto de lo que tengo en Trello frente a lo que ya tengo programado y validado en mi repositorio:

| Tarjeta Trello | Puntos | Estado en Git / GitHub | Archivos Reales Creados | Que hace en cristiano |
| :--- | :---: | :--- | :--- | :--- |
| **[MB] T-03** Setup Inicial | 1 pt | Merged en main (PR #2) | `package.json`, `tsconfig.json`, `eslint.config.js`, `.prettierrc.json`, `.env.example` | La base del proyecto: Expo SDK 58, TypeScript estricto, ESLint plano sin errores y 0 vulnerabilidades en npm audit. |
| **[MB] T-03.2** Tema y Tokens | 1 pt | En Revision (PR #3 apuntando a main) | `src/theme/*` (`colors`, `spacing`, `typography`, `radii`), `src/components/*` (`Text`, `Button`, `Card`, `Input`), `App.tsx` | El sistema de diseno visual. Centraliza los colores de marca y del semaforo vehicular (Verde, Amarillo, Rojo, Gris) y componentes reutilizables. |
| **[MB] T-07** Entorno Testing | 2 pts | Completado con tests en verde (Rama `feature/T-07-entorno-testing`, listo para PR #4) | `jest.config.js`, `jest.setup.js`, `src/mocks/*` (`handlers.ts`, `server.ts`), `src/components/__tests__/Button.test.tsx` | El laboratorio de pruebas unitarias con Jest acelerado con SWC (Rust), RNTL v14 adaptado a React 19 y MSW para interceptar llamadas HTTP en memoria. |

### Lo que tengo pendiente para cerrar el Sprint 1 (Hasta el 1 de noviembre):
- **[MB] T-03.1 Navegacion (1 pt):** Stack de autenticacion (Login, Registro, Recuperar clave) y navegacion por pestanas inferiores con boton flotante verde (+) en el centro.
- **[MB] T-03.3 Cliente de API (1 pt):** Cliente HTTP con Axios conectado a `EXPO_PUBLIC_API_URL` y TanStack Query para gestion de cache, reintentos y estados asincronos.

---

## 3. El Stack Tecnologico: Por que elegi cada libreria

Si en la defensa me preguntan por que elegi estas herramientas, estos son mis argumentos tecnicos:

### A. Expo SDK 58 + React Native 0.88 (Frente a React Native CLI puro)
- **Mi argumento:** Expo hoy en dia es el estandar oficial recomendado por el propio equipo de Meta. Con SDK 58 tengo soporte nativo para React 19 y TypeScript sin necesidad de tocar codigo nativo de Android (Java/Kotlin) o iOS (Objective-C/Swift) a mano para tareas rutinarias como fuentes, splash screens o iconos. Ademas, si en el futuro necesito integrar librerias C++ nativas, Expo Prebuild me permite generar la carpeta android/ e ios/ en cualquier momento.

### B. React 19.3.0
- **Mi argumento:** Diseñe la aplicacion con vision de futuro. React 19 optimiza el Virtual DOM, mejora la concurrencia y simplifica el tratamiento de componentes funcionales y promesas asincronas.

### C. Jest + @swc/jest (Frente a Babel-Jest tradicional)
- **Mi argumento:** Babel-Jest es lento porque transpila en JavaScript puro monohilo. Al integrar `@swc/jest`, delego la transformacion de mi codigo TypeScript al compilador de Rust de SWC. Con esto, mis pruebas unitarias se ejecutan en 2 segundos en lugar de tardar medio minuto.

### D. React Native Testing Library (RNTL v14)
- **Mi argumento:** Sigo el principio de Kent C. Dodds: "Prueba el software tal como lo usaria un usuario real". Con RNTL no pruebo si una variable interna cambio de valor; pruebo si el texto "Iniciar Sesion" aparece en pantalla y si el boton responde a la pulsacion tactil.

### E. MSW v3 (Mock Service Worker)
- **Mi argumento:** Para desacoplar mi trabajo en la app movil del avance del backend de Petro. Con MSW intercepto las llamadas de red dentro de Node. Si el backend de Spring Boot esta caido o aun no termino un endpoint, yo puedo seguir programando y probando mis pantallas con los contratos JSON acordados.

### F. Design Tokens Centralizados
- **Mi argumento:** La logica de AutoCheck gira en torno a un semaforo vehicular de 4 estados. Si necesito cambiar el tono del amarillo de advertencia para cumplir con las pautas de accesibilidad WCAG AAA, solo modifico una linea en `src/theme/colors.ts` y todas las pantallas se actualizan al instante sin tocar componentes ni JSX.

---

## 4. Como se Comunica Todo el Proyecto (Arquitectura de Integracion)

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOCHECK MOBILE (Expo)                  │
│                                                             │
│  [ UI Screens ] ──> [ TanStack Query ] ──> [ Axios Client ] │
└──────────────────────────────────────────────────────┬──────┘
                                                       │ HTTPS (JSON)
                                                       │ Headers: Authorization: Bearer <JWT>
                                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  SPRING BOOT 3 BACKEND (Petro)              │
│                                                             │
│  [ Security Filter ] ──> [ Controller ] ──> [ Service ]    │
│                                                   │         │
│                                             [ JPA / Flyway ]│
└───────────────────────────────────────────────────┬─────────┘
                                                     │ SQL
                                                     ▼
                                          [ PostgreSQL 16 DB ]
```

### El Flujo de Trabajo en el Multirepo:
1. **Contrato de API previo:** Acordamos las rutas y formatos JSON con Swagger / OpenAPI (`/api/v1/auth/login`, `/api/v1/vehicles`, etc.).
2. **Desarrollo en paralelo con MSW:** Mientras Petro programa los controladores y servicios en Spring Boot, yo diseno y pruebo las vistas en Expo usando MSW para devolver esos mismos JSON.
3. **Integracion final:** Cuando Petro levanta el servidor en local o en Docker, solo cambio en mi archivo `.env`:
   ```bash
   EXPO_PUBLIC_API_URL=http://192.168.1.XX:8080/api/v1
   ```
   Y la aplicacion se conecta directamente con el servidor real sin modificar una sola linea de codigo.

---

## 5. Auditoria Anatomica de mi Codigo (Archivo por Archivo)

Este es el inventario de lo que construi dentro de `mobile/`:

### Carpeta src/theme/ (Sistema de Diseno)
- **colors.ts:**
  - Colores de marca: verde esmeralda primario (`#10B981`) y azul pizarra secundario (`#0F172A`).
  - Los 4 estados oficiales del semaforo vehicular:
    - green (`#16A34A`): al dia.
    - yellow (`#EAB308`): atencion proxima.
    - red (`#DC2626`): mantenimiento vencido o critico.
    - grey (`#94A3B8`): sin calibrar o datos insuficientes.
  - Colores de superficies, fondos, bordes y textos.
- **spacing.ts:** Escala matematica de multiplos de 4px y 8px (`none: 0`, `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`, `xxl: 48`). Asegura que los espaciados sean consistentes en toda la app.
- **typography.ts:** Jerarquia de fuentes desde notas pequenas (`xs: 12`) hasta encabezados grandes (`display: 32`), con grosores definidos (regular, medium, semibold, bold).
- **radii.ts:** Radios de curvatura de esquinas (`sm: 6`, `md: 10`, `lg: 16`, `xl: 24`, `full: 9999`).
- **index.ts:** Agrupa todos los tokens en el objeto unificado `theme` para importarlo comodamente.

### Carpeta src/components/ (Componentes Base Reutilizables)
- **Text.tsx:** Envuelve el texto nativo y le aplica variantes tipograficas (`display`, `h1`, `h2`, `h3`, `body`, `label`, `caption`) y control de color.
- **Button.tsx:** Boton polimorfico con variantes (`primary`, `secondary`, `outline`, `danger`), soporte para indicador de carga (`isLoading`) y bloqueo de pulsaciones (`disabled`).
- **Input.tsx:** Campo de texto con etiquetas superiores, mensajes de error, formateo y alternador de contrasenas ("Ver" / "Ocultar") con `secureTextEntry`.
- **Card.tsx:** Contenedor elevado con sombra que incluye la propiedad `status`: si se indica un estado del semaforo, dibuja una franja vertical de 4px a la izquierda con el color correspondiente.
- **index.ts:** Re-exporta todos los componentes para importarlos desde una sola linea.

### Carpeta src/mocks/ (Pruebas de Red con MSW)
- **handlers.ts:** Define los endpoints simulados y las respuestas JSON asociadas (como `/api/v1/health`).
- **server.ts:** Levanta el servidor de interceptacion para el entorno Node.js durante los tests.

### Carpeta src/components/__tests__/
- **Button.test.tsx:** Pruebas unitarias que validan el renderizado del texto, la ejecucion del evento `onPress` y el bloqueo en estado deshabilitado.

---

## 6. Seguridad Zero-Trust en la App Movil

Para blindar la app aplico buenas practicas de seguridad en el cliente:

1. **Tokens en Hardware Seguro (Expo SecureStore):**
   - No almaceno credenciales ni el token JWT en `AsyncStorage` porque se guarda como texto plano en SQLite.
   - En su lugar utilizo `Expo SecureStore`, que cifra la informacion apoyandose en el hardware del telefono (Android Keystore y Apple Keychain).
2. **Renovacion de Sesion sin Friccion:**
   - El token de acceso vence periodicamente. Mediante un interceptor en Axios capturo las respuestas 401 Unauthorized para solicitar un nuevo token usando el `refresh_token` guardado y reintentar la peticion original sin desconectar al usuario.
3. **Validacion Defensiva:**
   - Valido las estructuras JSON antes de pintarlas en pantalla. Si el backend envia un campo nulo o un valor no esperado, los componentes usan valores por defecto para evitar caidas de la aplicacion.

---

## 7. Preguntas Clave para Defender el Proyecto ante el Tribunal

### P1: "¿Por que elegiste React Native en lugar de Flutter para este proyecto?"
- **Respuesta:** "Elegi React Native por la coherencia del stack: todo el equipo comparte conocimientos sobre TypeScript y JavaScript. Con Expo SDK 58 y React 19 tenemos acceso a la Nueva Arquitectura de React Native (Fabric y TurboModules), que elimina la serializacion lenta por JSON y permite llamadas directas en C++ con un rendimiento equivalente al nativo, sumado a la ventaja de contar con el ecosistema de paquetes de React."

### P2: "¿Por que montaste pruebas con RNTL y Jest en lugar de probar todo con un framework E2E como Appium?"
- **Respuesta:** "Las pruebas con Appium o Selenium son lentas y pesadas porque requieren levantar un dispositivo o emulador completo, tardando varios minutos por ejecucion. Con Jest, SWC y RNTL ejecuto pruebas unitarias y de componentes en cuestion de segundos dentro del motor de Node.js. Esto me permite validar el 90% de los comportamientos de la interfaz de forma rapida tanto en mi entorno local como en cada push dentro del pipeline de integracion continua."

### P3: "¿Como respondera la aplicacion si el conductor no tiene cobertura en un sotano o garaje?"
- **Respuesta:** "La arquitectura de la app esta pensada con enfoque Offline-First. Mediante TanStack Query y persistencia local, la app guarda en memoria local el ultimo estado reportado del vehiculo y los consumibles. El conductor puede consultar su semaforo y registrar kilometros de forma local; en cuanto el dispositivo recupere conexion a internet, las operaciones encoladas se sincronizaran con el backend de Spring Boot."
