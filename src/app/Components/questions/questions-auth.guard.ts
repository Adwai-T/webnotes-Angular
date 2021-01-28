import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionsGuard implements CanActivate {
    constructor(private userService:UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if(
            this.userService.authenticatedUserDetails.roles === "ROLE_ADMIN"
            ||
            this.userService.authenticatedUserDetails.roles === "ROLE_ASSIST"
        ){

            return true;

        }else return false;
    }
}