import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


export type ConfirmDeleteDialog = {
  confirmText?: string;
  cancelText?: string;
  name?: string;
  entity: 'Set' | 'Karte' | 'Karten' | 'InfoPanel';
  title?: string;
  count?: number;
  message?: string;

}
@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent {
  constructor(private ref: MatDialogRef<ConfirmDeleteDialogComponent, boolean>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteDialog) { }


  get defaultTitle(): string {
    if (this.data.title) return this.data.title;
    const label = this.data.count ? `${this.data.count} ${this.data.entity}` : this.data.entity;
    if (this.data.entity === 'Karten') {
      { return `Wollen Sie wirklich ${label} aus dem ${this.data.name} entfernen?`; };
    }
    if (this.data.entity === 'Karte') return `Wollen Sie wirklich ${label} aus dem Set entfernen?`;
    return `${label} löschen?`;
  }

  get defaultMessage(): string {
    if (this.data.message) return this.data.message;
    if (this.data.name) return `Wollen Sie wirklich ${this.data.name}  löschen?`;
    return '';
  }


  close(result: boolean) {
    this.ref.close(result);
  }
}
