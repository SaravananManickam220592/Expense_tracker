import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Category, ExpenseFilters as ExpenseFiltersType } from '../utils/types';
import { getCategoryIconGlyph } from '../utils/categoryAppearance';
import { FormField } from './FormField';
import { PrimaryButton } from './PrimaryButton';

type ExpenseFiltersProps = {
  categories: Category[];
  values: ExpenseFiltersType;
  onChange: (values: ExpenseFiltersType) => void;
  onReset: () => void;
};

export const ExpenseFilters = ({ categories, values, onChange, onReset }: ExpenseFiltersProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Search and filter</Text>
      <FormField
        label="Search title"
        value={values.search || ''}
        onChangeText={(search) => onChange({ ...values, search })}
        placeholder="Search expenses"
      />
      <View style={styles.pickerWrap}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={typeof values.categoryId === 'number' ? String(values.categoryId) : 'all'}
            onValueChange={(categoryId) => onChange({ ...values, categoryId: categoryId === 'all' ? null : Number(categoryId) })}
          >
            <Picker.Item label="All categories" value="all" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={`${getCategoryIconGlyph(category.icon)} ${category.name}`}
                value={String(category.id)}
              />
            ))}
          </Picker>
        </View>
      </View>
      <FormField
        label="Start date"
        value={values.startDate || ''}
        onChangeText={(startDate) => onChange({ ...values, startDate })}
        placeholder="YYYY-MM-DD"
      />
      <FormField
        label="End date"
        value={values.endDate || ''}
        onChangeText={(endDate) => onChange({ ...values, endDate })}
        placeholder="YYYY-MM-DD"
      />
      <PrimaryButton label="Reset filters" onPress={onReset} variant="outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF8',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E7DDCE',
  },
  title: {
    color: '#132238',
    fontSize: 18,
    fontWeight: '700',
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
});
