import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css'
})
export class GroupChatComponent implements OnInit
{
  groupId!: string;
  messages: any[] = [];
  newMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void
  {
    this.groupId = this.route.snapshot.paramMap.get('id')!;
    this.loadMessages();
  }

  loadMessages()
  {
    this.http.get(`http://localhost:5000/api/messages/${this.groupId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(
    {
      next: (res: any) => this.messages = res,
      error: (err) => console.error(err)
    });
  }

  sendMessage()
  {
    if (!this.newMessage.trim()) return;

    this.http.post(`http://localhost:5000/api/messages/${this.groupId}`, { text: this.newMessage },
    {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).subscribe(
  {
    next: () =>
    {
      this.newMessage = '';
      this.loadMessages();
    },
    error: (err) => console.error(err)
  });
  }
}
