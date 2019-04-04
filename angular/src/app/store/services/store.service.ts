import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly database: DatabaseService
  ) { }

  public loadStore<T>(store: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}`,
      {
        withCredentials: true
      }
    );
  }

  public readStore<T>(store: string): Observable<T> {
    return this.database.read(store, 'key');
  }

  public saveStore<T>(store: string, values: { [key: string]: T }): Observable<void> {
    return this.database.addAll(store, values);
  }

  public loadItem<T>(store: string, id: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}/${id}`,
      {
        withCredentials: true
      }
    );
  }

  public createItem<T>(store: string, value: T): Observable<string> {
    return this.httpClient.post(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}`,
      value,
      {
        withCredentials: true,
        responseType: 'text',
      }
    );
  }

  public updateItem<T>(store: string, id: string, value: T): Observable<void> {
    return this.httpClient.put<void>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}/${id}`,
      value,
      {
        withCredentials: true
      }
    ).pipe(
      map(() => null)
    );
  }

  public deleteItem(store: string, id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/${store}/${id}`,
      {
        withCredentials: true
      }
    ).pipe(
      map(() => null)
    );
  }
}
