import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { AngularNotesComponent } from './angular-notes/angular-notes.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: 'angular',
        component: AngularNotesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
