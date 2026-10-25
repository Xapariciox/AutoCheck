/**
 * ==============================================================================
 * PRUEBAS UNITARIAS DEL COMPONENTE: <Button /> (RNTL v14)
 * ==============================================================================
 *
 * ¿QUE HAGO EN ESTE ARCHIVO?
 * Aqui pruebo el componente Button (src/components/Button.tsx) para asegurar
 * que funcione correctamente antes de usarlo en las pantallas de Login o Registro.
 *
 * ¿COMO LO PRUEBO?
 * Utilizo @testing-library/react-native para renderizar el boton en memoria sin
 * abrir el emulador del telefono:
 * 1. Uso await render(...) porque en React 19 y RNTL v14 el render es asincrono.
 * 2. Utilizo screen.getByText(...) para comprobar lo que el usuario ve en pantalla.
 * 3. Simulo las pulsaciones reales con fireEvent.press(...).
 *
 * CASOS QUE CUBRO:
 * - Test 1: Que el texto que le paso por propiedad se muestre en pantalla.
 * - Test 2: Que al pulsar el boton se dispare la funcion onPress.
 * - Test 3: Que si el boton esta deshabilitado (disabled), no ejecute ninguna accion.
 *
 * ==============================================================================
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('<Button />', () => {
  // Test 1: Compruebo que el texto pasado por props se pinte en la pantalla
  it('renderiza correctamente con el texto asignado', async () => {
    await render(<Button title="Iniciar Sesión" />);
    // Verifico que el texto exista en el arbol visual
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
  });

  // Test 2: Compruebo que al tocar el boton se ejecute la accion
  it('ejecuta la función onPress al hacer clic', async () => {
    const onPressMock = jest.fn(); // Creo una funcion espia para verificar la llamada
    await render(<Button title="Presionar" onPress={onPressMock} />);

    // Simulo la pulsacion del usuario
    fireEvent.press(screen.getByText('Presionar'));

    // Verifico que se haya llamado exactamente una vez
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  // Test 3: Compruebo que el estado disabled bloquee cualquier pulsacion
  it('deshabilita el botón si disabled es true', async () => {
    const onPressMock = jest.fn();
    await render(<Button title="Bloqueado" disabled onPress={onPressMock} />);

    // Intento pulsar el boton bloqueado
    fireEvent.press(screen.getByText('Bloqueado'));

    // Verifico que nunca se haya llamado a la accion
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
