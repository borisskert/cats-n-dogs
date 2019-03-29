import { Injectable } from '@angular/core';
import { Cat } from '../models/cat';
import { Observable } from 'rxjs';
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
}
