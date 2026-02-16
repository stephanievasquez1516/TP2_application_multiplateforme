import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import { getCoursByIdFromDB, deleteCours, updateCours } from '../../features/items/items.supabase';
import { useTheme } from '../../components/ThemeContext';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    const loadCours = async () => {
      try {
        setLoading(true);
        const data = await getCoursByIdFromDB(id);
        setCours(data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCours();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer ce cours ?');
    
    if (confirmed) {
      try {
        setLoading(true);
        await deleteCours(id);
        alert('Cours supprimé avec succès');
        router.back();
      } catch (err) {
        alert('Erreur: ' + err.message);
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (!formData.nom.trim()) {
      alert('Le nom du cours est requis');
      return;
    }

    try {
      setLoading(true);
      const updated = await updateCours(id, {
        nom: formData.nom,
        duree: formData.duree,
        niveau: formData.niveau,
        horaire: formData.horaire,
        description: formData.description,
        instructeur: formData.instructeur,
      });
      setCours(updated);
      setEditMode(false);
      alert('Cours modifié avec succès');
    } catch (err) {
      alert('Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (error || !cours) {
    return (
      <Screen>
        <Text style={styles.errorText}>Cours non trouvé</Text>
      </Screen>
    );
  }

  if (editMode) {
    return (
      <Screen scrollable style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.header }]}>
          <Text style={styles.title}>Modifier le cours</Text>
        </View>

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
            placeholder="Durée"
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
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleUpdate}
          >
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: colors.border }]}
            onPress={() => {
              setEditMode(false);
              setFormData(cours);
            }}
          >
            <Text style={[styles.cancelButtonText, { color: colors.text }]}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scrollable style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={styles.title}>{cours.nom}</Text>
        <Text style={styles.niveau}>{cours.niveau}</Text>
      </View>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={[styles.infoRow, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>Durée:</Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>{cours.duree}</Text>
        </View>

        <View style={[styles.infoRow, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>Horaire:</Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>{cours.horaire}</Text>
        </View>

        <View style={[styles.infoRow, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>Instructeur:</Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>{cours.instructeur}</Text>
        </View>

        <View style={[styles.descriptionContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.descriptionLabel, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{cours.description}</Text>
        </View>

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: colors.primary }]}
          onPress={() => setEditMode(true)}
        >
          <Text style={styles.editButtonText}>Modifier ce cours</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: colors.error }]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Supprimer ce cours</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  niveau: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  formContainer: {
    padding: 20,
    margin: 15,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  editButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    padding: 20,
  },
});