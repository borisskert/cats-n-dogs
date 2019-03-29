import { EMPTY, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Provider } from '@angular/core';

export class MockedActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

function getMockedActions() {
  return new MockedActions();
}

export function provideMockedActions(): Provider {
  return { provide: Actions, useFactory: getMockedActions };
}
