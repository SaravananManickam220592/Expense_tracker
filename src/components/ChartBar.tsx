import React from 'react';
import { DimensionValue, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../utils/format';

type ChartBarProps = {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
};

export const ChartBar = ({ label, value, maxValue, color = '#D97757' }: ChartBarProps) => {
  const width: DimensionValue = maxValue > 0 ? `${Math.max((value / maxValue) * 100, 4)}%` : '4%';

  return (
    <View style={styles.row}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{formatCurrency(value)}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    color: '#243548',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: '#4C5C6B',
    fontSize: 12,
  },
  track: {
    height: 12,
    backgroundColor: '#EDE2D2',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
