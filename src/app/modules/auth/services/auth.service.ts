import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticatedUser, User, UserCredentials } from '../models/user.model';
import { Router } from '@angular/router';
import { Constants } from '../../../commons/constants/constants.enum';
import { UserRoles } from '../constants/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, user);
  }

  login(payload: UserCredentials): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/login`, payload);
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    this.isLoggedIn$.next(!!token);
    return this.isLoggedIn$;
  }

  logout(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    localStorage.removeItem(Constants.USER);
    this.checkAuthStatus();
    this.router.navigate(['auth', 'login']);
  }
}
