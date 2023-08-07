import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentViewComponent } from './views/tournament-view/tournament-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tournament-view',
    pathMatch: 'full',
  },
  {
    path: 'tournament-view',
    component: TournamentViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
