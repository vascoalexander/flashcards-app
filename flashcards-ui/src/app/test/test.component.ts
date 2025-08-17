import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  message = 'Noch keine Antwort';
  health: any;
  error: string | null = null;

  testService = inject(TestService);

  async loadMessage() {
    this.message = await this.testService.getMessage();
  }
  async ngOnInit() {
    try {
      this.health = await this.testService.getHealth();
    } catch (e: any) {
      this.error = e.message;
    }
  }
}

