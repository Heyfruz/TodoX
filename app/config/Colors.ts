import { ColorValue } from 'react-native';

export default {
  backgroundColor: '#1C1D22',
  black: '#000000',
  blue: '#018FFD',
  blue_dk: '#3640FA',
  blue_lt: '#1DC9C9',
  crayola: '#ea2a4b',
  dark: '#080809',
  dark_lt: '#25262C',
  green: '#06BA63',
  grey: '#61656C',
  inactive: '#E0E0E0',
  light: '#E0E0E0',
  mac: '#EDB88B',
  orange: '#FE6B57',
  pink: '#E24F86',
  primary: '#E04841',
  purple: '#8044FE',
  red: '#CC2936',
  seaWeed: '#388697',
  white: '#FFFFFF',
  yellow: '#FE9000',
};

type Color = {
  code: ColorValue;
  name: string;
};

export const picker: Color[] = [
  {
    code: '#81C0E7',
    name: 'Aero',
  },
  {
    code: '#018FFD',
    name: 'Blue',
  },
  {
    code: '#ea2a4b',
    name: 'Crayola',
  },
  {
    code: '#3640FA',
    name: 'Dark Blue',
  },
  {
    code: '#06BA63',
    name: 'Green',
  },
  {
    code: '#1DC9C9',
    name: 'Light Blue',
  },
  {
    code: '#EDB88B',
    name: 'Mac',
  },
  {
    code: '#C2714F',
    name: 'Copper',
  },
  {
    code: '#FE6B57',
    name: 'Orange',
  },
  {
    code: '#E24F86',
    name: 'Pink',
  },
  {
    code: '#8044FE',
    name: 'Purple',
  },
  {
    code: '#CC2936',
    name: 'Red',
  },
  {
    code: '#388697',
    name: 'Seaweed',
  },
  {
    code: '#FE9000',
    name: 'Yellow',
  },
];
