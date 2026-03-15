import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import { ChartBar } from '../components/ChartBar';
import { DailyFlowChart } from '../components/DailyFlowChart';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionCard } from '../components/SectionCard';
import { useExpenseTracker } from '../context/ExpenseContext';
import { buildCategoryTotals, buildDailySpendingForMonth, buildMonthlyExpensesCsv, buildMonthlySummary, getCurrentMonthExpenses } from '../services/reportService';
import { formatCurrency } from '../utils/format';

export const ReportsScreen = () => {
  const { expenses } = useExpenseTracker();
  const [exporting, setExporting] = useState(false);

  const summary = useMemo(() => buildMonthlySummary(expenses), [expenses]);
  const categoryTotals = useMemo(() => buildCategoryTotals(expenses), [expenses]);
  const dailySpending = useMemo(() => buildDailySpendingForMonth(expenses), [expenses]);
  const monthlyExpenses = useMemo(() => getCurrentMonthExpenses(expenses), [expenses]);
  const maxCategoryTotal = Math.max(...categoryTotals.map((entry) => entry.total), 0);

  const handleExport = async () => {
    if (!monthlyExpenses.length) {
      Alert.alert('No data to export', 'There are no expenses recorded for this month yet.');
      return;
    }

    try {
      setExporting(true);
      const csv = buildMonthlyExpensesCsv(expenses);
      const monthSlug = summary.monthLabel.replace(/\s+/g, '-').toLowerCase();
      const fileUri = `${FileSystem.cacheDirectory}expenses-${monthSlug}.csv`;

      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/csv',
          dialogTitle: 'Export monthly expenses',
          UTI: 'public.comma-separated-values-text',
        });
        return;
      }

      Alert.alert('Export created', `CSV saved to ${fileUri}`);
    } catch (error) {
      Alert.alert('Export failed', error instanceof Error ? error.message : 'Unable to export this month\'s expenses.');
    } finally {
      setExporting(false);
    }
  };

  if (!expenses.length) {
    return (
      <ScreenContainer>
        <EmptyState
          title="Reports need data"
          description="Create expenses first. Monthly summaries, category totals, and weekly charts will appear here automatically."
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SectionCard title="Monthly summary" subtitle={summary.monthLabel}>
        <View style={styles.metricBlock}>
          <Text style={styles.metricLabel}>Total spent</Text>
          <Text style={styles.metricValue}>{formatCurrency(summary.total)}</Text>
        </View>
        <PrimaryButton label="Export this month as CSV" onPress={() => void handleExport()} loading={exporting} variant="outline" />
      </SectionCard>

      <SectionCard title="Category-wise spending" subtitle="Simple chart visualization by total spend">
        {categoryTotals.map((entry) => (
          <ChartBar
            key={String(entry.categoryId ?? 'uncategorized')}
            label={entry.categoryName}
            value={entry.total}
            maxValue={maxCategoryTotal}
            color={entry.color}
          />
        ))}
      </SectionCard>

      <SectionCard title="Expense flow" subtitle="Day-to-day spending across the current month">
        <DailyFlowChart points={dailySpending} color="#264653" />
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  metricBlock: {
    backgroundColor: '#F8F1E7',
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  metricLabel: {
    color: '#62707F',
    fontSize: 13,
  },
  metricValue: {
    color: '#132238',
    fontSize: 20,
    fontWeight: '800',
  },
});
