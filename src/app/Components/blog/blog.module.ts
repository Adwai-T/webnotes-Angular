import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogRoutingModule } from './blog-routing.module';
import { NotesTilesComponent } from './notes-tiles/notes-tiles.component';
import { BlogComponent } from './blog.component';
import { GitComponent } from './notes/utilities/git/git.component';
import { HerokuComponent } from './notes/utilities/heroku/heroku.component';
import { MavenComponent } from './notes/utilities/maven/maven.component';
import { MongobdComponent } from './notes/utilities/mongobd/mongobd.component';
import { CommentComponent } from './comments/comment/comment.component';
import { AddcommentComponent } from './comments/addcomment/addcomment.component';
import { CommentsComponent } from './comments/comments.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BlogComponent,
    NotesTilesComponent,
    GitComponent,
    HerokuComponent,
    MavenComponent,
    MongobdComponent,
    CommentComponent,
    AddcommentComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    HttpClientModule
  ],
  exports: [],
  providers: [],
})
export class BlogModule {}
