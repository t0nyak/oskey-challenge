import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from './local-storage.service';
import { UserCredential } from '@firebase/auth-types';
import User from '../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

type Credentials = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser: User | null = null;

  constructor(
    private auth: AngularFireAuth,
    private localStorageService: LocalStorageService,
    private firestore: AngularFirestore
  ) {}

  private _collection =
    this.firestore.collection<Omit<User, 'id'>>('users').ref;

  authenticatedUser(): User | null {
    if (this._authUser) {
      return this._authUser;
    }

    this._authUser = JSON.parse(this.localStorageService.getData('authUser')!);
    return this._authUser;
  }

  async signIn(credentials: Credentials): Promise<User | null> {
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );

      this._authUser = {
        id: result.user!.uid,
        email: result.user!.email!,
        lastLoginAt: parseInt(result.user!.metadata.lastSignInTime!),
        createdAt: parseInt(result.user!.metadata.creationTime!),
      };

      this.localStorageService.setItem(
        'authUser',
        JSON.stringify(this._authUser)
      );

      await this._collection
        .doc(this._authUser.id)
        .update({ lastLoginAt: new Date().getTime() });

      return this._authUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async signUp(credentials: Credentials): Promise<UserCredential | null> {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );

      this._collection.doc(result.user!.uid).set({
        createdAt: new Date().getTime(),
        email: result.user!.email!,
        lastLoginAt: new Date().getTime(),
      });

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  signOut(): void {
    this.auth.signOut().then(async () => {
      await this.updateLastUserActivity();
      this._authUser = null;
      this.localStorageService.clearData();
    });
  }

  async updateLastUserActivity(): Promise<void> {
    if (this._authUser) {
      await this._collection
        .doc(this._authUser.id)
        .update({ lastLoginAt: new Date().getTime() });
    }
  }
}
