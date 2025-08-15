import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupService } from '../group.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-groups',
  imports: [RouterModule, CommonModule],
  templateUrl: './view-groups.component.html',
  styleUrl: './view-groups.component.css'
})
export class ViewGroupsComponent implements OnInit
{
  groups: any[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void
  {
    this.groupService.getGroups().subscribe(
    {
      next: (res) => this.groups = res,
      error: (err) => console.error(err)
    });
  }
}
