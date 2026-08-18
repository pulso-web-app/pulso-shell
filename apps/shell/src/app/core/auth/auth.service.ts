import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from 'firebase/auth';

import { getFirebaseApp } from '../firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly auth: Auth = getAuth(getFirebaseApp());

  private readonly userState = signal<User | null>(null);
  private readonly loadingState = signal(true);

  readonly user = this.userState.asReadonly();
  readonly loading = this.loadingState.asReadonly();

  readonly isAuthenticated = computed(
    () => this.userState() !== null,
  );

  constructor() {
    const unsubscribe = onAuthStateChanged(
      this.auth,
      (user) => {
        this.userState.set(user);
        this.loadingState.set(false);
      },
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async waitUntilReady(): Promise<void> {
    await this.auth.authStateReady();
  }

  async login(
    email: string,
    password: string,
  ): Promise<void> {
    await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
