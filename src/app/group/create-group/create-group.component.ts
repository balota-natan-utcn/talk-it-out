import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const apiUrl = 'http://localhost:5000/api/groups'; 

@Component({
  selector: 'app-create-group',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent
{
  groupName = '';
  memberIds = '';
  message = '';

  constructor(private http: HttpClient) {}

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
