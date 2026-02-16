import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity, TextInput, Alert } from 'react-native';
import Screen from '../../components/Screen';
import { CoursItem } from '../../features/items/items.ui';
import { getAllCoursFromDB, createCours } from '../../features/items/items.supabase';
import { useTheme } from '../../components/ThemeContext';

export default function ListeScreen() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    duree: '',
    niveau: '',
    horaire: '',
    description: '',
    instructeur: '',
  });
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  
  const isLargeScreen = width > 768;

  const loadCours = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCoursFromDB();
      setCours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCours();
  }, []);

  const handleCreate = async () => {
    if (!formData.nom.trim()) {
      Alert.alert('Erreur', 'Le nom du cours est requis');
      return;
    }

    try {
      setLoading(true);
      await createCours(formData);
      Alert.alert('Succès', 'Cours créé avec succès');
      setShowForm(false);
      setFormData({ nom: '', duree: '', niveau: '', horaire: '', description: '', instructeur: '' });
      await loadCours();
    } catch (err) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && cours.length === 0) {
    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Chargement des cours...
          </Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            Erreur: {error}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={styles.title}>Nos Cours</Text>
        <Text style={styles.subtitle}>Cliquez pour voir les détails</Text>
      </View>

      <View style={[styles.actionBar, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.addButtonText}>
            {showForm ? 'Annuler' : '+ Créer un cours'}
          </Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Nom du cours"
            placeholderTextColor={colors.textSecondary}
            value={formData.nom}
            onChangeText={(text) => setFormData({ ...formData, nom: text })}
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Durée (ex: 60 min)"
            placeholderTextColor={colors.textSecondary}
            value={formData.duree}
            onChangeText={(text) => setFormData({ ...formData, duree: text })}
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Niveau"
            placeholderTextColor={colors.textSecondary}
            value={formData.niveau}
            onChangeText={(text) => setFormData({ ...formData, niveau: text })}
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Horaire"
            placeholderTextColor={colors.textSecondary}
            value={formData.horaire}
            onChangeText={(text) => setFormData({ ...formData, horaire: text })}
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Description"
            placeholderTextColor={colors.textSecondary}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Instructeur"
            placeholderTextColor={colors.textSecondary}
            value={formData.instructeur}
            onChangeText={(text) => setFormData({ ...formData, instructeur: text })}
          />
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            onPress={handleCreate}
          >
            <Text style={styles.createButtonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLargeScreen ? (
        <FlatList
          data={cours}
          renderItem={({ item }) => <CoursItem cours={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={cours}
          renderItem={({ item }) => <CoursItem cours={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#ecf0f1',
  },
  actionBar: {
    padding: 15,
  },
  addButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  createButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});