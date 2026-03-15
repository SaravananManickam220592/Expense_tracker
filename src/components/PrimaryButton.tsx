import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
  loading?: boolean;
};

export const PrimaryButton = ({
  label,
  onPress,
  variant = 'solid',
  disabled = false,
  loading = false,
}: PrimaryButtonProps) => {
  const outline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outlineButton : styles.solidButton,
        (disabled || loading) && styles.disabledButton,
        pressed && !disabled && !loading && styles.pressedButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={outline ? '#D97757' : '#FFFDF8'} />
      ) : (
        <Text style={[styles.label, outline ? styles.outlineLabel : styles.solidLabel]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidButton: {
    backgroundColor: '#D97757',
  },
  outlineButton: {
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#D97757',
  },
  disabledButton: {
    opacity: 0.6,
  },
  pressedButton: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  solidLabel: {
    color: '#FFFDF8',
  },
  outlineLabel: {
    color: '#D97757',
  },
});
