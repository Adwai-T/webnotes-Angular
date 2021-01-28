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

  {
    path: 'questions',
    loadChildren: () => import('./Components/questions/questions.module').then(m=>m.QuestionsModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./Components/games/games.module').then(m=>m.GamesModule)
  },
  {
    path : 'steam',
    loadChildren: () => import('./Components/steam/steam.module').then(m=>m.SteamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
