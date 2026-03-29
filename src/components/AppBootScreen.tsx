import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const AppBootScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoCard}>
        <Text style={styles.logoText}>Rs</Text>
      </View>
      <View style={styles.copyWrap}>
        <Text style={styles.title}>Expense Tracker</Text>
        <Text style={styles.subtitle}>Loading your dashboard and local expense history</Text>
      </View>
      <ActivityIndicator size="large" color="#D97757" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 28,
    gap: 24,
  },
  logoCard: {
    width: 126,
    height: 126,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D97757',
    shadowColor: '#A65138',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  logoText: {
    color: '#FFFDF8',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1,
  },
  copyWrap: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#132238',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#62707F',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
});