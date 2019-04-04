import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LevelService } from './level/level.service';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private readonly level: LevelService) {}

  public read<T>(store: string, key: string): Observable<T> {
    const levelKey = this.buildLevelKey(store, key);
    return this.level.get(levelKey);
  }

  public add<T>(store: string, key: string, value: T): Observable<void> {
    const levelKey = this.buildLevelKey(store, key);
    return this.level.put(levelKey, value);
  }

  public readAll<T>(store: string): Observable<T[]> {
    return fromPromise(this.readAllAsPromise(store));
  }

  public addAll<T>(store: string, values: { [key: string]: T }) {
    return undefined;
  }

  /**
   * https://stackoverflow.com/questions/12433657/how-to-create-multiple-logical-tables-in-single-leveldb-instance
   */
  private buildLevelKey(store: string, key: string) {
    return `${store}-${key}`;
  }

  private readAllAsObservable<T>(store: string): Observable<T> {
    const iterator = this.level.getAll();

    return new Observable((observer) => {

    });
  }

  private readAllAsPromise<T>(store: string): Promise<T[]> {
    const keyPrefix = `${store}-`;

    const iteratorToValues = async (iterator) => {
      const items = [];

      do {
        const nextValue = this.iteratorNext(iterator)
          .then(({ key, value }) => {
            if (key.toString().startsWith(keyPrefix)) {
              items.push(value);
            }
          })
          .catch(error => {

          });

      } while (true);

    };

    return new Promise((resolve, reject) => {
      const iterator = this.level.getAll();
      const items: T[] = [];


      let end = false;


      do {


        iterator.next((error, key, value) => {
          if (error) {
            reject(error);
            end = true;
          } else {
            if (key && value) {
              console.log(key.toString())
              console.log(value.toString())
              if (key.toString().startsWith(keyPrefix)) {
                items.push(value);
              }
            } else {
              resolve(items);
              end = true;
            }
          }
        });
      } while (!end);
    });
  }

  private iteratorNext(iterator): Promise<{ key: string, value: any }> {
    return new Promise(((resolve, reject) => {
        iterator.next((error, key, value) => {
          if (error) {
            reject(error);
          } else {
            resolve({ key, value });
          }
        });
      })
    );
  }
}
