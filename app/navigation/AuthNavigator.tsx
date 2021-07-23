import * as React from 'react';
import {
  HeaderBackButton,
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { jsxElement } from '../config/model/type';
import { Welcome, Login } from '../screen/Authentication';
import Colors from '../config/Colors';

import { AuthRoutes } from './';
import { Easing } from 'react-native-reanimated';

const { Navigator, Screen } = createStackNavigator<AuthRoutes>();

//TODO: Uninstall expo-blur

export default function AuthNavigator(): jsxElement {
  return (
    <Navigator
      screenOptions={({ navigation }) => ({
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
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
              stiffness: 1000,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
        },
      })}>
      <Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerLeft: undefined,
          headerBackground: undefined,
        }}
      />
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
