import { CanDeactivateFn } from '@angular/router';
import { CardCreateComponent } from '../components/Flashcard-Cards/cards/card/card-create/card-create.component';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../components/Flashcard-Cards/checkout/checkout.component';
import { inject } from '@angular/core';


//Man könnte eine generische checkout guard und eine bessere und sinnvollere Logik einbauen
export const checkoutGuard: CanDeactivateFn<CardCreateComponent> = (CardCreateComponent) =>
{

  const dialog = inject(MatDialog);



  if (CardCreateComponent.ignoreGuard)
  {
    return true;
  }


  const confirmation = dialog.open(CheckoutComponent).afterClosed();
  return confirmation;
};
