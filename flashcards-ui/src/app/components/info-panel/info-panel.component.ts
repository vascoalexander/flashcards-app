import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

export interface InfoItem {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPanelComponent {
  infoItems = input.required<InfoItem[]>();
}