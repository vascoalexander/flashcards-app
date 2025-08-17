import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {
  private apiUrl = '/api/hello';
  http = inject(HttpClient);

  async getMessage(): Promise<string> {
    return await firstValueFrom(this.http.get(this.apiUrl, { responseType: 'text' }));
  }

  async getHealth(): Promise<any> {
    const response = await fetch('/actuator/health');
    if (!response.ok) throw new Error('Fehler beim Abrufen des Health-Endpoints');
    return response.json();
  }

}
