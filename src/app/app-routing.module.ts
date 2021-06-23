import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './common/projects/projects.component';

const routes: Routes = [
  {
    path: "",
    component : ProjectsComponent
  },
  {
    path: "user",
    loadChildren: () => import('./Components/users/user.module').then(m => m.UserModule)
  },

  {
    path: 'blog',
    loadChildren: () => import('./Components/blog/blog.module').then(m=> m.BlogModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
