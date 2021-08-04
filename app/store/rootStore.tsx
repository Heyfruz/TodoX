import React, { createContext, useContext, useEffect } from 'react';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStore, DummyStore, UIState, UserStore } from './stores';
import AppStore from './stores/Store';

interface ProviderProps {
  children: JSX.Element[] | JSX.Element;
}

const hydrate = create({
  storage: AsyncStorage,
});

export class RootStore {
  authStore = new AuthStore(this);
  dummyStore = new DummyStore(this);
  uiState = new UIState(this);
  userStore = new UserStore(this);
  appStore = new AppStore();

  constructor() {
    hydrate('Auth', this.authStore);
    hydrate('Ui', this.uiState);
    hydrate('User', this.userStore);
    hydrate('app', this.appStore);
  }

  async getData(): Promise<void> {
    try {
      const value = await AsyncStorage.getItem('Auth');
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  }

  async clearData(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('done');
    } catch (error) {
      console.log(error);
    }
  }
}

export const store = new RootStore();

const RootStoreContext = createContext(store);
const ThemeContext = createContext(store.uiState);

export const useStore = (): RootStore => useContext(RootStoreContext);
export const useTheme = (): UIState => useContext(ThemeContext);

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  useEffect(() => {
    // store.appStore.createList('Threat', 'hotpink');
    // store.clearData();
  }, []);

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
