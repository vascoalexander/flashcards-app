import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EditSetComponent } from './components/Flashcard-Sets/edit-set/edit-set.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: 'test', component: TestComponent },

  {
    path: 'sets',
    component: CardSetsComponent,
  },
  { path: 'sets/create', component: EditSetComponent },
  { path: 'sets/:id/edit', component: EditSetComponent },
  { path: 'sets/:id/organize', component: EditSetComponent },

];
