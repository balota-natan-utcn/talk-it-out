import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string })
  {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: {username: string; password: string })
  {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  getHomeMenu()
  {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/home`, 
      {
        headers: { Authorization: `Bearer ${token}` }
      });
  }
}
