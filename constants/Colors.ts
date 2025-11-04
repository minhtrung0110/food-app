// src/theme/colors.ts
// Bám theo globals.css (NativeWind @theme) của bạn
// Mọi giá trị đánh dấu `as const` để có type an toàn.

export const COLOR = {
  white: '#fff',
  black: '#000',

  primary: {
    500: '#FF8B00',
    400: '#FF991F',
    300: '#FFAB00',
    200: '#FFC400',
    100: '#FFE380',
    75: '#FFF0B3',
    50: '#FFFAE5',
  },

  neutral: {
    400: '#505F79',
    300: '#5E6C84',
    200: '#6B778C',
    100: '#7A869A',
    90: '#8993A4',
    80: '#97A0AF',
    70: '#A5ADBA',
    60: '#B3BAC5',
    50: '#C1C7D0',
    40: '#DFE1E6',
    42: '#F4F5F7',
    '01': '#FAFBFC', // giữ nguyên key '01'
  },

  teal: {
    500: '#008DA6',
    400: '#00A3BF',
    300: '#00B8D9',
    200: '#00C7E6',
    100: '#79E2F2',
    75: '#B3F5FF',
    50: '#E6FCFF',
  },

  purple: {
    500: '#403294',
    400: '#5243AA',
    300: '#6554C0',
    200: '#8777D9',
    100: '#998DD9',
    75: '#C0B6F2',
    50: '#EAE6FF',
  },

  green: {
    500: '#006644',
    400: '#00875A',
    300: '#36B37E',
    200: '#57D9A3',
    100: '#79F2C0',
    75: '#ABF5D1',
    50: '#E2FFEE',
  },

  blue: {
    600: '#063F94',
    500: '#0747A6',
    400: '#0052CC',
    300: '#0065FF',
    200: '#2684FF',
    75: '#B3D4FF',
    50: '#DEEBFF',
  },
} as const;

// ---- TYPES ----
type ShadeKey = keyof (typeof COLOR)['primary'] | '600' | '42' | '01'; // union các shade có mặt
type FamilyKey = keyof typeof COLOR; // 'white' | 'black' | 'primary' | ...

// Với family có shade:
type PaletteFamily = Exclude<FamilyKey, 'white' | 'black'>;

// Tạo union 'primary-500' | 'neutral-42' | ...
export type FlatColorKey =
  | 'white'
  | 'black'
  | `${PaletteFamily}-${Exclude<ShadeKey, '600' | '01' | '42'>}` // phổ biến
  | 'blue-600'
  | 'neutral-42'
  | 'neutral-01';

// ---- FLAT MAP ----
export const FLAT_COLOR: Record<FlatColorKey, string> = {
  white: COLOR.white,
  black: COLOR.black,

  'primary-500': COLOR.primary[500],
  'primary-400': COLOR.primary[400],
  'primary-300': COLOR.primary[300],
  'primary-200': COLOR.primary[200],
  'primary-100': COLOR.primary[100],
  'primary-75': COLOR.primary[75],
  'primary-50': COLOR.primary[50],

  'neutral-400': COLOR.neutral[400],
  'neutral-300': COLOR.neutral[300],
  'neutral-200': COLOR.neutral[200],
  'neutral-100': COLOR.neutral[100],
  'neutral-90': COLOR.neutral[90],
  'neutral-80': COLOR.neutral[80],
  'neutral-70': COLOR.neutral[70],
  'neutral-60': COLOR.neutral[60],
  'neutral-50': COLOR.neutral[50],
  'neutral-40': COLOR.neutral[40],
  'neutral-42': COLOR.neutral[42],
  'neutral-01': COLOR.neutral['01'],

  'teal-500': COLOR.teal[500],
  'teal-400': COLOR.teal[400],
  'teal-300': COLOR.teal[300],
  'teal-200': COLOR.teal[200],
  'teal-100': COLOR.teal[100],
  'teal-75': COLOR.teal[75],
  'teal-50': COLOR.teal[50],

  'purple-500': COLOR.purple[500],
  'purple-400': COLOR.purple[400],
  'purple-300': COLOR.purple[300],
  'purple-200': COLOR.purple[200],
  'purple-100': COLOR.purple[100],
  'purple-75': COLOR.purple[75],
  'purple-50': COLOR.purple[50],

  'green-500': COLOR.green[500],
  'green-400': COLOR.green[400],
  'green-300': COLOR.green[300],
  'green-200': COLOR.green[200],
  'green-100': COLOR.green[100],
  'green-75': COLOR.green[75],
  'green-50': COLOR.green[50],

  'blue-600': COLOR.blue[600],
  'blue-500': COLOR.blue[500],
  'blue-400': COLOR.blue[400],
  'blue-300': COLOR.blue[300],
  'blue-200': COLOR.blue[200],
  'blue-75': COLOR.blue[75],
  'blue-50': COLOR.blue[50],
} as const;

// ---- HELPERS ----

// Lấy nhanh màu phẳng: getColor('primary-500')
export function getColor(name: FlatColorKey): string {
  return FLAT_COLOR[name];
}

// Alias tiện: COLOR.PRIMARY = primary-500 (brand)
export const BRAND_PRIMARY = COLOR.primary[500] as string;
