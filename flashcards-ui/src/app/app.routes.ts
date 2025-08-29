import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page-404/page-404.component';



export const routes: Routes = [
  // { path: 'test', component: TestComponent },

  { path: 'cards', loadChildren: () => import('./lazyloading-routes/flashcard-cards.routes') },

  { path: 'sets', loadChildren: () => import('./lazyloading-routes/flashcard-sets.routes') },

  { path: 'quiz', loadChildren: () => import('./lazyloading-routes/quiz.routes') },


  { path: '', component: HomeComponent, title: 'Home' },
  { path: '**', component: Page404Component, title: '404' }

];


