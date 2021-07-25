import * as React from 'react';
import {
  CardStyleInterpolators,
  HeaderBackButton,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Easing } from 'react-native-reanimated';

import { jsxElement } from '../config/type';
import { Login, SignUp, Welcome } from '../screen/Authentication';
import Colors from '../config/Colors';
import Email from '../screen/Authentication/Email';

import { AuthRoutes } from './';

const { Navigator, Screen } = createStackNavigator<AuthRoutes>();

export default function AuthNavigator(): jsxElement {
  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        ...TransitionPresets.SlideFromRightIOS,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              navigation.goBack();
            }}
            tintColor={Colors.primary}
          />
        ),
        headerTitle: '',
        headerTransparent: true,
        transitionSpec: {
          close: {
            animation: 'timing',
            config: {
              duration: 250,
              easing: Easing.ease,
            },
          },
          open: {
            animation: 'spring',
            config: {
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
              stiffness: 1000,
            },
          },
        },
      })}>
      <Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerBackground: undefined,
          headerLeft: undefined,
        }}
      />
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Email"
        component={Email}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
