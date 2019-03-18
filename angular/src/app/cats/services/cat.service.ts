import { Injectable } from '@angular/core';
import { Cat } from '../models/cat';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private cats: Cat[] = [];

  constructor() { }

  public loadCats(): Observable<Cat[]> {
    return of([ ...this.cats ]);
  }

  public saveCat(cat: Cat): Observable<void> {
    this.cats.push(cat);
    return of(null);
  }
}
