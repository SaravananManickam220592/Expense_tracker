const COLOR_NAME_MAP: Record<string, string> = {
  red: '#E76F51',
  coral: '#E76F51',
  orange: '#F4A261',
  amber: '#E9C46A',
  yellow: '#E9C46A',
  lime: '#84CC16',
  green: '#2A9D8F',
  teal: '#2A9D8F',
  mint: '#10B981',
  cyan: '#06B6D4',
  blue: '#3A86FF',
  sky: '#0EA5E9',
  navy: '#264653',
  indigo: '#4F46E5',
  violet: '#7C3AED',
  pink: '#E76F9F',
  purple: '#8B5CF6',
  magenta: '#DB2777',
  brown: '#8D6E63',
  black: '#1F2937',
  silver: '#94A3B8',
  slate: '#64748B',
  gray: '#9CA3AF',
  grey: '#9CA3AF',
  white: '#F8FAFC',
};

const ICON_GLYPH_MAP: Record<string, string> = {
  food: '🍽️',
  'fork-knife': '🍽️',
  meal: '🍽️',
  groceries: '🛒',
  shopping: '🛒',
  cart: '🛒',
  transport: '🚌',
  bus: '🚌',
  cab: '🚕',
  taxi: '🚕',
  car: '🚗',
  bike: '🚲',
  train: '🚆',
  metro: '🚇',
  fuel: '⛽',
  bills: '💡',
  bill: '💡',
  flash: '💡',
  utilities: '💡',
  rent: '🏠',
  home: '🏠',
  leisure: '🎮',
  fun: '🎮',
  game: '🎮',
  'game-controller': '🎮',
  health: '💊',
  medical: '💊',
  doctor: '🩺',
  medicine: '💊',
  salary: '💼',
  work: '💼',
  business: '💼',
  travel: '✈️',
  flight: '✈️',
  hotel: '🏨',
  gift: '🎁',
  education: '📚',
  book: '📚',
  coffee: '☕',
  dining: '🍴',
  snacks: '🍟',
  movie: '🎬',
  entertainment: '🎬',
  music: '🎵',
  pet: '🐾',
  child: '🧸',
  family: '👨‍👩‍👧',
  savings: '💰',
  investment: '📈',
  phone: '📱',
  internet: '🌐',
  wifi: '📶',
  insurance: '🛡️',
  tax: '🧾',
  beauty: '💄',
  gym: '🏋️',
  sports: '⚽',
  clothing: '👕',
  clothes: '👕',
  repair: '🔧',
  tools: '🛠️',
  charity: '🤝',
  festival: '🎉',
  tag: '🏷️',
};

const REVERSE_COLOR_NAME_MAP: Record<string, string> = Object.entries(COLOR_NAME_MAP).reduce<Record<string, string>>(
  (accumulator, [name, hex]) => {
    if (!accumulator[hex]) {
      accumulator[hex] = name;
    }
    return accumulator;
  },
  {},
);

export const normalizeCategoryColor = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();

  if (!normalizedValue) {
    return COLOR_NAME_MAP.coral;
  }

  if (normalizedValue.startsWith('#')) {
    return value.trim();
  }

  return COLOR_NAME_MAP[normalizedValue] || COLOR_NAME_MAP.coral;
};

export const getCategoryColorInputValue = (value: string) => {
  if (!value) {
    return 'coral';
  }

  return REVERSE_COLOR_NAME_MAP[value] || value;
};

export const normalizeCategoryIcon = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue || 'tag';
};

export const getCategoryIconGlyph = (value?: string | null) => {
  if (!value) {
    return ICON_GLYPH_MAP.tag;
  }

  return ICON_GLYPH_MAP[value.trim().toLowerCase()] || '🏷️';
};

export const CATEGORY_COLOR_OPTIONS = ['coral', 'orange', 'yellow', 'lime', 'green', 'mint', 'blue', 'navy', 'indigo', 'pink', 'purple', 'brown', 'gray'];
export const CATEGORY_ICON_OPTIONS = ['food', 'shopping', 'transport', 'car', 'bills', 'home', 'leisure', 'movie', 'health', 'salary', 'travel', 'gift', 'education', 'coffee', 'savings', 'phone', 'clothing', 'gym'];
