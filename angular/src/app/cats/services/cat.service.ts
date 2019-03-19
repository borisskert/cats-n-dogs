import { Injectable } from '@angular/core';
import { Cat } from '../models/cat';
import { Observable, of } from 'rxjs';
import { Cats } from '../models/cats';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private cats: Cats = {};

  constructor() { }

  public loadCats(): Observable<Cats> {
    return of({ ...this.cats });
  }

  public saveCat(cat: Cat): Observable<void> {
    this.cats[cat.id] = cat;
    return of(null);
  }
}
