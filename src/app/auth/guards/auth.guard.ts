//import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload
{
  exp: number; //expiration time (seconds since epoch)
}

@Injectable(
{
  providedIn: 'root'
})

export class AuthGuard implements CanActivate
{
  constructor(private router: Router) {}

  canActivate(): boolean 
  {
    const token = localStorage.getItem('token');

    if (!token)
    {
      this.router.navigate(['/login']);
      return false;
    }

    try
    {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now)
      {
        //token expired - clear and redirect
        console.log('Sesiunea de conectare a expirat.')
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch (err)
    {
      //token invalid - clear and redirect
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    } 
  }
}

//export const authGuard: CanActivateFn = (route, state) => {
//  return true;
//};
