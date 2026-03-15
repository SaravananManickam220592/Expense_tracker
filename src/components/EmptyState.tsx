import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from './PrimaryButton';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF8',
    borderRadius: 24,
    padding: 24,
    gap: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E7DDCE',
  },
  title: {
    color: '#132238',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: '#5F6C7B',
    fontSize: 14,
    lineHeight: 20,
  },
});
