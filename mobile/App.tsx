import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from './src/theme';
import { Text, Button, Card, Input } from './src/components';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSimularLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('¡AutoCheck Conectado!', `Bienvenido ${email || 'Conductor'}`);
    }, 1500);
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Cabecera de Marca */}
        <View style={styles.header}>
          <Text variant="display" color={theme.colors.primaryDark}>
            AutoCheck 🚗
          </Text>
          <Text variant="caption">
            Tu asistente de salud vehicular · Modo Diseño Activo
          </Text>
        </View>

        {/* 🚦 SECCIÓN: El Semáforo en Acción */}
        <Text variant="h3" style={styles.sectionTitle}>
          Estado del Semáforo (Tokens)
        </Text>

        <View style={styles.cardsContainer}>
          <Card status="green" style={styles.cardItem}>
            <Text variant="h3">Aceite de Motor</Text>
            <Text variant="body" color={theme.colors.trafficLight.green.text}>
              ● Al día · Próximo cambio en 8.500 km
            </Text>
          </Card>

          <Card status="yellow" style={styles.cardItem}>
            <Text variant="h3">Filtro de Aire</Text>
            <Text variant="body" color={theme.colors.trafficLight.yellow.text}>
              ▲ Atención · Faltan 1.200 km (25 días)
            </Text>
          </Card>

          <Card status="red" style={styles.cardItem}>
            <Text variant="h3">Inspección ITV</Text>
            <Text variant="body" color={theme.colors.trafficLight.red.text}>
              ■ Crítico · Plazo vencido hace 4 días
            </Text>
          </Card>
        </View>

        {/* 🔐 SECCIÓN: Formulario Interactivo para el Login */}
        <Text variant="h3" style={styles.sectionTitle}>
          Formulario Base (Inputs)
        </Text>

        <Card style={styles.formCard}>
          <Input
            label="Correo electrónico"
            placeholder="alexander@autocheck.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Contraseña"
            placeholder="Tu clave secreta"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button
            title={isLoading ? 'Verificando...' : 'Entrar a AutoCheck'}
            variant="primary"
            isLoading={isLoading}
            onPress={handleSimularLogin}
            style={styles.actionButton}
          />

          <Button
            title="Registrar nuevo coche"
            variant="outline"
            onPress={() => Alert.alert('Garaje', 'Abriendo alta de vehículo...')}
            style={styles.actionButton}
          />
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  cardsContainer: {
    gap: theme.spacing.sm,
  },
  cardItem: {
    marginBottom: theme.spacing.xs,
  },
  formCard: {
    padding: theme.spacing.lg,
  },
  actionButton: {
    marginTop: theme.spacing.sm,
  },
});