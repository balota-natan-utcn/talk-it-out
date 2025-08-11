import { Component, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:
  [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent
{
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin()
  {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe
      ({
        next: (res: any) => 
          {
            localStorage.setItem('token', res.token);
            alert('Login succesful');
          },
          error: (err) =>
          {
            console.error(err);
            alert('Login failed');
          }
      });
  }
}
