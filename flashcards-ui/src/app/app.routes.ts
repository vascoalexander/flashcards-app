import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';


export const routes: Routes = [
  { path: 'test', component: TestComponent },
  {
    path: 'sets',
    component: CardSetsComponent,
  },
  { path: 'sets/create', component: CardSetsComponent },
  { path: 'sets/:id/edit', component: CardSetsComponent },

];
