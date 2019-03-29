import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
  ) { }

  public loadStore<T>(store: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}`,
      {
        withCredentials: true
      }
    );
  }

  public loadFromStore<T>(store: string, id: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}/${id}`,
      {
        withCredentials: true
      }
    );
  }
}
