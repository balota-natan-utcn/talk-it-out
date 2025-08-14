import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService
{
  private apiUrl = 'http://localhost:5000/api/groups';

  constructor(private http: HttpClient) {}

  //get all of user's groups
  getGroups(): Observable<any>
  {
    return this.http.get(this.apiUrl,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  //get messages for a specific group
  getGroupMessages(groupId: string): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/${groupId}/messages`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  //send message to group
  sendMessage(groupId: string, text: string): Observable<any>
  {
    return this.http.post(
      `${this.apiUrl}/${groupId}/messages`,
      { text },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
  }
}
