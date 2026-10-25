/**
 * ==============================================================================
 * HANDLERS DE INTERCEPTACION DE RED (Mock Service Worker - MSW v3)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui defino las respuestas simuladas de mi API REST para no depender del
 * backend de Spring Boot mientras ejecuto pruebas unitarias o de integracion.
 *
 * ¿COMO FUNCIONA?
 * Cuando en un test la aplicacion hace una peticion HTTP (por ejemplo axios.get o
 * fetch a /api/v1/health), MSW intercepta la llamada a nivel de red dentro de Node.
 * En lugar de salir a internet o fallar porque el servidor de Petro no esta levantado,
 * devuelve directamente el JSON que configure aqui con codigo 200 OK.
 *
 * ¿CON QUIEN CONECTA?
 * - Lo importo en src/mocks/server.ts para levantar el servidor simulado.
 * - Simula los endpoints que Petro implementa en Spring Boot (/api/v1/...).
 *
 * ==============================================================================
 */

import { http, HttpResponse } from 'msw';

export const handlers = [
  // 1. Verificacion de salud de la API (Health check)
  // Devuelvo status UP para validar que la conexion base funciona
  http.get('*/api/v1/health', () => {
    return HttpResponse.json({ status: 'UP' });
  }),

  // Proximos endpoints que ire agregando para Sprint 1 y Sprint 2:
  // - http.post('*/api/v1/auth/login', () => HttpResponse.json({ token: 'mock-jwt-token' }))
  // - http.get('*/api/v1/vehicles', () => HttpResponse.json([ ...listaVehiculos ]))
];
