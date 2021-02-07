import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SteamService } from 'src/app/services/steam/steam.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  private steamSubscription: Subscription;
  public inventory:JSON;

  constructor(private steam:SteamService) { }

  ngOnInit(): void {
    
  }

  getInventory(id:string, appid:string, context:string) {
    this.steamSubscription = this.steam.getPlayerInventory(id, appid, context).subscribe(inventory => {

    }, error => {
      console.log("There was an error fetching inventory\n" + error);
      this.steamSubscription.unsubscribe();
    }, () => {
      this.steamSubscription.unsubscribe();
    })
  }

}