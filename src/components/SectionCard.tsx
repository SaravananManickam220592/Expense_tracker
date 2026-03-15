import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export const SectionCard = ({ title, subtitle, children }: SectionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF8',
    borderRadius: 24,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E7DDCE',
  },
  header: {
    gap: 4,
  },
  title: {
    color: '#132238',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#62707F',
    fontSize: 13,
  },
});
