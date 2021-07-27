import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Onboarding } from '../../screen';
import { jsxElement } from '../../config/type';

const { Navigator, Screen } = createStackNavigator();

export default function OnboardingNavigator(): jsxElement {
  return (
    <Navigator headerMode="none">
      <Screen name="onboarding" component={Onboarding} />
    </Navigator>
  );
}
