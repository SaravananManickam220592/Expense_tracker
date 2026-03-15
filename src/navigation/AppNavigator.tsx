import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EditExpenseScreen } from '../screens/EditExpenseScreen';
import { ExpenseListScreen } from '../screens/ExpenseListScreen';
import { ReportsScreen } from '../screens/ReportsScreen';
import { Expense } from '../utils/types';

export type RootStackParamList = {
  Dashboard: undefined;
  Expenses: undefined;
  AddExpense: undefined;
  EditExpense: { expense: Expense };
  Categories: undefined;
  Reports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F1E8',
    card: '#FFFDF8',
    primary: '#D97757',
    text: '#1F2933',
    border: '#E7DDCE',
  },
};

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFF8EE' },
          headerTintColor: '#132238',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F5F1E8' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Expense Tracker' }} />
        <Stack.Screen name="Expenses" component={ExpenseListScreen} options={{ title: 'All Expenses' }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} options={{ title: 'Edit Expense' }} />
        <Stack.Screen name="Categories" component={CategoryScreen} options={{ title: 'Categories' }} />
        <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
