import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InsertWeight } from './bancoPass/InsertWeight';
import { UpdateWeight } from './bancoPass/UpdateWeight';
import { RemoveWeight } from './bancoPass/RemoveWeight';
import { AllWeights } from './bancoPass/AllWeights';

export default function App() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <InsertWeight />
        <UpdateWeight />
        <RemoveWeight />
        <AllWeights />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
