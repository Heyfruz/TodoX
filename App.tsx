import { observer } from 'mobx-react';
import React from 'react';

import { LoadAssets } from './app/components';
import { AuthNavigator, OnboardingNavigator } from './app/navigation';
import { assets as authenticationAssets } from './app/screen/Authentication';
import { Provider, useStore } from './app/store/rootStore';

const fonts = {
  Saira: require('./app/assets/fonts/SairaCondensed-Regular.ttf'),
  SairaMD: require('./app/assets/fonts/SairaCondensed-Medium.ttf'),
  SairaSB: require('./app/assets/fonts/SairaCondensed-SemiBold.ttf'),
  Sarpanch: require('./app/assets/fonts/Sarpanch-Bold.ttf'),
  Titillium: require('./app/assets/fonts/Titillium-Regular.ttf'),
  TitilliumBD: require('./app/assets/fonts/Titillium-Bold.ttf'),
  TitilliumSB: require('./app/assets/fonts/Titillium-Semibold.ttf'),
};

const assets = [...authenticationAssets];

const App = observer(function (): JSX.Element {
  const { authStore } = useStore();

  return (
    <Provider>
      <LoadAssets {...{ assets, fonts }}>
        {authStore.onboarding ? <AuthNavigator /> : <OnboardingNavigator />}
      </LoadAssets>
    </Provider>
  );
});

export default App;
