import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../users/auth.guard";
import { AdditemComponent } from "./additem/additem.component";
import { SteamComponent } from "./steam.component";

export const routes: Routes = [
    { 
        path: '',
        component: SteamComponent,
        children: [
            { path: 'additem', component: AdditemComponent, canActivate: [AuthGuard]},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SteamRoutingModule {}