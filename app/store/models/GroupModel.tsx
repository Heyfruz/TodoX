import { makeAutoObservable } from 'mobx';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';
import 'react-native-get-random-values';
import { v4 as UUID } from 'uuid';
import { Feather as Icon } from '@expo/vector-icons';

import List from './ListModel';

export default class Group {
  color: ColorValue;
  icon: ComponentProps<typeof Icon>['name'] = 'folder';
  id = UUID();
  list: List[] = [];
  title = '';
  type: 'list' | 'group' = 'group';

  constructor(title: string, color: ColorValue) {
    makeAutoObservable(this);
    this.title = title;
    this.color = color;
  }

  addList(title: string, color: ColorValue): void {
    this.list.push(new List(title, color));
  }
}
