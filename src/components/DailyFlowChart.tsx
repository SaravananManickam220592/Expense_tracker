import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../utils/format';
import { DailySpend } from '../utils/types';

type DailyFlowChartProps = {
  points: DailySpend[];
  color?: string;
};

export const DailyFlowChart = ({ points, color = '#264653' }: DailyFlowChartProps) => {
  const maxValue = Math.max(...points.map((point) => point.total), 0);

  return (
    <View style={styles.container}>
      <View style={styles.legendRow}>
        <Text style={styles.legendLabel}>Peak day</Text>
        <Text style={styles.legendValue}>{formatCurrency(maxValue)}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.chartArea}>
          {points.map((point, index) => {
            const height = maxValue > 0 ? Math.max((point.total / maxValue) * 140, point.total > 0 ? 10 : 4) : 4;
            const showLabel = index === 0 || (index + 1) % 5 === 0 || index === points.length - 1;

            return (
              <View key={point.label} style={styles.barGroup}>
                <Text style={styles.valueLabel}>{point.total > 0 ? formatCurrency(point.total) : ''}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height, backgroundColor: color }]} />
                </View>
                <Text style={styles.dayLabel}>{showLabel ? point.label : ''}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLabel: {
    color: '#62707F',
    fontSize: 13,
    fontWeight: '600',
  },
  legendValue: {
    color: '#132238',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 4,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    minHeight: 190,
  },
  barGroup: {
    width: 24,
    alignItems: 'center',
    gap: 6,
  },
  valueLabel: {
    minHeight: 32,
    color: '#62707F',
    fontSize: 9,
    textAlign: 'center',
  },
  barTrack: {
    width: 16,
    height: 140,
    justifyContent: 'flex-end',
    backgroundColor: '#EDE2D2',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 999,
  },
  dayLabel: {
    color: '#4B5968',
    fontSize: 11,
    fontWeight: '600',
  },
});