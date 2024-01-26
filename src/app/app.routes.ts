import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { SquadComponent } from './pages/squad/squad.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: { animation: 'homePage' }
  },
  {
    path: 'matches',
    component: MatchesComponent,
    data: { animation: 'matchesPage' }
  },
  {
    path: 'squad',
    component: SquadComponent,
    data: { animation: 'squadPage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
