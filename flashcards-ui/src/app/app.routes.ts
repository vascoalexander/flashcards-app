import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EditSetComponent } from './components/Flashcard-Sets/edit-set/edit-set.component';

import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';


export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'cards/:id', component: CardDetailComponent },
  { path: 'cards', component: CardListComponent },
  {
    path: 'sets',
    component: CardSetsComponent,
  },
  { path: 'sets/create', component: EditSetComponent },
  { path: 'sets/:id/edit', component: EditSetComponent },
  { path: 'sets/:id/organize', component: EditSetComponent },
  //TODO: homepage und 404 routen müssen angepasst werden
  // { path: '', redirectTo: 'test', pathMatch: 'full' },
  // { path: '**', redirectTo: 'cards' }

];

