import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import StartGameScreen from './src/Screen/StartGameScreen';
import reducer from './src/Store/reducers';

const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <StartGameScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
