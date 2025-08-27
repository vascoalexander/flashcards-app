import { CardSetsComponent } from "../components/Flashcard-Sets/card-sets/card-sets.component";
import { EditSetComponent } from "../components/Flashcard-Sets/edit-set/edit-set.component";

//relative Pfade
export default
[
  { path: '', component: CardSetsComponent, title: 'Sets verwalten' },
  { path: 'create', component: EditSetComponent, title: 'Set erstellen' },





  //ROUTEN die noch gemacht werden müssen

    // { path: 'sets/create', component: EditSetComponent, title: 'Set erstellen' },
    // { path: 'sets/:id/edit', component: EditSetComponent },
    // { path: 'sets/:id/organize', component: EditSetComponent },

];
