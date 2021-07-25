import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
