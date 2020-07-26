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
import { SpringComponent } from './notes/java/spring/spring.component';
import { ThreadsComponent } from './notes/java/threads/threads.component';
import { JavascriptComponent } from './notes/webdevelopment/javascript/javascript.component';
import { CssComponent } from './notes/webdevelopment/css/css.component';
import { HtmlComponent } from './notes/webdevelopment/html/html.component';
import { AngularComponent } from './notes/webdevelopment/angular/angular.component';
import { SqlComponent } from './notes/database/sql/sql.component';
import { CommentComponent } from './comments/comment/comment.component';
import { AddcommentComponent } from './comments/addcomment/addcomment.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    BlogComponent,
    NotesTilesComponent,
    GitComponent,
    HerokuComponent,
    MavenComponent,
    MongobdComponent,
    SpringComponent,
    ThreadsComponent,
    JavascriptComponent,
    CssComponent,
    HtmlComponent,
    AngularComponent,
    SqlComponent,
    CommentComponent,
    AddcommentComponent,
    CommentsComponent
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
