import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { StateVersion } from '../models/state';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly localStorage: LocalStorageService,
  ) { }

  public getCurrentVersion(): string {
    return this.localStorage.getString('state-version');
  }

  public getLatestVersion(): Observable<string> {
    return this.httpClient.get(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/state/latest`,
      {
        withCredentials: true,
        responseType: 'text',
      }
    );
  }

  public loadStateBetween(from: string, to: string): Observable<StateVersion[]> {
    return this.httpClient.get<StateVersion[]>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/state?from=${from}&to=${to}`,
      {
        withCredentials: true,
      }
    );
  }

  public loadStateTo(to: string): Observable<StateVersion[]> {
    return this.httpClient.get<StateVersion[]>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/state?to=${to}`,
      {
        withCredentials: true,
      }
    );
  }
}
