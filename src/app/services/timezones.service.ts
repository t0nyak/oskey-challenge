import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import Timezone from '../models/timezone';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TimezonesService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  private _collection =
    this.firestore.collection<Omit<Timezone, 'id'>>('timezones').ref;

  getTimezones(userId: string): Observable<Timezone[]> {
    const result = from(
      this._collection
        .where('userId', '==', userId)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
        })
    );

    this.authService.updateLastUserActivity();

    return result;
  }

  async addTimezone(
    timezone: Omit<Timezone, 'id'>
  ): Promise<DocumentReference> {
    const result = await this._collection.add(timezone);

    await this.authService.updateLastUserActivity();

    return result;
  }

  async deleteTimezone(id: string): Promise<void> {
    await this._collection.doc(id).delete();

    await this.authService.updateLastUserActivity();
  }
}
