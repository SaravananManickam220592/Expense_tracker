import React from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExpenseForm } from '../components/ExpenseForm';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useExpenseTracker } from '../context/ExpenseContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EditExpense'>;

export const EditExpenseScreen = ({ navigation, route }: Props) => {
  const { categories, editExpense, removeExpense } = useExpenseTracker();
  const { expense } = route.params;

  const handleDelete = () => {
    Alert.alert('Delete expense', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void removeExpense(expense.id).then(() => navigation.navigate('Expenses'));
        },
      },
    ]);
  };

  const handleSubmit = async (values: Parameters<typeof editExpense>[1]) => {
    await editExpense(expense.id, values);
    Alert.alert('Expense updated', 'Your changes have been saved locally.');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <ExpenseForm
        categories={categories}
        initialValues={{
          title: expense.title,
          amount: expense.amount,
          category_id: expense.category_id,
          date: expense.date,
          note: expense.note,
        }}
        submitLabel="Update expense"
        onSubmit={handleSubmit}
      />
      <PrimaryButton label="Delete expense" onPress={handleDelete} variant="outline" />
    </ScreenContainer>
  );
};
