import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent},
  { path: 'game/:id', component: GameComponent }, // : sagt dass nach diesem Game und / eine Id kommt die eine Variable ist (diese Route verfügt über eine Variable)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
