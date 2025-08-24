import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EditSetComponent } from './components/Flashcard-Sets/edit-set/edit-set.component';

import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';
import { CardCreateComponent } from './components/card-create/card-create.component';
import { checkoutGuard } from './guards/checkout.guard';
import { CardEditComponent } from './components/card-edit/card-edit.component';


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
  { path: 'card/new', component: CardCreateComponent, canDeactivate: [checkoutGuard] },
  { path: 'cards/:id/edit', component: CardEditComponent, canDeactivate: [checkoutGuard] },
  //TODO: homepage und 404 routen müssen angepasst werden
  // { path: '', redirectTo: 'test', pathMatch: 'full' },
  // { path: '**', redirectTo: 'cards' }

];

