import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Category, ExpenseInput } from '../utils/types';
import { FormField } from './FormField';
import { PrimaryButton } from './PrimaryButton';
import { toInputDate } from '../utils/format';

type ExpenseFormProps = {
  categories: Category[];
  initialValues?: ExpenseInput;
  submitLabel: string;
  onSubmit: (values: ExpenseInput) => Promise<void>;
};

export const ExpenseForm = ({ categories, initialValues, submitLabel, onSubmit }: ExpenseFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [amount, setAmount] = useState(initialValues ? String(initialValues.amount) : '');
  const [categoryId, setCategoryId] = useState<number | null>(initialValues?.category_id ?? null);
  const [date, setDate] = useState(initialValues?.date || toInputDate());
  const [note, setNote] = useState(initialValues?.note || '');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; amount?: string; date?: string }>({});

  const hasCategories = categories.length > 0;
  const pickerItems = useMemo(() => categories, [categories]);

  const handleSubmit = async () => {
    const nextErrors: { title?: string; amount?: string; date?: string } = {};

    if (!title.trim()) {
      nextErrors.title = 'Title is required.';
    }

    if (!amount.trim() || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      nextErrors.amount = 'Amount must be a number greater than 0.';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      nextErrors.date = 'Use YYYY-MM-DD.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        amount: Number(amount),
        category_id: categoryId,
        date,
        note: note.trim(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <FormField label="Title" value={title} onChangeText={setTitle} error={errors.title} placeholder="Dinner, taxi, coffee..." />
      <FormField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        error={errors.amount}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />
      <View style={styles.pickerWrap}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoryId ?? 'none'} onValueChange={(value) => setCategoryId(value === 'none' ? null : Number(value))}>
            <Picker.Item label={hasCategories ? 'Uncategorized' : 'No categories yet'} value="none" />
            {pickerItems.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
        </View>
      </View>
      <FormField
        label="Date"
        value={date}
        onChangeText={setDate}
        error={errors.date}
        helperText="Enter date as YYYY-MM-DD"
        placeholder="2026-03-15"
      />
      <FormField
        label="Note"
        value={note}
        onChangeText={setNote}
        placeholder="Optional note"
        multiline
        numberOfLines={4}
        style={styles.noteInput}
      />
      <PrimaryButton label={submitLabel} onPress={() => void handleSubmit()} loading={submitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  pickerWrap: {
    gap: 8,
  },
  label: {
    color: '#223040',
    fontSize: 14,
    fontWeight: '700',
  },
  pickerContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DDCE',
    backgroundColor: '#FFFDF8',
    overflow: 'hidden',
  },
  noteInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
});
