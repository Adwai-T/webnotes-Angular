import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Accept } from 'src/app/interfaces/accept';
import { SteamService } from 'src/app/services/steam/steam.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement:HTMLFormElement;
  private updateItemSubscription:Subscription;

  public addItemForm:FormGroup;
  public buttonAccent:string;
  public item:Accept;
  public selected:boolean = false;
  public keys:string[];

  constructor(private steam: SteamService) {}

  ngOnInit(): void {

    this.selected = false;
    this.buttonAccent = 'primary';
    this.keys = [];

    this.addItemForm = new FormGroup({
      'name' : new FormControl('', Validators.required),
      'market_name' : new FormControl('', Validators.required),
      'appId' : new FormControl('', Validators.required),
      'image_source' : new FormControl(''),
      'quality_group' : new FormGroup({
        'quality' : new FormControl('', Validators.required),
        'craftable' : new FormControl('', Validators.required),
        'effect' : new FormControl(''),
        'paint' : new FormControl(''),
        'festivized' : new FormControl(''),
        'ware' : new FormControl(''),
      }),
      'killstreak_group' : new FormGroup({
          'hasKillstreak' : new FormControl(''),
          'hasKillstreakSheen' : new FormControl(''),
          'hasKillstreakEffect' : new FormControl(''),
          'killstreakSheen' : new FormControl(''),
          'killstreakEffect' : new FormControl('')
      }),
      'trade_price' : new FormGroup({
        'BuyAt' : new FormControl('', [Validators.required, Validators.min(0)]),
        'SellAt' : new FormControl('', [Validators.required, Validators.min(1)])
      })
    });

    this.updateItem();
  }

  private updateItem(): void {
    //---Update Item That will be sent to the server;
    this.item = {
      name : this.addItemForm.get('name').value,
      market_name: this.addItemForm.get('market_name').value,
      appId: this.addItemForm.get('appId').value,
      image_source: this.addItemForm.get('image_source').value,
      quality: this.addItemForm.get('quality_group.quality').value,
      effect: this.addItemForm.get('quality_group.effect').value,
      ware: this.addItemForm.get('quality_group.ware').value,
      paint: this.addItemForm.get('quality_group.paint').value,
      craftable: this.addItemForm.get('quality_group.craftable').value,
      hasKillstreakActive: this.addItemForm.get('killstreak_group.hasKillstreak').value,
      hasKillstreakSheen: this.addItemForm.get('killstreak_group.hasKillstreakSheen').value,
      killstreakSheen: this.addItemForm.get('killstreak_group.killstreakSheen').value,
      hasKillstreakEffect: this.addItemForm.get('killstreak_group.hasKillstreakEffect').value,
      killstreakEffect: this.addItemForm.get('killstreak_group.killstreakEffect').value,
      festivized: this.addItemForm.get('quality_group.festivized').value,
      BuyAt: this.addItemForm.get('trade_price.BuyAt').value,
      SellAt: this.addItemForm.get('trade_price.SellAt').value,
    }

    //---Update keys array that displays additional properties of item.
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
        property === 'festivized'
      ) {
        this.keys.push(property);
      }else if (property === 'hasKillstreakActive') {
        this.keys.push('killstreaked');
      }
    }
  }

  updateOnBlur(){
    if(this.addItemForm.valid){
      this.buttonAccent = 'primary';
    }else this.buttonAccent = 'warn';

    this.updateItem();
  }

  public onAddItem() {

    if(this.addItemForm.valid) {
      this.updateItemSubscription = this.steam.updateAccepedItems(this.item).subscribe(
        (data:Accept) => {
          
        },
        (err) => {},
        ()=>{
          this.updateItemSubscription.unsubscribe();
        }
      );
    }
  }

  ngOnDestroy(){}
}
