import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Screen from '../components/Screen';
import Title from '../components/Title';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { validateForm } from '../features/items/items.logic';

export default function FormulaireScreen() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    const validation = validateForm(nom, email);
    
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      return;
    }

    setErrorMessage('');
    Alert.alert('Succès', `Bienvenue ${nom}! Inscription confirmée.`);
    setNom('');
    setEmail('');
  };

  return (
    <Screen scrollable style={styles.container}>
      <View style={styles.header}>
        <Title size="medium">Inscription Membre</Title>
        <Text style={styles.subtitle}>Rejoignez Gymfit aujourd'hui</Text>
      </View>

      <View style={styles.formContainer}>
        <AppInput
          label="Nom complet"
          value={nom}
          onChangeText={setNom}
          placeholder="Entrez votre nom"
        />

        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="exemple@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <AppButton 
          title="S'inscrire"
          onPress={handleSubmit}
          disabled={nom === '' || email === ''}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
});
