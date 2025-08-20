import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CardSetsComponent } from './card-sets/card-sets.component';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  {
    path: 'cardsets',
    component: CardSetsComponent,
  },

];
