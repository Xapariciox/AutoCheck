# Guia Maestra de Testing en AutoCheck Mobile ([MB] T-07)
> **Autor:** Saul Martinez (Alexander)  
> **Fecha:** Octubre 2026  
> **Stack:** Expo SDK 58 · React 19.3.0 · React Native 0.88 · Jest 30 · @swc/jest · RNTL v14 · MSW v3  

---

## 1. Que hice aqui y por que

En esta tarjeta ([MB] T-07) monte el laboratorio de pruebas unitarias de la app movil.

En cristiano: cada vez que cree una pantalla, un componente o una funcion de validacion, no tengo que abrir el emulador de Android ni probar en el telefono a mano para ver si todo anda bien. Escribo un test pequeno de pocas lineas, ejecuto `npm test` en la terminal, y en 2 segundos compruebo si el codigo esta sano o si rompi algo.

Ademas, esto es exactamente lo que correra en el pipeline de GitHub Actions cuando haga push: si un test falla, GitHub no permite fusionar la rama. Con los tests en verde, garantizo que el codigo que subo es estable y seguro.

---

## 2. Decisiones tecnicas y problemas que resolvi

Cuando revise los requisitos iniciales en Trello, las instrucciones venian planteadas para React 18 antiguo. Al trabajar con React 19 (la version que viene en Expo SDK 58), me encontre con cambios importantes que resolvi de forma limpia:

### Desafio 1: La libreria @testing-library/jest-native quedo obsoleta
- El problema: En React 18 se usaba `jest-native` para tener comparadores como `.toBeDisabled()`. Sin embargo, dependia internamente de `react-test-renderer`, un paquete que en React 19 fue eliminado por el equipo de React.
- Mi solucion: No la instale. En `@testing-library/react-native` version 14, esos comparadores ya vienen incorporados de forma nativa. Con esto mantengo 0 vulnerabilidades en npm audit y cero dependencias muertas.

### Desafio 2: Compilacion rapida con SWC en Rust frente a Flow de Facebook
- El problema: Para que las pruebas no tarden un minuto en compilar, elegi `@swc/jest`, un compilador escrito en Rust ultra rapido. Pero el codigo interno de React Native contiene restos de Flow (el tipado antiguo de Facebook). Cuando SWC intentaba leer esa sintaxis, fallaba porque solo entiende TypeScript y JavaScript estandar.
- Mi solucion (Estrategia hibrida en `jest.config.js`):
  1. Para todo el codigo que escribo en TypeScript dentro de `src/` (`.ts` y `.tsx`), uso SWC en Rust para transformar mis componentes en milisegundos.
  2. Para las librerias externas de `node_modules` y React Native (`.js`), mantengo el preset oficial de `jest-expo` con Babel, que si sabe limpiar la sintaxis de Flow sin errores.

### Desafio 3: En React 19 el metodo render() es asincrono
- El cambio: Con RNTL v14 y React 19, `render()` devuelve una promesa. Por eso en mis tests siempre utilizo `await render(<Componente />)` y consulto los elementos mediante el objeto `screen` (`screen.getByText(...)`).

---

## 3. Mapa de archivos creados y que hace cada uno

### mobile/jest.config.js
Es el cerebro del motor de pruebas. Aqui defino:
- `preset: 'jest-expo'`: para heredar las simulaciones nativas de Expo (fuentes, camara, plataforma).
- `transform`: mi enrutador hibrido (SWC para mis archivos TypeScript y Babel para librerias externas).
- `setupFilesAfterEnv`: indico que antes de cada test se ejecute `jest.setup.js`.
- `collectCoverageFrom`: defino los archivos de `src/` que entran en la medicion de cobertura.

### mobile/jest.setup.js
Es el limpiador automatico antes de cada prueba:
- `afterEach(() => jest.clearAllMocks())`: limpio los contadores de llamadas y espías tras cada test para que ningun test contamine al siguiente.
- Filtro de `console.warn`: apago las alertas sobre `useNativeDriver` que React Native emite en Node por no tener aceleracion por hardware, dejando la salida de terminal 100% limpia.

### mobile/src/mocks/handlers.ts y mobile/src/mocks/server.ts
Es mi servidor simulado con Mock Service Worker (MSW v3):
- En las pruebas unitarias no tengo acceso a internet ni al backend de Spring Boot de Petro.
- MSW intercepta cualquier peticion HTTP a nivel de Node y responde al instante con el JSON que configure en `handlers.ts` (por ejemplo `/api/v1/health` devolviendo `{ status: 'UP' }`).

### mobile/src/components/__tests__/Button.test.tsx
Es mi primera suite de pruebas para el componente Button:
- Test 1: Compruebo que pinte correctamente el texto asignado por propiedad.
- Test 2: Simulo una pulsacion real con `fireEvent.press` y compruebo que la funcion callback se llame una sola vez.
- Test 3: Compruebo que con `disabled={true}` el boton quede completamente bloqueado y no dispare la accion.

---

## 4. Comandos de trabajo diario

- Ejecutar las pruebas:
  `npm test`
- Ejecutar pruebas en modo observador mientras programo:
  `npx jest --watch`
- Medir la cobertura de codigo:
  `npx jest --coverage`
