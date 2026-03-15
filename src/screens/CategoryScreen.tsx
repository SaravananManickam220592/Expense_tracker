import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { CategoryForm } from '../components/CategoryForm';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionCard } from '../components/SectionCard';
import { useExpenseTracker } from '../context/ExpenseContext';
import { getCategoryIconGlyph } from '../utils/categoryAppearance';
import { Category } from '../utils/types';

export const CategoryScreen = () => {
  const { categories, addCategory, editCategory, removeCategory } = useExpenseTracker();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = (categoryId: number) => {
    Alert.alert('Delete category', 'Expenses in this category will become uncategorized.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void removeCategory(categoryId);
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      <SectionCard
        title={editingCategory ? 'Edit category' : 'Add category'}
        subtitle="Keep category colors consistent so dashboard and reports stay readable"
      >
        <CategoryForm
          initialValues={
            editingCategory
              ? {
                  name: editingCategory.name,
                  color: editingCategory.color,
                  icon: editingCategory.icon,
                }
              : undefined
          }
          submitLabel={editingCategory ? 'Update category' : 'Save category'}
          onSubmit={async (values) => {
            if (editingCategory) {
              await editCategory(editingCategory.id, values);
              setEditingCategory(null);
              return;
            }

            await addCategory(values);
          }}
        />
        {editingCategory ? <PrimaryButton label="Cancel edit" onPress={() => setEditingCategory(null)} variant="outline" /> : null}
      </SectionCard>

      <SectionCard title="Your categories" subtitle="Used for organizing expenses and reports">
        {categories.length ? (
          categories.map((category) => (
            <View key={category.id} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View style={[styles.iconBadge, { backgroundColor: category.color || '#D97757' }]}>
                  <Text style={styles.iconGlyph}>{getCategoryIconGlyph(category.icon)}</Text>
                </View>
                <View style={styles.categoryTextWrap}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryMeta}>{category.icon || 'tag'} · {category.color || 'coral'}</Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable style={styles.textAction} onPress={() => setEditingCategory(category)}>
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>
                <Pressable style={styles.textAction} onPress={() => handleDelete(category.id)}>
                  <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <EmptyState title="No categories yet" description="Add a few categories to start classifying your expenses." />
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: {
    fontSize: 18,
  },
  categoryTextWrap: {
    gap: 4,
  },
  categoryName: {
    color: '#132238',
    fontSize: 15,
    fontWeight: '700',
  },
  categoryMeta: {
    color: '#62707F',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  textAction: {
    paddingVertical: 6,
  },
  actionText: {
    color: '#132238',
    fontWeight: '700',
  },
  deleteText: {
    color: '#C05252',
  },
});
