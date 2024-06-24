import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

type Credentials = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signIn(credentials: Credentials): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signUp(credentials: Credentials): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }
}
