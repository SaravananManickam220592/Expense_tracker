import React from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExpenseForm } from '../components/ExpenseForm';
import { ScreenContainer } from '../components/ScreenContainer';
import { useExpenseTracker } from '../context/ExpenseContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

export const AddExpenseScreen = ({ navigation }: Props) => {
  const { addExpense, categories } = useExpenseTracker();

  const handleSubmit = async (values: Parameters<typeof addExpense>[0]) => {
    await addExpense(values);
    Alert.alert('Expense saved', 'Added successfully.');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <ExpenseForm categories={categories} submitLabel="Save expense" onSubmit={handleSubmit} />
    </ScreenContainer>
  );
};
