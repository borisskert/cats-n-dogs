import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly localStorage: Storage = window.localStorage || null;

  constructor() { }

  public getString(key: string): string | null {
    if (this.localStorage) {
      return this.localStorage.getItem(key);
    }

    return null;
  }

  public setString(key: string, value: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, value);
    }
  }

  public getObject<T>(key: string): T | null {
    if (this.localStorage) {
      const valueAsJson = this.localStorage.getItem(key);

      if (valueAsJson) {
        return JSON.parse(valueAsJson) as T;
      }
    }

    return null;
  }

  public setObject<T>(key: string, value: T): void {
    if (this.localStorage) {
      const valueAsJson = JSON.stringify(value);
      this.localStorage.setItem(key, valueAsJson);
    }
  }
}
