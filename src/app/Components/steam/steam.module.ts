import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SteamComponent } from "./steam.component";
import { AdditemComponent } from './additem/additem.component';
import { SteamRoutingModule } from "./steam-routes.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SteamRoutingModule,
        MatFormFieldModule,
        MatTabsModule,
        FormsModule,
    ],
    exports: [],
    declarations: [
        SteamComponent,
        AdditemComponent,
        
    ],
    providers: [],
})
export class SteamModule {}