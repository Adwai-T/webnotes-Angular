import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components_common/navbar/navbar.component';
import { NotesTilesComponent } from './components_common/notes-tiles/notes-tiles.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesTilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
