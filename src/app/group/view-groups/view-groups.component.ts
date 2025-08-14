import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-view-groups',
  imports: [RouterModule],
  templateUrl: './view-groups.component.html',
  styleUrl: './view-groups.component.css'
})
export class ViewGroupsComponent
{
  constructor(private groupService: GroupService) {}
}
