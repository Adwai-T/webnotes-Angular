import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { GitComponent } from './notes/utilities/git/git.component';
import { HerokuComponent } from './notes/utilities/heroku/heroku.component';
import { MavenComponent } from './notes/utilities/maven/maven.component';
import { MongobdComponent } from './notes/utilities/mongobd/mongobd.component';
import { SpringComponent } from './notes/java/spring/spring.component';
import { ThreadsComponent } from './notes/java/threads/threads.component';
import { JavascriptComponent } from './notes/webdevelopment/javascript/javascript.component';
import { HtmlComponent } from './notes/webdevelopment/html/html.component';
import { CssComponent } from './notes/webdevelopment/css/css.component';
import { AngularComponent } from './notes/webdevelopment/angular/angular.component';
import { SqlComponent } from './notes/database/sql/sql.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'util',
        children: [
          { path: 'git', component: GitComponent },
          { path: 'heroku', component: HerokuComponent },
          { path: 'maven', component: MavenComponent },
          { path: 'mongodb', component: MongobdComponent }
        ]
      },
      {
        path: 'java',
        children: [
          { path: 'spring', component: SpringComponent },
          { path: 'threads', component: ThreadsComponent }
        ]
      },
      {
        path: 'webdev',
        children: [
          { path: 'javascript', component: JavascriptComponent },
          { path: 'html', component: HtmlComponent },
          { path: 'css', component: CssComponent },
          { path: 'angular', component: AngularComponent }
        ]
      },
      {
        path: 'database',
        children:[
          { path: 'sql', component: SqlComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
