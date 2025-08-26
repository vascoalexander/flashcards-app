import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EditSetComponent } from './components/Flashcard-Sets/edit-set/edit-set.component';

import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardSetsComponent } from './components/Flashcard-Sets/card-sets/card-sets.component';
import { CardCreateComponent } from './components/card-create/card-create.component';

import { checkoutGuard } from './guards/checkout.guard';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { QuizComponent } from './quiz/quiz.component';

import { HomeComponent } from './components/home/home.component';
<<<<<<< HEAD
=======
import { Page404Component } from './components/page-404/page-404.component';
>>>>>>> b62c5ac17ebcd96310b7f4f33a06e8984a673053



export const routes: Routes = [


  // { path: 'test', component: TestComponent },
  { path: 'cards/:id', component: CardDetailComponent },
  { path: 'cards', component: CardListComponent, title: 'Alle Karten' },
  { path: 'sets', component: CardSetsComponent, title: 'Set verwalten' },
  { path: 'sets/create', component: EditSetComponent, title: 'Set erstellen' },
  { path: 'sets/:id/edit', component: EditSetComponent },
  { path: 'sets/:id/organize', component: EditSetComponent },
  { path: 'card/new', component: CardCreateComponent, title: 'Karte erstellen', canDeactivate: [checkoutGuard] },

  { path: 'cards/:id/edit', component: CardEditComponent, canDeactivate: [checkoutGuard] },
<<<<<<< HEAD
  { path: 'quiz', component: QuizComponent },
  //TODO: homepage und 404 routen müssen angepasst werden
  { path: '', component: HomeComponent },
  // { path: '**', redirectTo: 'cards' }
=======
  { path: 'quiz', component: QuizComponent, title: 'Quiz' },
  { path: '', component: HomeComponent, title: 'Home' },
  { path: '**', component: Page404Component, title: '404' }
>>>>>>> b62c5ac17ebcd96310b7f4f33a06e8984a673053

];


