import { deleteCategory, getCategories, insertCategory, updateCategory } from '../database/sqlite';
import { CategoryInput } from '../utils/types';

export const fetchCategories = () => {
  return getCategories();
};

export const createCategory = (category: CategoryInput) => {
  return insertCategory(category);
};

export const saveCategory = (id: number, category: CategoryInput) => {
  return updateCategory(id, category);
};

export const removeCategoryById = (id: number) => {
  return deleteCategory(id);
};
