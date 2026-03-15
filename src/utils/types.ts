export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

export type CategoryInput = Omit<Category, 'id'>;

export type Expense = {
  id: number;
  title: string;
  amount: number;
  category_id: number | null;
  category_name?: string | null;
  category_color?: string | null;
  category_icon?: string | null;
  date: string;
  note: string;
  created_at: string;
};

export type ExpenseInput = {
  title: string;
  amount: number;
  category_id: number | null;
  date: string;
  note: string;
};

export type ExpenseFilters = {
  search?: string;
  categoryId?: number | null;
  startDate?: string;
  endDate?: string;
};

export type DashboardCard = {
  label: string;
  value: string;
  accent: string;
};

export type CategoryTotal = {
  categoryId: number | null;
  categoryName: string;
  color: string;
  total: number;
};

export type DailySpend = {
  label: string;
  total: number;
};

export type MonthlySummary = {
  monthLabel: string;
  total: number;
  transactionCount: number;
};
