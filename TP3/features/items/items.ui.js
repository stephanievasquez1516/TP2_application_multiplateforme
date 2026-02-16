import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export const CoursItem = ({ cours }) => {
  return (
    <Link href={`/items/${cours.id}`} asChild>
      <TouchableOpacity style={styles.coursItem}>
        <View style={styles.coursHeader}>
          <Text style={styles.coursNom}>{cours.nom}</Text>
          <Text style={styles.coursNiveau}>{cours.niveau}</Text>
        </View>
        <Text style={styles.coursHoraire}>{cours.horaire}</Text>
        <Text style={styles.coursDuree}>{cours.duree}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  coursItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 7.5,
    flex: 1,
  },
  coursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  coursNom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  coursNiveau: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '600',
  },
  coursHoraire: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  coursDuree: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});