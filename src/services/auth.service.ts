import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../views/register/register.component';
import { Credentials } from '../views/login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentResponse: BehaviorSubject<AuthResponse | undefined> =
    new BehaviorSubject<AuthResponse | undefined>(undefined);

  private http: HttpClient = inject(HttpClient);
  protected router = inject(Router);
  private readonly AUTH_KEY = 'AUTH_RESPONSE';

  constructor() {
    const auth = sessionStorage.getItem(this.AUTH_KEY);
    if (auth) {
      this.currentResponse.next(JSON.parse(auth));
    }
    this.currentResponse.subscribe((response) => {
      if (response) {
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response));
      } else {
        sessionStorage.clear();
      }
    });
  }

  get currentUser(): User | undefined {
    return this.currentResponse.value?.user;
  }

  get token() {
    return this.currentResponse.value?.accessToken;
  }

  get isLogged(): boolean {
    return !!this.currentResponse.value;
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/login', credentials)
      .pipe(tap((response) => this.currentResponse.next(response)));
  }
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/register', user);
  }

  logout() {
    this.router.navigate(['/home']);
    this.currentResponse.next(undefined);
  }
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
