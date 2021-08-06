// import { makeAutoObservable } from 'mobx';
import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';
import { Feather as Icon } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';

import Task from './TaskModel';

export default class List {
  id = UUID();
  icon: ComponentProps<typeof Icon>['name'] = 'list';
  title = '';
  task: Task[] = [];
  complete = false;
  color;
  type: 'list' | 'group' = 'list';

  constructor(title: string, color: ColorValue) {
    this.title = title;
    this.color = color;
  }

  setCompleted(): void {
    this.complete = true;
  }
  setUncompleted(): void {
    this.complete = false;
  }
}
