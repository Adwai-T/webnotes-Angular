import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Accept } from 'src/app/interfaces/accept';
import { SteamService } from 'src/app/services/steam/steam.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit, OnDestroy {
  private accept: Accept;
  private updateItemSubscription:Subscription;

  constructor(private steam: SteamService) {}

  ngOnInit(): void {
    
  }

  onAddItem() {
    this.updateItemSubscription = this.steam.updateAccepedItems(this.accept).subscribe(
      (data:Accept) => {
        console.log(data);
      },
      (err) => {}
    );
  }

  ngOnDestroy(){}
}
