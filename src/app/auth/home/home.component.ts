import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const apiUrl = 'http://localhost:5000/api/groups'; 

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent
{
  welcomeMessage = '';
  groupName = '';
  memberIds = '';
  message = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit()
  {
    this.authService.getHomeMenu().subscribe(
      {
        next: (res: any) =>
        {
          this.welcomeMessage = res.message;
        },
        error: () =>
        {
          alert('Failed to load menu, please login again.');
          //maybe redirect to login
        }
      });
  }

  createGroup(event: Event)
  {
    event.preventDefault();

    const token = localStorage.getItem('token'); //stored after login
    if (!token)
    {
      this.message = 'You must be logged in to create groups';
      return;
    }

    const headers = new HttpHeaders(
    {
      Authorization: `Bearer ${token}`
    });

    const members = this.memberIds
      .split(',')
      .map(id => id.trim())
      .filter(id => id);

      this.http.post(`${apiUrl}/create`, 
      {
        name: this.groupName,
        members
      }, { headers })
      .subscribe(
      {
        next: (res: any) => 
        {
          this.message = res.message || 'Group created!';
          this.groupName = '';
          this.memberIds = '';
        },
        error: err =>
        {
          this.message = err.error?.error || 'Error creating group';
        }
      });
  }
}
