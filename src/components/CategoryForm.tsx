import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CATEGORY_COLOR_OPTIONS, CATEGORY_ICON_OPTIONS, getCategoryColorInputValue, getCategoryIconGlyph, normalizeCategoryColor, normalizeCategoryIcon } from '../utils/categoryAppearance';
import { CategoryInput } from '../utils/types';
import { FormField } from './FormField';
import { PrimaryButton } from './PrimaryButton';

type CategoryFormProps = {
  initialValues?: CategoryInput;
  submitLabel: string;
  onSubmit: (values: CategoryInput) => Promise<void>;
};

export const CategoryForm = ({ initialValues, submitLabel, onSubmit }: CategoryFormProps) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [color, setColor] = useState(getCategoryColorInputValue(initialValues?.color || 'coral'));
  const [icon, setIcon] = useState(initialValues?.icon || 'tag');
  const [customColor, setCustomColor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setName(initialValues?.name || '');
    const initialColorValue = getCategoryColorInputValue(initialValues?.color || 'coral');
    setColor(initialColorValue.startsWith('#') ? 'custom' : initialColorValue);
    setCustomColor(initialColorValue.startsWith('#') ? initialColorValue : '');
    setIcon(initialValues?.icon || 'tag');
    setError(undefined);
  }, [initialValues]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    setError(undefined);
    setSubmitting(true);
    try {
      const resolvedColor = color === 'custom' ? normalizeCategoryColor(customColor) : normalizeCategoryColor(color);
      await onSubmit({
        name: name.trim(),
        color: resolvedColor,
        icon: normalizeCategoryIcon(icon),
      });
      if (!initialValues) {
        setName('');
        setColor('coral');
        setIcon('tag');
        setCustomColor('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <FormField label="Name" value={name} onChangeText={setName} error={error} placeholder="Food, Travel..." />
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Color</Text>
        <View style={styles.chipWrap}>
          {CATEGORY_COLOR_OPTIONS.map((option) => {
            const selected = color === option;
            return (
              <Pressable
                key={option}
                onPress={() => setColor(option)}
                style={[styles.colorChip, selected && styles.selectedChip]}
              >
                <View style={[styles.colorDot, { backgroundColor: normalizeCategoryColor(option) }]} />
                <Text style={[styles.chipLabel, selected && styles.selectedChipLabel]}>{option}</Text>
              </Pressable>
            );
          })}
          <Pressable onPress={() => setColor('custom')} style={[styles.colorChip, color === 'custom' && styles.selectedChip]}>
            <Text style={[styles.chipLabel, color === 'custom' && styles.selectedChipLabel]}>Custom</Text>
          </Pressable>
        </View>
        {color === 'custom' ? (
          <FormField
            label="Custom color code"
            value={customColor}
            onChangeText={setCustomColor}
            helperText="Use a hex code like #3A86FF"
            placeholder="#3A86FF"
          />
        ) : null}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Icon</Text>
        <View style={styles.chipWrap}>
          {CATEGORY_ICON_OPTIONS.map((option) => {
            const selected = icon === option;
            return (
              <Pressable key={option} onPress={() => setIcon(option)} style={[styles.iconChip, selected && styles.selectedChip]}>
                <Text style={styles.iconGlyph}>{getCategoryIconGlyph(option)}</Text>
                <Text style={[styles.chipLabel, selected && styles.selectedChipLabel]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.previewRow}>
        <View style={[styles.colorPreview, { backgroundColor: color === 'custom' ? normalizeCategoryColor(customColor) : normalizeCategoryColor(color) }]} />
        <Text style={styles.previewText}>{getCategoryIconGlyph(icon)} Preview</Text>
      </View>
      <PrimaryButton label={submitLabel} onPress={() => void handleSubmit()} loading={submitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    color: '#223040',
    fontSize: 14,
    fontWeight: '700',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7DDCE',
  },
  iconChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7DDCE',
  },
  selectedChip: {
    backgroundColor: '#FFF1EC',
    borderColor: '#D97757',
  },
  chipLabel: {
    color: '#4B5968',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  selectedChipLabel: {
    color: '#B85738',
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
  },
  iconGlyph: {
    fontSize: 16,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorPreview: {
    width: 22,
    height: 22,
    borderRadius: 999,
  },
  previewText: {
    color: '#4B5968',
    fontSize: 13,
    fontWeight: '600',
  },
});
