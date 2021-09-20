import { Dimensions } from 'react-native';

export const { height, width } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.65 * height;

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dateObj = new Date();
export const day = days[dateObj.getDay()];
export const month = months[dateObj.getMonth()];
export const date = dateObj.getDate();
export const year = dateObj.getFullYear();
export const hour = dateObj.getHours() + ':' + dateObj.getMinutes();
