import { CardDetailComponent } from "../components/Flashcard-Cards/cards/detail/card-detail.component";
import { CardListComponent } from "../components/Flashcard-Cards/cards/card-list.component";
import { CardCreateComponent } from "../components/Flashcard-Cards/cards/create/card-create.component";
import { CardEditComponent } from "../components/Flashcard-Cards/cards/detail/edit/card-edit.component";
import { checkoutGuard } from "../guards/checkout.guard";

//relative Pfade
export default
[
  { path: '', component: CardListComponent, title: 'Flashcards verwalten' },
  { path: 'detail/:id', component: CardDetailComponent },
  { path: 'detail/edit/:id', component: CardEditComponent, canDeactivate: [checkoutGuard] },
  { path: 'create', component: CardCreateComponent, title: 'Karte erstellen', canDeactivate: [checkoutGuard] },
];
