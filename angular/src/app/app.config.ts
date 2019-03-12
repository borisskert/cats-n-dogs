import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class AppConfig {

  private env: {
    [key: string]: string;
  } = null;

  constructor(private http: HttpClient) { }

  /**
   * Use to get a property of the env file
   */
  public getValue(key: string) {
    return this.env[key];
  }

  /**
   * This method loads "env.json" to get the current working environment variables
   */
  public load() {
    return new Promise((resolve) => {
      this.tryToGetEnvJson(resolve);
    });
  }

  private tryToGetEnvJson(resolve) {
    this.http.get<any>(environment.envJson)
      .subscribe(
        envResponse => {
          this.env = envResponse;
          resolve(true);
          return true;
        },
        error => {
          console.log(`Configuration file "${environment.envJson}" could not be read`);
          resolve(true);
          return throwError(error);
        }
      );
  }
}
