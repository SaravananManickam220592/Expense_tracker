import { deleteExpense, getExpenses, insertExpense, updateExpense } from '../database/sqlite';
import { ExpenseFilters, ExpenseInput } from '../utils/types';

export const fetchExpenses = (filters?: ExpenseFilters) => {
  return getExpenses(filters);
};

export const createExpense = (expense: ExpenseInput) => {
  return insertExpense(expense);
};

export const saveExpense = (id: number, expense: ExpenseInput) => {
  return updateExpense(id, expense);
};

export const removeExpenseById = (id: number) => {
  return deleteExpense(id);
};
