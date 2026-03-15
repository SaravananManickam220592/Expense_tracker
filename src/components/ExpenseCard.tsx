import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getCategoryIconGlyph } from '../utils/categoryAppearance';
import { formatCurrency, formatDisplayDate } from '../utils/format';
import { Expense } from '../utils/types';

type ExpenseCardProps = {
  expense: Expense;
  onPress?: () => void;
};

export const ExpenseCard = ({ expense, onPress }: ExpenseCardProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: expense.category_color || '#D9D9D9' }]}>
        <Text style={styles.iconText}>{getCategoryIconGlyph(expense.category_icon)}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.meta}>
          {expense.category_name || 'Uncategorized'} · {formatDisplayDate(expense.date)}
        </Text>
        {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
      </View>
      <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF8',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7DDCE',
    gap: 14,
  },
  pressed: {
    opacity: 0.92,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#FFFDF8',
    fontSize: 20,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#132238',
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    color: '#62707F',
    fontSize: 12,
  },
  note: {
    color: '#7C807F',
    fontSize: 12,
  },
  amount: {
    color: '#0D6A53',
    fontSize: 15,
    fontWeight: '700',
  },
});
