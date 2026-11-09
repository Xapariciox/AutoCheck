// ==============================================================================
// PUNTO DE ARRANQUE NATIVO DE EXPO (index.ts)
// ==============================================================================
//
// ¿QUE HAGO EN ESTE ARCHIVO?
// Este es el punto de entrada que Expo y React Native ejecutan al abrir la aplicacion.
// Registro el componente raiz (App) mediante registerRootComponent para que funcione
// igual en Expo Go, en desarrollo local y en builds nativos finales de iOS y Android.
//
// ==============================================================================

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
