import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';

export default class Step {
  id = UUID();
  title = '';
  completed = false;

  constructor(value: string) {
    this.title = value;
  }
}
