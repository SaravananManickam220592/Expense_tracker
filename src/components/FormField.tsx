import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
  error?: string;
};

export const FormField = ({ label, helperText, error, style, ...props }: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="#8B8A87"
        style={[styles.input, error ? styles.inputError : undefined, style]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: '#223040',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCE',
    backgroundColor: '#FFFDF8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#132238',
    fontSize: 15,
  },
  inputError: {
    borderColor: '#D64545',
  },
  helperText: {
    color: '#6B7280',
    fontSize: 12,
  },
  errorText: {
    color: '#D64545',
    fontSize: 12,
  },
});
