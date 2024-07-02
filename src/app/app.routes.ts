import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  {
    path: '',
    component: StartScreenComponent,
  },
  {
    path: 'game',
    redirectTo: 'game/', // Redirect to the "game/" route
  },
  {
    path: 'game/:id',
    component: GameComponent,
  },
];
