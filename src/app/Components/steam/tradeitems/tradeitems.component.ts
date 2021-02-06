import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SteamService } from 'src/app/services/steam/steam.service';
import { Accept } from 'src/app/interfaces/accept';

@Component({
  selector: 'app-tradeitems',
  templateUrl: './tradeitems.component.html',
  styleUrls: ['./tradeitems.component.css']
})
export class TradeitemsComponent implements OnInit{

  private acceptItemSubscription:Subscription;
  private pageNumber:number;
  private itemsPerPage:number;

  public displayErrorMessage:boolean;
  public error:string;
  public listOfItems:Accept[];

  constructor(private steam:SteamService) { }

  ngOnInit(): void {
    this.itemsPerPage = 16;
    this.pageNumber = 0;
    this.onPageChange(true);
  }

  onPageChange(next:boolean) {
    if(next){
      this.pageNumber++;
    }else {
      this.pageNumber = this.pageNumber > 1 ? this.pageNumber-- : 1;
    }

    this.acceptItemSubscription = this.steam.getAcceptedItems(this.pageNumber, this.itemsPerPage).subscribe((data:Accept[]) => {
      this.listOfItems = data;
      console.log(this.listOfItems);
    },
    err => {
      this.displayError(err);
    },
    () => {
      console.log("Fetched All items");
    })
  }

  //--- Display error message for 4 sec.
  displayError(error:string) {
    this.error = error;
    this.displayErrorMessage = true;
    setTimeout(()=>{
      this.error = null;
      this.displayErrorMessage = false;
    }, 4000)
  }

}
