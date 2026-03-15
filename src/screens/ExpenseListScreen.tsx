import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { EmptyState } from '../components/EmptyState';
import { ExpenseCard } from '../components/ExpenseCard';
import { ExpenseFilters } from '../components/ExpenseFilters';
import { ScreenContainer } from '../components/ScreenContainer';
import { useExpenseTracker } from '../context/ExpenseContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ExpenseFilters as ExpenseFiltersType } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Expenses'>;

const initialFilters: ExpenseFiltersType = {
  search: '',
  categoryId: null,
  startDate: '',
  endDate: '',
};

export const ExpenseListScreen = ({ navigation }: Props) => {
  const { expenses, categories, loading, loadExpenses, removeExpense } = useExpenseTracker();
  const [filters, setFilters] = useState<ExpenseFiltersType>(initialFilters);

  useFocusEffect(
    useCallback(() => {
      void loadExpenses(filters);
    }, [filters, loadExpenses]),
  );

  const handleDelete = (id: number) => {
    Alert.alert('Delete expense', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void removeExpense(id).then(() => loadExpenses(filters));
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      <ExpenseFilters
        categories={categories}
        values={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
      />

      <Pressable style={styles.addExpenseButton} onPress={() => navigation.navigate('AddExpense')}>
        <Text style={styles.addExpenseLabel}>+ Add new expense</Text>
      </Pressable>

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Expenses</Text>
        <Text style={styles.sectionMeta}>{expenses.length} items</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#D97757" />
      ) : expenses.length ? (
        expenses.map((expense) => (
          <View key={expense.id} style={styles.itemWrap}>
            <View style={styles.cardWrap}>
              <ExpenseCard expense={expense} onPress={() => navigation.navigate('EditExpense', { expense })} />
            </View>
            <Pressable style={styles.deleteButton} onPress={() => handleDelete(expense.id)}>
              <Text style={styles.deleteButtonLabel}>X</Text>
            </Pressable>
          </View>
        ))
      ) : (
        <EmptyState
          title="No matching expenses"
          description="Adjust your filters or create a new expense to see records here."
          actionLabel="Create expense"
          onAction={() => navigation.navigate('AddExpense')}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#132238',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionMeta: {
    color: '#62707F',
    fontSize: 13,
  },
  addExpenseButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#D97757',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addExpenseLabel: {
    color: '#FFFDF8',
    fontSize: 14,
    fontWeight: '700',
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardWrap: {
    flex: 1,
  },
  deleteButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1EC',
    borderWidth: 1,
    borderColor: '#F0D0C6',
  },
  deleteButtonLabel: {
    color: '#C05252',
    fontSize: 16,
    fontWeight: '800',
  },
});
