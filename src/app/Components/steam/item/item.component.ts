import { Component, Input, OnInit } from '@angular/core';
import { Accept } from 'src/app/interfaces/accept';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input('item') public item: Accept;
  public keys: string[];

  public selected = false;

  constructor() {}

  ngOnInit(): void {
    this.keys = [];
    for (const property in this.item) {
      if (
        this.item[property] == false ||
        this.item[property] == null ||
        property === 'market_name' ||
        property === 'appId' ||
        property === 'image_source' ||
        property === "BuyAt" ||
        property === "SellAt"
      ) {
      } else if (
        property === 'quality' ||
        property === 'killstreakSheen' ||
        property === 'effect' ||
        property === 'ware' ||
        property === 'paint'
      ) {
        this.keys.push(this.item[property]);
      } else if (
        property === 'effect' ||
        property === 'craftable' ||
        property === 'hasKillstreakActive' ||
        property === 'festivized'
      ) {
      }
    }
  }
}
