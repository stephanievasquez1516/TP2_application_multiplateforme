import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import { getAllCours } from '../../features/items/items.logic';
import { CoursItem } from '../../features/items/items.ui';

export default function ListeScreen() {
  const cours = getAllCours();

  console.log("COURS DANS ListeScreen =", cours);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Cours</Text>
        <Text style={styles.subtitle}>Cliquez pour voir les détails</Text>
      </View>

      <FlatList
        data={cours}
        renderItem={({ item }) => <CoursItem cours={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
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
  listContainer: {
    padding: 15,
  },
});
