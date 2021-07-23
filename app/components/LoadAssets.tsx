import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  DefaultTheme,
  InitialState,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { observer } from 'mobx-react';

import { useStore } from '../store/rootStore';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (
  promises: Promise<void | void[] | Asset[]>[],
  cb: () => void,
) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

function useLoadAssets(assets: number[], fonts: FontSource): boolean {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map(asset => Asset.loadAsync(asset))],
    () => setReady(true),
  );
  return ready;
}

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

const LoadAssets = observer(function ({
  assets,
  fonts,
  children,
}: LoadAssetsProps): JSX.Element | null {
  const { uiState } = useStore();
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});
  const color = uiState.getTheme();
  const theme = uiState.theme;
  const statusBarColor = uiState.statusBar;

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY,
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    state => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );
  if (!ready || !isNavigationReady) {
    return null;
  }

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.primary as string,
      background: color.backgroundColor as string,
      card: color.backgroundColor as string,
      text: color.textColor as string,
    },
    dark: theme === 'dark' ? true : false,
  };

  return (
    <NavigationContainer
      theme={navigationTheme}
      {...{ initialState, onStateChange }}>
      <StatusBar style={statusBarColor} />
      {children}
    </NavigationContainer>
  );
});

export default LoadAssets;
