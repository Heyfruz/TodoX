import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { ColorValue } from 'react-native';

import { RootStore } from '../rootStore';

interface themeColors {
  primary: ColorValue | string;
  backgroundColor: ColorValue;
  inactive: ColorValue;
  black: ColorValue;
  blue: ColorValue;
  crayola: ColorValue;
  dark: ColorValue;
  darkBlue: ColorValue;
  green: ColorValue;
  grey: ColorValue;
  lightBlue: ColorValue;
  light: ColorValue;
  mac: ColorValue;
  inputBG: ColorValue;
  orange: ColorValue;
  pink: ColorValue;
  purple: ColorValue;
  red: ColorValue;
  seaWeed: ColorValue;
  white: ColorValue;
  yellow: ColorValue;
  textColor: ColorValue;
  altBG: ColorValue;
}

const constantColors = {
  black: '#000000',
  blue: '#018FFD',
  crayola: '#ea2a4b',
  dark: '#080809',
  darkBlue: '#3640FA',
  green: '#06BA63',
  grey: '#61656C',
  light: '#E0E0E0',
  lightBlue: '#1DC9C9',
  mac: '#EDB88B',
  orange: '#FE6B57',
  pink: '#E24F86',
  primary: '#E04841', //being used as a primary color //#E9D758
  purple: '#8044FE',
  red: '#CC2936',
  seaWeed: '#388697',
  white: '#FFFFFF',
  yellow: '#FE9000',
};

export default class UIState {
  rootStore: RootStore;

  @persist
  theme: 'dark' | 'light' = 'dark';
  @persist
  statusBar: 'dark' | 'light' = 'light';
  @persist
  enabled = false;

  visible = false;
  groupVisible = false;
  longPress = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  colors = {
    dark: {
      ...constantColors,
      altBG: '#17181c', //#15161A #17181c #050506
      backgroundColor: '#1C1D22',
      inactive: '#3B3C40',
      inputBG: '#25262C',
      textColor: '#fff',
    },
    light: {
      ...constantColors,
      altBG: '#f9f9fa', //#f9f9fa
      backgroundColor: '#E9E9ED', //F4F4F6
      inactive: '#E0E0E0',
      inputBG: '#D6D6D6', // DDDDE3
      textColor: '#000',
    },
  };

  toggleTheme(): void {
    if (this.theme === 'dark') {
      this.theme = 'light';
      this.statusBar = 'dark';
    } else if (this.theme === 'light') {
      this.theme = 'dark';
      this.statusBar = 'light';
    }
  }

  getTheme(): themeColors {
    if (this.theme === 'light') return this.colors.light;
    return this.colors.dark;
  }

  setEnabled(): void {
    this.enabled = !this.enabled;
    this.toggleTheme();
  }

  toggleVisible(): void {
    this.visible = !this.visible;
  }

  toggleGroup(): void {
    this.groupVisible = !this.groupVisible;
  }

  toggleLongPress(): void {
    this.longPress = !this.longPress;
  }
}
