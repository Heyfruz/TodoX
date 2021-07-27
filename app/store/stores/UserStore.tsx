import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

import { RootStore } from '../rootStore';

export default class UserStore {
  rootStore: RootStore;

  @persist
  userName = '';
  @persist
  userEmail = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  storeEmail(): void {
    if (this.userEmail === '') {
      this.userEmail = this.rootStore.authStore.email;
    }
  }

  storeName(): void {
    if (this.userName === '') {
      console.log('changing');
      this.userName = 'John Doe';
    }
  }

  setUser(): void {
    if (this.userName === '') {
      console.log('CHANGING NAME');
      this.userName = 'John Doe';
    }
    if (this.userEmail === '') {
      if (this.rootStore.authStore.email === '') {
        this.userEmail = 'Johndoe@doe.com';
      } else {
        this.userEmail = this.rootStore.authStore.email;
      }
    }
  }
}
