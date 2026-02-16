import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import { fetchExercises, MUSCLES } from '../features/exercises/exercises.api';
import { useTheme } from '../components/ThemeContext';

export default function ExercicesScreen() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState('biceps');
  
  const { colors } = useTheme();

  const loadExercises = async (muscle) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchExercises(muscle);
      setExercises(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercises(selectedMuscle);
  }, [selectedMuscle]);

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={styles.title}>Exercices de Gym</Text>
        <Text style={styles.subtitle}>Choisissez un groupe musculaire</Text>
      </View>

      <View style={[styles.muscleSelector, { backgroundColor: colors.card }]}>
        <FlatList
          horizontal
          data={MUSCLES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.muscleButton,
                { 
                  backgroundColor: selectedMuscle === item ? colors.primary : colors.border 
                },
              ]}
              onPress={() => setSelectedMuscle(item)}
            >
              <Text style={[
                styles.muscleButtonText,
                { color: selectedMuscle === item ? '#fff' : colors.text }
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Chargement...
          </Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}> {error}</Text>
        </View>
      )}

      {!loading && !error && exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.exerciseCard, { backgroundColor: colors.card }]}
              onPress={() => {
                if (typeof window !== 'undefined') {
                  window.alert(
                    `${item.name}\n\nType: ${item.type || 'N/A'}\nNiveau: ${item.difficulty || 'N/A'}\nMuscle: ${item.muscle || 'N/A'}\nÉquipement: ${item.equipment || 'Aucun'}\n\nInstructions:\n${item.instructions || 'Non disponible'}`
                  );
                }
              }}
            >
              <Text style={[styles.exerciseName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.exerciseType, { color: colors.textSecondary }]}>
                Type: {item.type || 'N/A'}
              </Text>
              <Text style={[styles.exerciseDifficulty, { color: colors.error }]}>
                Niveau: {item.difficulty || 'N/A'}
              </Text>
              <Text style={[styles.tapHint, { color: colors.primary }]}>
            Appuyez pour plus de détails
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {!loading && !error && exercises.length === 0 && (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Aucun exercice trouvé
          </Text>
        </View>
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
  muscleSelector: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  muscleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  muscleButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
  },
  exerciseCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseType: {
    fontSize: 14,
    marginBottom: 3,
  },
  exerciseDifficulty: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});