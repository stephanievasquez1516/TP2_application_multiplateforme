import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function Screen({ children, scrollable = false, style }) {
  const Container = scrollable ? ScrollView : View;
  
  return (
    <Container style={[styles.container, style]}>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});