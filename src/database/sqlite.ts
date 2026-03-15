import * as SQLite from 'expo-sqlite';

import { Category, CategoryInput, Expense, ExpenseFilters, ExpenseInput } from '../utils/types';
import { toInputDate } from '../utils/format';

const databasePromise = SQLite.openDatabaseAsync('expense-tracker.db');

const getDatabase = async () => {
  return databasePromise;
};

const seedCategories: CategoryInput[] = [
  { name: 'Food', color: '#E76F51', icon: 'food' },
  { name: 'Transport', color: '#2A9D8F', icon: 'transport' },
  { name: 'Bills', color: '#264653', icon: 'bills' },
  { name: 'Leisure', color: '#F4A261', icon: 'leisure' },
];

const seedExpenses: ExpenseInput[] = [
  {
    title: 'Groceries',
    amount: 48.35,
    category_id: 1,
    date: toInputDate(new Date()),
    note: 'Weekly market visit',
  },
  {
    title: 'Metro pass',
    amount: 22.5,
    category_id: 2,
    date: toInputDate(new Date()),
    note: 'Recharge card',
  },
  {
    title: 'Internet bill',
    amount: 60,
    category_id: 3,
    date: toInputDate(new Date()),
    note: 'Home broadband',
  },
];

export const initDatabase = async () => {
  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT,
      icon TEXT
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category_id INTEGER,
      date TEXT,
      note TEXT,
      created_at TEXT,
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
  `);

  const categoryCount = await database.getFirstAsync<{ total: number }>('SELECT COUNT(*) AS total FROM categories');
  if (!categoryCount || categoryCount.total === 0) {
    for (const category of seedCategories) {
      await database.runAsync('INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)', [
        category.name,
        category.color,
        category.icon,
      ]);
    }
  }

  const expenseCount = await database.getFirstAsync<{ total: number }>('SELECT COUNT(*) AS total FROM expenses');
  if (!expenseCount || expenseCount.total === 0) {
    for (const expense of seedExpenses) {
      await database.runAsync(
        'INSERT INTO expenses (title, amount, category_id, date, note, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          expense.title,
          expense.amount,
          expense.category_id,
          expense.date,
          expense.note,
          new Date().toISOString(),
        ],
      );
    }
  }
};

export const insertCategory = async (category: CategoryInput) => {
  const database = await getDatabase();
  const result = await database.runAsync('INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)', [
    category.name,
    category.color,
    category.icon,
  ]);

  return Number(result.lastInsertRowId);
};

export const updateCategory = async (id: number, category: CategoryInput) => {
  const database = await getDatabase();
  await database.runAsync('UPDATE categories SET name = ?, color = ?, icon = ? WHERE id = ?', [
    category.name,
    category.color,
    category.icon,
    id,
  ]);
};

export const deleteCategory = async (id: number) => {
  const database = await getDatabase();
  await database.runAsync('UPDATE expenses SET category_id = NULL WHERE category_id = ?', [id]);
  await database.runAsync('DELETE FROM categories WHERE id = ?', [id]);
};

export const getCategories = async () => {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Category>('SELECT * FROM categories ORDER BY name COLLATE NOCASE ASC');
  return rows;
};

export const insertExpense = async (expense: ExpenseInput) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO expenses (title, amount, category_id, date, note, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [expense.title, expense.amount, expense.category_id, expense.date, expense.note, new Date().toISOString()],
  );

  return Number(result.lastInsertRowId);
};

export const updateExpense = async (id: number, expense: ExpenseInput) => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE expenses SET title = ?, amount = ?, category_id = ?, date = ?, note = ? WHERE id = ?',
    [expense.title, expense.amount, expense.category_id, expense.date, expense.note, id],
  );
};

export const deleteExpense = async (id: number) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM expenses WHERE id = ?', [id]);
};

export const getExpenses = async (filters: ExpenseFilters = {}) => {
  const database = await getDatabase();

  const clauses: string[] = [];
  const params: (string | number | null)[] = [];

  if (filters.search) {
    clauses.push('LOWER(e.title) LIKE ?');
    params.push(`%${filters.search.toLowerCase()}%`);
  }

  if (typeof filters.categoryId === 'number') {
    clauses.push('e.category_id = ?');
    params.push(filters.categoryId);
  }

  if (filters.startDate) {
    clauses.push('e.date >= ?');
    params.push(filters.startDate);
  }

  if (filters.endDate) {
    clauses.push('e.date <= ?');
    params.push(filters.endDate);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const query = `
    SELECT
      e.id,
      e.title,
      e.amount,
      e.category_id,
      e.date,
      e.note,
      e.created_at,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon
    FROM expenses e
    LEFT JOIN categories c ON c.id = e.category_id
    ${whereClause}
    ORDER BY e.date DESC, e.created_at DESC
  `;

  const rows = await database.getAllAsync<Expense>(query, params);
  return rows;
};
