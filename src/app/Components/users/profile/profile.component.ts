import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { AuthenticatedUser } from 'src/app/interfaces/authenticatedUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public authUser: AuthenticatedUser;
  public error:string;
  public loading:boolean = false;
  private userSubscription:Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.error = null;
    this.loading = true;

    this.userSubscription = this.userService.getAuthenticatedUser().subscribe((data:AuthenticatedUser)=>{
      this.authUser = data;
      this.loading = false;
    },
    (error)=>{
      this.error = "User Could not be Retrived " + error.status;
      this.loading = false;
    });

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
