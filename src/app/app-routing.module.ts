import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "user",
    loadChildren: () => import('./Components/users/user.module').then(m => m.UserModule)
  },

  {
    path: 'blog',
    loadChildren: () => import('./Components/blog/blog.module').then(m=> m.BlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
