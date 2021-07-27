import React, { createContext, useContext } from 'react';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStore, DummyStore, UiState, UserStore } from './stores';

interface ProviderProps {
  children: JSX.Element[] | JSX.Element;
}

const hydrate = create({
  storage: AsyncStorage,
});

export class RootStore {
  authStore = new AuthStore(this);
  dummyStore = new DummyStore(this);
  uiState = new UiState(this);
  userStore = new UserStore(this);

  constructor() {
    hydrate('Auth', this.authStore);
    hydrate('Ui', this.uiState);
    hydrate('User', this.userStore);
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
export const useTheme = (): UiState => useContext(ThemeContext);

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
