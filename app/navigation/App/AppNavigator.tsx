import * as React from 'react';
import {
  CardStyleInterpolators,
  HeaderBackButton,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Easing } from 'react-native-reanimated';

import { jsxElement } from '../../config/type';
import { Home, Profile } from '../../screen';
import { AppRoutes } from '..';
import Setting from '../../screen/App/Setting';
import Colors from '../../config/Colors';
import { Text } from '../../components';
import Task from '../../screen/App/Task';
import Step from '../../screen/App/Step';

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

const AuthNavigator = function (): jsxElement {
  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        ...TransitionPresets.SlideFromRightIOS,
        //cardOverlay can replace the background color option in the app.json file.
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
        // headerTransparent: true,
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
        name="Home"
        component={Home}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="Settings"
        component={Setting}
        options={() => ({
          headerTitle: () => <Text variant="headerSB">Settings</Text>,
        })}
      />
      <Screen name="Task" component={Task} options={() => ({})} />
      <Screen name="Step" component={Step} options={() => ({})} />
    </Navigator>
  );
};

export default AuthNavigator;
