import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CardSetsComponent } from './card-sets/card-sets.component';
import { CardListComponent } from './components/card-list/card-list.component';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'cardsets', component: CardSetsComponent },
  { path: 'cardlist', component: CardListComponent },
  // { path: '', redirectTo: 'test', pathMatch: 'full' },

];
