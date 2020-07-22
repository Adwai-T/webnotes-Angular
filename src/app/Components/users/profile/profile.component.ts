import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { AuthenticatedUser } from 'src/app/interfaces/authenticatedUser';
import { Subscription } from 'rxjs';
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


  private userSubscription:Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.error = null;
    this.loading = true;
    this.deleting = false;
    this.deleteSuccessful = false;

    this.userSubscription = this.userService.getAuthenticatedUser().subscribe((data:AuthenticatedUser)=>{
      this.authUser = data;
      this.loading = false;
    },
    (error)=>{
      this.error = "User Could not be Retrived " + error.status;
      this.loading = false;
    });

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
  }

}
