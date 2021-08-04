import { makeAutoObservable } from 'mobx';
import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';
import { Feather as Icon } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';

import Task from './TaskModel';

interface ListModel {
  id: string;
  value: string;
}

export default class List {
  id = UUID();
  icon: ComponentProps<typeof Icon>['name'] = 'list';
  title = '';
  task: ListModel[] = [];
  complete = false;
  color;

  constructor(title: string, color: ColorValue) {
    makeAutoObservable(this);
    this.title = title;
    this.color = color;
  }

  setCompleted(): void {
    this.complete = true;
  }
  setUncompleted(): void {
    this.complete = false;
  }

  addTask(value: string): void {
    this.task.push(new Task(value));
  }
}
