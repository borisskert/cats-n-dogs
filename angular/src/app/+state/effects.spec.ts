import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { EMPTY, Observable } from 'rxjs';

import { Effects } from './effects';

describe('AppEffects', () => {
  const actions$: Observable<any> = EMPTY;
  let effects: Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Effects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(Effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
