import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/campgrounds/user';

  login(username: string, password: string) {
    return this.http.post<{
      user: { _id: string; username: string; email: string };
    }>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string, email: string) {
    return this.http.post<{
      _id: string;
      username: string;
      email: string;
    }>(`${this.apiUrl}/register`, { username, password, email });
  }

  authMe() {
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap((res) => console.log('authMe response:', res)),
      catchError((err) => {
        console.error('authMe error:', err);
        return of(null);
      })
    );
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`);
  }
}
