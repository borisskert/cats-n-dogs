import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../models/login-credentials.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
  ) {}

  public tryLogin(credentials: LoginCredentials): Observable<void> {
    return this.httpClient.post(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/login`,
      credentials,
      {
        withCredentials: true
      }
    ).pipe(
      map(() => null)
    );
  }
}
