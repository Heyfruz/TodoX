import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

import { RootStore } from '../rootStore';

export default class AuthStore {
  rootStore: RootStore;

  @persist
  count = 0;

  @persist
  onboarding = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }

  setOnboardingCompleted(): void {
    this.onboarding = true;
  }
}
