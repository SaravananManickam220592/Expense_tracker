import { Expense } from './types';

export const getMonthBounds = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
};

export const getWeekStart = (date: Date) => {
  const result = new Date(date.getTime());
  const day = result.getDay();
  const diff = result.getDate() - day;
  result.setDate(diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const groupExpensesByWeek = (expenses: Expense[]) => {
  const grouped = new Map<string, number>();

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    if (Number.isNaN(expenseDate.getTime())) {
      return;
    }

    const weekStart = getWeekStart(expenseDate).toISOString().slice(0, 10);
    grouped.set(weekStart, (grouped.get(weekStart) || 0) + expense.amount);
  });

  return Array.from(grouped.entries())
    .sort(([left]: [string, number], [right]: [string, number]) => left.localeCompare(right))
    .map(([weekStart, total]: [string, number]) => ({
      label: weekStart.slice(5),
      total,
    }));
};
