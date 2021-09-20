import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ModelProps, Task } from '../store/models';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type AuthRoutes = {
  Welcome: undefined;
  Login: undefined;
  Email: { email: 'email' } | undefined;
  SignUp: { email: 'email' } | undefined;
};

export type AppRoutes = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Task: { item?: ModelProps };
  Step: Task;
};
