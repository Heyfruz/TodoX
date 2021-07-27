import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

import { RootStore } from '../rootStore';

export default class AuthStore {
  rootStore: RootStore;
  @persist
  onboarding = false;
  @persist
  email = '';
  @persist
  checkBox = false;
  @persist
  token = false;
  status: 'idle' | 'signOut' | 'signIn' = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setOnboardingCompleted(): void {
    this.onboarding = true;
  }

  setEmail(email: string): void {
    if (this.checkBox === false) return;
    this.email = email;
  }

  setCheckBox(): void {
    this.checkBox = !this.checkBox;
    if (this.checkBox === false) {
      this.email = '';
      console.log('Wiped');
      console.log(this.email);
    }
  }

  login(): void {
    this.token = true;
  }

  logout(): void {
    this.token = false;
  }
}
