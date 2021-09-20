import { Feather as Icon } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ColorValue } from 'react-native';

import { List, Step, Task } from '.';

export default interface ModelProps {
  color: ColorValue;
  icon: ComponentProps<typeof Icon>['name'];
  id: string;
  title: string;
  type: 'list' | 'group';
  list?: List[];
  task?: Task[];
  steps?: Step[];
  complete?: boolean;
  addList?: (title: string, color: ColorValue) => void;
  setCompleted?: () => void;
  setUncompleted?: () => void;
  add?: (value: string) => void;
}
