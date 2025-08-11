import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent
{
  menuItems: string[] = [];
  welcomeMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit()
  {
    this.authService.getHomeMenu().subscribe(
      {
        next: (res: any) =>
        {
          this.welcomeMessage = res.message;
          this.menuItems = res.menu;
        },
        error: () =>
        {
          alert('Failed to load menu, please login again.');
          //maybe redirect to login
        }
      });
  }
}
