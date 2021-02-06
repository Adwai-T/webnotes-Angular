import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-steam',
  templateUrl: './steam.component.html',
  styleUrls: ['./steam.component.css']
})
export class SteamComponent implements OnInit, OnDestroy {

  //Fetch Inventory
  //https://steamcommunity.com/inventory/<Steam64Id>/<appid>/<contextid>?l=english&count=5000
  //eg For tf2 appid = 440 and contextid = 2
  public tab:number;
  public authenticated:boolean = false;
  private authSubscription:Subscription;
  

  constructor(public user: UserService) { }

  ngOnInit(): void {
    this.tab = 1;
    this.authenticated = this.user.isAuthenticated;
    this.authSubscription = this.user.isAuthenticatedEvent.subscribe((data:boolean) => {
      this.authenticated = data;
    });
  }

  onTabClick(event) {
    console.log("Tab clicked", event);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
