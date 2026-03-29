import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { initDatabase } from '../database/sqlite';
import { createCategory, createExpense, fetchCategories, fetchExpenses, removeCategoryById, removeExpenseById, saveCategory, saveExpense } from '../services';
import { Category, CategoryInput, Expense, ExpenseFilters, ExpenseInput } from '../utils/types';

type ExpenseContextValue = {
  categories: Category[];
  expenses: Expense[];
  initializing: boolean;
  loading: boolean;
  error: string | null;
  refreshAll: () => Promise<void>;
  loadExpenses: (filters?: ExpenseFilters) => Promise<void>;
  addCategory: (category: CategoryInput) => Promise<void>;
  editCategory: (id: number, category: CategoryInput) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
  addExpense: (expense: ExpenseInput) => Promise<void>;
  editExpense: (id: number, expense: ExpenseInput) => Promise<void>;
  removeExpense: (id: number) => Promise<void>;
};

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const ExpenseProvider = ({ children }: ProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [categoryRows, expenseRows] = await Promise.all([fetchCategories(), fetchExpenses()]);
      setCategories(categoryRows);
      setExpenses(expenseRows);
    } catch (contextError) {
      setError(contextError instanceof Error ? contextError.message : 'Unable to load expenses.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadExpenses = useCallback(async (filters?: ExpenseFilters) => {
    try {
      setLoading(true);
      setError(null);
      const expenseRows = await fetchExpenses(filters);
      setExpenses(expenseRows);
    } catch (contextError) {
      setError(contextError instanceof Error ? contextError.message : 'Unable to load filtered expenses.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = useCallback(async (category: CategoryInput) => {
    await createCategory(category);
    await refreshAll();
  }, [refreshAll]);

  const editCategory = useCallback(async (id: number, category: CategoryInput) => {
    await saveCategory(id, category);
    await refreshAll();
  }, [refreshAll]);

  const removeCategory = useCallback(async (id: number) => {
    await removeCategoryById(id);
    await refreshAll();
  }, [refreshAll]);

  const addExpense = useCallback(async (expense: ExpenseInput) => {
    await createExpense(expense);
    await refreshAll();
  }, [refreshAll]);

  const editExpense = useCallback(async (id: number, expense: ExpenseInput) => {
    await saveExpense(id, expense);
    await refreshAll();
  }, [refreshAll]);

  const removeExpense = useCallback(async (id: number) => {
    await removeExpenseById(id);
    await refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initDatabase();
        await refreshAll();
      } catch (contextError) {
        setError(contextError instanceof Error ? contextError.message : 'Database setup failed.');
        setLoading(false);
      } finally {
        setInitializing(false);
      }
    };

    void bootstrap();
  }, [refreshAll]);

  const value = useMemo(
    () => ({
      categories,
      expenses,
      initializing,
      loading,
      error,
      refreshAll,
      loadExpenses,
      addCategory,
      editCategory,
      removeCategory,
      addExpense,
      editExpense,
      removeExpense,
    }),
    [categories, expenses, initializing, loading, error, refreshAll, loadExpenses, addCategory, editCategory, removeCategory, addExpense, editExpense, removeExpense],
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpenseTracker = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error('useExpenseTracker must be used within ExpenseProvider.');
  }

  return context;
};
