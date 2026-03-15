import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DashboardStat } from '../components/DashboardStat';
import { EmptyState } from '../components/EmptyState';
import { ExpenseCard } from '../components/ExpenseCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionCard } from '../components/SectionCard';
import { useExpenseTracker } from '../context/ExpenseContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getCurrentMonthTotal, getRecentExpenses, getTodayTotal, getTopSpendingCategories } from '../services/reportService';
import { formatCurrency } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export const DashboardScreen = ({ navigation }: Props) => {
  const { expenses, loading, error, refreshAll } = useExpenseTracker();

  const monthlyTotal = useMemo(() => getCurrentMonthTotal(expenses), [expenses]);
  const todayTotal = useMemo(() => getTodayTotal(expenses), [expenses]);
  const recentExpenses = useMemo(() => getRecentExpenses(expenses, 10), [expenses]);
  const topCategories = useMemo(() => getTopSpendingCategories(expenses), [expenses]);

  const shortcuts = [
    { label: 'Expenses', icon: '🧾', onPress: () => navigation.navigate('Expenses') },
    { label: 'Categories', icon: '🏷️', onPress: () => navigation.navigate('Categories') },
    { label: 'Reports', icon: '📊', onPress: () => navigation.navigate('Reports') },
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D97757" />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <PrimaryButton label="Add expense" onPress={() => navigation.navigate('AddExpense')} />
      </View>

      <View style={styles.statsRow}>
        <DashboardStat label="This month" value={formatCurrency(monthlyTotal)} accent="#132238" />
        <DashboardStat label="Today" value={formatCurrency(todayTotal)} accent="#D97757" />
      </View>

      <View style={styles.quickLinks}>
        {shortcuts.map((shortcut) => (
          <Pressable key={shortcut.label} style={styles.shortcutCard} onPress={shortcut.onPress}>
            <Text style={styles.shortcutIcon}>{shortcut.icon}</Text>
            <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
          </Pressable>
        ))}
      </View>

      {error ? (
        <EmptyState title="Something went wrong" description={error} actionLabel="Reload dashboard" onAction={() => void refreshAll()} />
      ) : null}

      <SectionCard title="Recent expenses" subtitle="Most recent activity across all categories">
        {recentExpenses.length ? (
          recentExpenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} onPress={() => navigation.navigate('EditExpense', { expense })} />
          ))
        ) : (
          <EmptyState
            title="No expenses yet"
            description="Create your first entry to populate the dashboard and reports."
            actionLabel="Add expense"
            onAction={() => navigation.navigate('AddExpense')}
          />
        )}
      </SectionCard>

      <SectionCard title="Top categories" subtitle="Highest spend ranked by total amount">
        {topCategories.length ? (
          topCategories.map((category) => (
            <View key={String(category.categoryId ?? 'uncategorized')} style={styles.categoryRow}>
              <View style={styles.categoryLabelWrap}>
                <View style={[styles.colorDot, { backgroundColor: category.color }]} />
                <Text style={styles.categoryLabel}>{category.categoryName}</Text>
              </View>
              <Text style={styles.categoryValue}>{formatCurrency(category.total)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>Top categories will appear once expenses are added.</Text>
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F1E8',
  },
  hero: {
    backgroundColor: '#FFF8EE',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E7DDCE',
    alignItems: 'stretch',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 10,
  },
  shortcutCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFDF8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E7DDCE',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  shortcutIcon: {
    fontSize: 20,
  },
  shortcutLabel: {
    color: '#223040',
    fontSize: 13,
    fontWeight: '700',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  categoryLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  categoryLabel: {
    color: '#243548',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryValue: {
    color: '#132238',
    fontSize: 14,
    fontWeight: '700',
  },
  placeholderText: {
    color: '#62707F',
    fontSize: 14,
  },
});
