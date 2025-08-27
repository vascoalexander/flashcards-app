import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EditSetComponent } from './components/Flashcard-Sets/edit-set/edit-set.component';

import { CardListComponent } from './components/Flashcard-Cards/cards/card-list.component';
import { CardDetailComponent } from './components/Flashcard-Cards/cards/card/card-detail/card-detail.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';
import { CardCreateComponent } from './components/Flashcard-Cards/cards/card/card-create/card-create.component';

import { checkoutGuard } from './guards/checkout.guard';
import { CardEditComponent } from './components/Flashcard-Cards/cards/card/card-edit/card-edit.component';
import { QuizComponent } from './quiz/quiz.component';

import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page-404/page-404.component';



export const routes: Routes = [


  // { path: 'test', component: TestComponent },

  { path: 'cards', loadChildren: () => import('./lazyloading-routes/flashcard-cards.routes') },

  { path: 'sets', component: CardSetsComponent, title: 'Set verwalten' },
  { path: 'sets/create', component: EditSetComponent, title: 'Set erstellen' },
  { path: 'sets/:id/edit', component: EditSetComponent },
  { path: 'sets/:id/organize', component: EditSetComponent },

  // { path: 'cards/:id/edit', component: CardEditComponent, canDeactivate: [checkoutGuard] },
  { path: 'quiz', component: QuizComponent, title: 'Quiz' },

  { path: '', component: HomeComponent, title: 'Home' },
  { path: '**', component: Page404Component, title: '404' }

];


