import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.interface';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
  ) { }

  public getUser(): Observable<UserInfo> {
    return this.httpClient.get<UserInfoResponse>(
      `${this.appConfig.getValue('NG_BACKEND_URL')}/user`,
      {
        withCredentials: true
      }
    ).pipe(
      map(response => this.convert(response))
    );
  }

  private convert(response: UserInfoResponse): UserInfo {
    return {
      subject: response.credentials.sub,
      name: response.credentials.name,
      username: response.credentials.preferred_username,
      givenName: response.credentials.given_name,
      familyName: response.credentials.family_name,
      email: response.credentials.email,
      roles: response.authorities.map(authority => authority.authority),
    };
  }
}

interface UserInfoResponse {
  authorities: [
    {
      authority: string,
    }
    ];
  details?: any;
  authenticated: boolean;
  principal: string;
  credentials: {
    sub: string;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
  };
  name: string;
}
