import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components_common/navbar/navbar.component';
import { TileComponent } from './component_blog/tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
