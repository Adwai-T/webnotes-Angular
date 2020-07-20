import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogRoutingModule } from './blog-routing.module';
import { AngularNotesComponent } from './angular-notes/angular-notes.component';
import { NotesTilesComponent } from './notes-tiles/notes-tiles.component';
import { BlogComponent } from './blog.component';


@NgModule({
  declarations: [
    BlogComponent,
    AngularNotesComponent,
    NotesTilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule
  ],
  exports: [],
  providers: [],
})
export class BlogModule {}
