import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CardSetsComponent } from './card-sets/card-sets.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';

export const routes: Routes = [
  { path: 'cards/:id', component: CardDetailComponent },
  { path: 'test', component: TestComponent },
  { path: 'cardsets', component: CardSetsComponent },
  { path: 'cards', component: CardListComponent },
  //TODO: homepage und 404 routen müssen angepasst werden
  // { path: '', redirectTo: 'test', pathMatch: 'full' },
  // { path: '**', redirectTo: 'cards' }

];
