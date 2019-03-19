import { Injectable } from '@angular/core';
import { Cat } from '../models/cat';
import { Observable } from 'rxjs';
import { Cats } from '../models/cats';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
  ) { }

  public loadCats(): Observable<Cats> {
    return this.httpClient.get<Cats>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/cat`,
      {
        withCredentials: true
      }
    );
  }

  public createCat(cat: Cat): Observable<string> {
    return this.httpClient.post(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/cat`,
      cat,
      {
        withCredentials: true,
        responseType: 'text',
      }
    );
  }

  public updateCat(cat: Cat): Observable<void> {
    return this.httpClient.put<void>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/cat/${cat.id}`,
      cat,
      {
        withCredentials: true
      }
    ).pipe(
      map(() => null)
    );
  }

  public deleteCat(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/store/cat/${id}`,
      {
        withCredentials: true
      }
    ).pipe(
      map(() => null)
    );
  }
}
