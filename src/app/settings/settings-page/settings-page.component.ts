import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  imports: [RouterModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent
{
  constructor(private router: Router) {}

  logout()
  {
    //remove JWT from local storage
    localStorage.removeItem('token');

    //go back to login page
    this.router.navigate(['/login']);
  }
}
