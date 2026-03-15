import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
};

export const ScreenContainer = ({ children, scroll = true }: ScreenContainerProps) => {
  if (!scroll) {
    return <View style={styles.body}>{children}</View>;
  }

  return <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F1E8',
  },
  content: {
    padding: 20,
    gap: 18,
    backgroundColor: '#F5F1E8',
  },
});
