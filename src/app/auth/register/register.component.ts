import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
  nickname = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister()
  {
    this.authService.register({ username: this.username, password: this.password, nickname: this.nickname })
      .subscribe
      ({
        next: (res: any) =>
        {
          localStorage.setItem('token', res.token);
          alert('Register succesful');

          this.router.navigate(['/home']);
        },
        error: (err) =>
        {
          console.error(err);
          alert('Register failed');
        }
      });
  }
}
