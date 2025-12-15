import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/campgrounds/user';

  login(username: string, password: string) {
    return this.http.post<{ user: { username: string; email: string } }>(
      `${this.apiUrl}/login`,
      { username, password }
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post<{
      user: { id: string, username: string; password: string; email: string };
    }>(`${this.apiUrl}/register`, { username, password, email });
  }
}
