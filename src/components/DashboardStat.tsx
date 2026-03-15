import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type DashboardStatProps = {
  label: string;
  value: string;
  accent: string;
};

export const DashboardStat = ({ label, value, accent }: DashboardStatProps) => {
  return (
    <View style={[styles.card, { backgroundColor: accent }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderRadius: 24,
    padding: 18,
    justifyContent: 'space-between',
  },
  label: {
    color: '#FFF8EE',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: '#FFFDF8',
    fontSize: 24,
    fontWeight: '800',
  },
});
