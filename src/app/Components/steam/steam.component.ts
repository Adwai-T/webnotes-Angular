import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-steam',
  templateUrl: './steam.component.html',
  styleUrls: ['./steam.component.css']
})
export class SteamComponent implements OnInit, OnDestroy {

  public authenticated:boolean = false;
  private authSubscription:Subscription;

  constructor(public user: UserService) { }

  ngOnInit(): void {
    this.authenticated = this.user.isAuthenticated;
    this.authSubscription = this.user.isAuthenticatedEvent.subscribe((data:boolean) => {
      this.authenticated = data;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
