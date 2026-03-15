import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { ExpenseProvider } from './src/context/ExpenseContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpenseProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </ExpenseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
