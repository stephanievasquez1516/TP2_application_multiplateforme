import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Gymfit' }} />
        <Stack.Screen name="form" options={{ title: 'Inscription' }} />
        <Stack.Screen name="items/index" options={{ title: 'Nos Cours' }} />
        <Stack.Screen name="items/[id]" options={{ title: 'Détails du cours' }} />
        <Stack.Screen name="exercises" options={{ title: 'Exercices' }} />
      </Stack>
    </ThemeProvider>
  );
}