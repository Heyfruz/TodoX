import { makeAutoObservable } from 'mobx';

import { RootStore } from '../rootStore';

export default class DummyStore {
  rootStore: RootStore;
  counts: number[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  getCount(): number {
    return this.rootStore.authStore.count;
  }

  getEmail(): string {
    return this.rootStore.authStore.email;
  }

  storeCount(): void {
    this.counts.push(this.getCount());
  }
}
