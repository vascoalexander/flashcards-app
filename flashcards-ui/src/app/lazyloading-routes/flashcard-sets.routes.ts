import { CardSetsComponent } from "../components/Flashcard-Sets/sets/card-sets.component";
import { EditSetComponent } from "../components/Flashcard-Sets/sets/edit/edit-set.component";

//relative Pfade
export default
[
  { path: '', component: CardSetsComponent, title: 'Sets verwalten' },
  { path: 'edit/:id', component: EditSetComponent },
  { path: 'create', component: EditSetComponent, title: 'Set erstellen' },
];
