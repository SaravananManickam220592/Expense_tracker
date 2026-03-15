import { getMonthBounds } from '../utils/date';
import { CategoryTotal, DailySpend, Expense, MonthlySummary } from '../utils/types';

const escapeCsvCell = (value: string | number | null | undefined) => {
  const cell = String(value ?? '');
  if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
    return `"${cell.replace(/"/g, '""')}"`;
  }

  return cell;
};

export const getCurrentMonthTotal = (expenses: Expense[]) => {
  const { start, end } = getMonthBounds();
  return expenses
    .filter((expense) => expense.date >= start && expense.date <= end)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const getTodayTotal = (expenses: Expense[]) => {
  const today = new Date().toISOString().slice(0, 10);
  return expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const getRecentExpenses = (expenses: Expense[], limit = 5) => {
  return expenses.slice(0, limit);
};

export const getTopSpendingCategories = (expenses: Expense[]) => {
  const categoryMap = new Map<string, CategoryTotal>();

  expenses.forEach((expense) => {
    const key = String(expense.category_id ?? 'uncategorized');
    const current = categoryMap.get(key);

    if (current) {
      current.total += expense.amount;
      return;
    }

    categoryMap.set(key, {
      categoryId: expense.category_id,
      categoryName: expense.category_name || 'Uncategorized',
      color: expense.category_color || '#B8B8B8',
      total: expense.amount,
    });
  });

  return Array.from(categoryMap.values())
    .sort((left: CategoryTotal, right: CategoryTotal) => right.total - left.total)
    .slice(0, 4);
};

export const buildMonthlySummary = (expenses: Expense[]): MonthlySummary => {
  const { start, end } = getMonthBounds();
  const monthlyExpenses = expenses.filter((expense) => expense.date >= start && expense.date <= end);
  const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    monthLabel: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    total,
    transactionCount: monthlyExpenses.length,
  };
};

export const buildCategoryTotals = (expenses: Expense[]) => {
  return getTopSpendingCategories(expenses);
};

export const getCurrentMonthExpenses = (expenses: Expense[]) => {
  const { start, end } = getMonthBounds();
  return expenses.filter((expense) => expense.date >= start && expense.date <= end);
};

export const buildMonthlyExpensesCsv = (expenses: Expense[]) => {
  const monthlyExpenses = getCurrentMonthExpenses(expenses);
  const header = ['id', 'title', 'amount', 'category', 'date', 'note', 'created_at'];
  const rows = monthlyExpenses.map((expense) => [
    expense.id,
    expense.title,
    expense.amount.toFixed(2),
    expense.category_name || 'Uncategorized',
    expense.date,
    expense.note,
    expense.created_at,
  ]);

  return [header, ...rows].map((row) => row.map((cell) => escapeCsvCell(cell)).join(',')).join('\n');
};

export const buildDailySpendingForMonth = (expenses: Expense[]): DailySpend[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalsByDay = new Map<string, number>();

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    if (Number.isNaN(expenseDate.getTime())) {
      return;
    }

    if (expenseDate.getFullYear() !== year || expenseDate.getMonth() !== month) {
      return;
    }

    const dayKey = expense.date;
    totalsByDay.set(dayKey, (totalsByDay.get(dayKey) || 0) + expense.amount);
  });

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const dateKey = date.toISOString().slice(0, 10);

    return {
      label: String(day),
      total: totalsByDay.get(dateKey) || 0,
    };
  });
};
