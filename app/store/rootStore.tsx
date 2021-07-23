import React, { createContext, useContext } from 'react';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStore, DummyStore, UiState } from './stores';

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

  constructor() {
    hydrate('Auth', this.authStore);
    hydrate('Ui', this.uiState);
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

const store = new RootStore();

const RootStoreContext = createContext(store);
const ThemeContext = createContext(store.uiState);

export const useStore = (): RootStore => useContext(RootStoreContext);
export const useTheme = (): UiState => useContext(ThemeContext);

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log('Sentence');
  //     // store.getData();
  //     // const color = store.uiState.getTheme();
  //     // console.log(color.primary);
  //     // console.log('Rerendering');

  //     return () => {
  //       console.log('Stopping');
  //       clearInterval(interval);
  //     };
  //   }, 5000);
  // }, []);

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
