import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import { useTheme } from '../components/ThemeContext';

export default function AccueilScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark, toggleTheme } = useTheme();
  
  const logoWidth = width > 768 ? 600 : width * 0.9;
  const logoHeight = logoWidth * 0.2;
  const titleSize = width > 768 ? 48 : 36;

  return (
    <Screen style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Switch Light/Dark */}
      <View style={styles.themeSwitch}>
        <Text style={[styles.themeSwitchText, { color: colors.text }]}>
          {isDark ? 'Mode Sombre' : 'Mode Clair'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#bdc3c7', true: '#3498db' }}
          thumbColor={isDark ? '#f5f5f5' : '#fff'}
        />
      </View>

      <View style={styles.header}>
        <Image
          source={require('../assets/images/gym.jpg')}
          style={[styles.logo, { width: logoWidth, height: logoHeight }]}
          resizeMode="cover"
        />
        <Text style={[styles.title, { fontSize: titleSize, color: colors.text }]}>
          Gymfit
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Centre de conditionnement physique à Montréal
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Bienvenue chez Gymfit! Nous offrons des cours variés pour tous les niveaux. 
          Rejoignez notre communauté et atteignez vos objectifs fitness.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton 
          title="Exercices"
          onPress={() => router.push('/exercises')}
          variant="primary"
        />
        <AppButton 
          title="Inscription Membre"
          onPress={() => router.push('/form')}
          variant="primary"
        />
        <AppButton 
          title="Voir les Cours"
          onPress={() => router.push('/items')}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between',
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  themeSwitchText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  logo: {
    marginBottom: 20,
    borderRadius: 10,
  },
});