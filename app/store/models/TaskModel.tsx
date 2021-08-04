import { makeAutoObservable } from 'mobx';
import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';

export default class Task {
  id = UUID();
  value = '';
  completed = false;

  constructor(value: string) {
    this.value = value;
    makeAutoObservable(this);
  }

  setComplete(): void {
    this.completed = !this.completed;
  }
}
