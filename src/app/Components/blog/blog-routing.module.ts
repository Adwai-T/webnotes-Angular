import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { GitComponent } from './notes/utilities/git/git.component';
import { HerokuComponent } from './notes/utilities/heroku/heroku.component';
import { MavenComponent } from './notes/utilities/maven/maven.component';
import { MongobdComponent } from './notes/utilities/mongobd/mongobd.component';

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
        ]
      },
      {
        path: 'webdev',
        children: [
        ]
      },
      {
        path: 'database',
        children:[
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
