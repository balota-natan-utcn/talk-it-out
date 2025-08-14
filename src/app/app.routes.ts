import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './auth/home/home.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { ViewGroupsComponent } from './group/view-groups/view-groups.component';

export const routes: Routes = 
[
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'groups/create', component: CreateGroupComponent, canActivate: [AuthGuard] },
    { path: 'groups/view', component: ViewGroupsComponent },
    { path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard] },
    { path: 'friends', component: FriendsListComponent }
];
