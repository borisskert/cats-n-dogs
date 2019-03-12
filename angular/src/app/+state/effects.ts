import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class Effects {
  constructor(private actions$: Actions) {}
}
