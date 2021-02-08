import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { SteamComponent } from "./steam.component";
import { AdditemComponent } from './additem/additem.component';
import { SteamRoutingModule } from "./steam-routes.module";
import { TradesComponent } from "./trades/trades.component";
import { ItemComponent } from "./item/item.component";
import { TradeitemsComponent } from "./tradeitems/tradeitems.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { InvitemComponent } from "./invitem/invitem.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTabsModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,

        SteamRoutingModule,
    ],
    exports: [],
    declarations: [
        SteamComponent,
        AdditemComponent,
        TradesComponent,
        ItemComponent,
        TradeitemsComponent,
        InventoryComponent,
        InvitemComponent,
    ],
    providers: [],
})
export class SteamModule {}