import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { AppBootScreen } from './src/components/AppBootScreen';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { useExpenseTracker } from './src/context/ExpenseContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const AppShell = () => {
  const { initializing } = useExpenseTracker();

  if (initializing) {
    return <AppBootScreen />;
  }

  return <AppNavigator />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpenseProvider>
          <StatusBar style="dark" />
          <AppShell />
        </ExpenseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
