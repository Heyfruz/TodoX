import { makeAutoObservable } from 'mobx';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { persist } from 'mobx-persist';

import { Group, List, ModelProps, Task } from '../models/index';

type DataProps = {
  icon: ComponentProps<typeof Icon>['name'];
  id: number | string;
  title: string;
  color: ColorValue;
  list?: List[];
};

const main: DataProps[] = [
  {
    color: '#8044FE',
    icon: 'sunrise',
    id: 1,
    list: [],
    title: 'My Day',
  },
  {
    color: '#CC2936',
    icon: 'star',
    id: 2,
    list: [],
    title: 'Important',
  },
  {
    color: '#388697',
    icon: 'calendar',
    id: 3,
    list: [],
    title: 'Planned',
  },
  {
    color: '#3640FA',
    icon: 'clipboard',
    id: 4,
    list: [],
    title: 'My task',
  },
  {
    color: '#FE9000',
    icon: 'briefcase',
    id: 5,
    list: [],
    title: 'Work',
  },
];

export default class AppStore {
  @persist('list')
  appDefault: DataProps[] = [...main];
  @persist('list')
  user: ModelProps[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createList(title: string, color: ColorValue): void {
    this.user.push(new List(title, color));
  }
  createGroup(title: string, color: ColorValue): void {
    this.user.push(new Group(title, color));
  }

  createTask(arr: Task[] | undefined, value: string): void {
    arr?.push(new Task(value));
  }
}
