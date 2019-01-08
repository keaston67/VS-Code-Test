import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate
// , CanLoad
{
    loggedIn = false;

constructor(private authService: AuthService){}

canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot) { 
    return this.authService.isAuthenticated()}

// Add to protect the Recipes route i.e. can't access unless logged in:
canLoad(route: Route) {
    return this.authService.isAuthenticated()
    }
}