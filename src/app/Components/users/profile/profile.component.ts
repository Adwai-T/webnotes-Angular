import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/users/user.service';
import { AuthenticatedUser } from 'src/app/interfaces/authenticatedUser';
import { ServerMessage } from 'src/app/interfaces/serverMessage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public authUser: AuthenticatedUser;
  public error:string;
  public loading:boolean = false;
  public deleting: boolean = false;
  public deleteSuccessful:boolean = false;
  public isUserRoleAdminOrAssist:boolean = false;

  private userSubscription:Subscription;
  private userDetailsSubscription:Subscription;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {

    this.error = null;
    this.loading = true;
    this.deleting = false;
    this.deleteSuccessful = false;

    //---Get UserProfile From Server
    this.userSubscription = this.userService.getAuthenticatedUser().subscribe((data:AuthenticatedUser)=>{
      this.authUser = data;
      this.userService.authenticatedUserDetails = data;
      this.loading = false;
    },
    (error)=>{
      this.error = "User Could not be Retrived " + error.status;
      this.loading = false;
    });

    //Get User Details when User Details Change
    this.userDetailsSubscription = this.userService.authenticatedUserDetailsEventEmitter.subscribe((data:AuthenticatedUser)=>{
      this.isUserRoleAdminOrAssist = data.roles === "ROLE_ADMIN" || data.roles === "ROLE_ASSIST";
    },
    (error)=>{
      console.log(error);
      this.isUserRoleAdminOrAssist = false;
    });

  }

  //---Go to Edit Questions
  onEditQuestions(){
    if(this.isUserRoleAdminOrAssist){
      this.router.navigate(['questions', 'edit']);
    }
  }

  //--- Delete User
  onDeleteProfile(){

    this.deleting = true;
    let deleteSubscription = this.userService.deleteUser().subscribe((data:ServerMessage)=>{
      localStorage.removeItem('jwt');
      this.deleting = false;
      this.deleteSuccessful = true;
      this.userService.isAuthenticated = false;
      deleteSubscription.unsubscribe();
    },
    (error)=>{
      this.deleteSuccessful = false;
      this.error = "Sorry there was a problem deleting user. " + error.message;
      deleteSubscription.unsubscribe();
    });
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
