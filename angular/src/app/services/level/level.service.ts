import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { LevelFactory } from './level-factory.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private readonly options = {
    asBuffer: false,
  };

  private readonly db;

  constructor(private readonly levelFactory: LevelFactory) {
    this.db = levelFactory.create('cats-n-dogs');
  }

  public put(key: string, value): Observable<void> {
    return fromPromise(this.saveAndReturnPromise(key, value));
  }

  public getAll() {
    return this.db.iterator();
  }

  private saveAndReturnPromise(key: string, value): Promise<void> {
    return new Promise((resolve, reject) => {
      const valueAsJson = JSON.stringify(value);
      this.db.put(key, valueAsJson, this.options, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(null);
        }
      });
    });
  }

  get<T>(key: string): Observable<T> {
    return fromPromise(this.readAsPromise(key));
  }

  private readAsPromise<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get(key, this.options, (error, value) => {
        if (error) {
          reject(error);
        } else {
          const valueAsJson = value.toString();
          resolve(JSON.parse(valueAsJson));
        }
      });
    });
  }
}
