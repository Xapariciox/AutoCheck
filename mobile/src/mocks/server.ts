/**
 * ==============================================================================
 * SERVIDOR DE PRUEBAS EN NODE.JS (MSW Server Lifecycle)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui creo la instancia del servidor interceptor de Mock Service Worker para Node.
 * Este servidor toma todos los handlers que defini en handlers.ts y los activa
 * durante la ejecucion de Jest.
 *
 * ¿COMO LO USO EN MIS TESTS DE PANTALLAS O SERVICIOS?
 * Cuando en una prueba necesite llamadas de red reales simuladas (por ejemplo al
 * probar el cliente Axios en T-03.3 o el login en T-09), hago esto:
 *
 * import { server } from '../mocks/server';
 * beforeAll(() => server.listen());        // Enciendo la interceptacion
 * afterEach(() => server.resetHandlers()); // Dejo los handlers limpios entre tests
 * afterAll(() => server.close());          // Apago la interceptacion al terminar
 *
 * ¿CON QUIEN CONECTA?
 * - Importa los handlers de src/mocks/handlers.ts.
 * - Atrapa las peticiones de Axios, Fetch y TanStack Query de forma transparente.
 *
 * ==============================================================================
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
