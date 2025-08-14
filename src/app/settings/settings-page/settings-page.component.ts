import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings-page',
  imports: [RouterModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent
{
  constructor(private router: Router, private http: HttpClient) {}

  logout()
  {
    if (confirm('Are you sure you want to log out?'))
    {
      const token = localStorage.getItem('token');
      if(!token)
        {
          this.router.navigate(['/login']);
          return;
        }

      this.http.post(
        'http://localhost:5000/api/auth/logout',
        {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(
      {
        next: () =>
        {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: () =>
        {
          //still remove token if backend fails, so user is logged out
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
