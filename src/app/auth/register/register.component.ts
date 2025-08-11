import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: 
  [
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onRegister()
  {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe
      ({
        next: (res: any) =>
        {
          localStorage.setItem('token', res.token);
          alert('Register succesful');
        },
        error: (err) =>
        {
          console.error(err);
          alert('Register failed');
        }
      });
  }
}
