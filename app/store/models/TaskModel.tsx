import { ColorValue } from 'react-native';
import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';

import { date, day, hour, month, year } from '../../config/Constants';

import Step from './StepModel';

export default class Task {
  id = UUID();
  title = '';
  completed = false;
  steps: Step[] = [new Step('')];
  note = '';
  color: ColorValue | undefined = 'grey';
  date = {
    date: date,
    day: day,
    hour: hour,
    month: month,
    year: year,
  };

  constructor(value: string, color: ColorValue) {
    this.title = value;
    this.color = color;
  }
}
