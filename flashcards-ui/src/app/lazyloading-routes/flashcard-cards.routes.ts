import { CardDetailComponent } from "../components/Flashcard-Cards/cards/card/card-detail/card-detail.component";
import { CardListComponent } from "../components/Flashcard-Cards/cards/card-list.component";
import { CardCreateComponent } from "../components/Flashcard-Cards/cards/card/card-create/card-create.component";
import { CardEditComponent } from "../components/Flashcard-Cards/cards/card/card-edit/card-edit.component";
import { checkoutGuard } from "../guards/checkout.guard";

//relative Pfade
export default
[
  // { path: 'cards', component: CardListComponent },
  { path: '', component: CardListComponent, title: 'Alle Karten' },
  { path: 'card/:id', component: CardDetailComponent },
  { path: ':id/edit', component: CardEditComponent, canDeactivate: [checkoutGuard] },
  { path: 'card/new', component: CardCreateComponent, title: 'Karte erstellen', canDeactivate: [checkoutGuard] },
];
