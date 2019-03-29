import { TestBed } from '@angular/core/testing';

import { Effects } from './effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockedAppConfig } from '../../app.config.mock';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../+state/reducer';
import { Actions, EffectsModule } from '@ngrx/effects';
import { LoadStatesSuccessful } from './actions';
import { MockedActions, provideMockedActions } from '../../+state/actions.mock';
import { cold, hot } from 'jasmine-marbles';
import { addMilliseconds } from 'date-fns';
import { DeleteFromStore, LoadFromStore } from '../../store/+state/actions';

describe('StateEffects', () => {
  let actions$: MockedActions;
  let effects: Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
      ],
      providers: [
        Effects,
        provideMockedActions(),
        provideMockedAppConfig(),
      ]
    });

    effects = TestBed.get(Effects);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('updateState$', () => {

    it('should do nothing on empty input', () => {
      const action = new LoadStatesSuccessful([]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('--', {});

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should load one object from store', () => {
      const action =
        new LoadStatesSuccessful([ {
          action: {
            type: 'CREATE',
            store: 'cat',
            id: 'cat id',
          },
          timestamp: new Date(),
          id: 'action id',
        } ]);

      const completion = new LoadFromStore({
        store: 'cat',
        id: 'cat id',
      });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should load two objects from store', () => {
      const action =
        new LoadStatesSuccessful([
          {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: new Date(),
            id: 'action id 1',
          }, {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 2',
            },
            timestamp: new Date(),
            id: 'action id 2',
          },
        ]);

      const loadCatOne =
        new LoadFromStore({
          store: 'cat',
          id: 'cat id 1',
        });

      const loadCatTwo =
        new LoadFromStore({
          store: 'cat',
          id: 'cat id 2',
        });

      actions$.stream = hot('-a-', { a: action });
      const expected = cold('-(bc)', { b: loadCatOne, c: loadCatTwo });

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should load one object only once from store', () => {
      const action =
        new LoadStatesSuccessful([
          {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: new Date(),
            id: 'action id 1',
          }, {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: new Date(),
            id: 'action id 2',
          },
        ]);

      const completion =
        new LoadFromStore({
          store: 'cat',
          id: 'cat id 1',
        });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should load two object from two stores', () => {
      const now = new Date();
      const action =
        new LoadStatesSuccessful([
          {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: now,
            id: 'action id 1',
          }, {
            action: {
              type: 'CREATE',
              store: 'dog',
              id: 'dog id 1',
            },
            timestamp: addMilliseconds(now, 1000),
            id: 'action id 2',
          },
        ]);

      const loadCat = new LoadFromStore({
        store: 'cat',
        id: 'cat id 1',
      });

      const loadDog = new LoadFromStore({
        store: 'dog',
        id: 'dog id 1',
      });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: loadCat, c: loadDog });

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should NOT load deleted object from store', () => {
      const now = new Date();
      const action =
        new LoadStatesSuccessful([
          {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: now,
            id: 'action id 1',
          }, {
            action: {
              type: 'DELETE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: addMilliseconds(now, 1000),
            id: 'action id 2',
          },
        ]);

      const completion =
        new DeleteFromStore({
          store: 'cat',
          id: 'cat id 1',
        });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updateState$).toBeObservable(expected);
    });

    it('should NOT load deleted object from store [in opposite order]', () => {
      const now = new Date();
      const action =
        new LoadStatesSuccessful([
          {
            action: {
              type: 'DELETE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: addMilliseconds(now, 1000),
            id: 'action id 2',
          },
          {
            action: {
              type: 'CREATE',
              store: 'cat',
              id: 'cat id 1',
            },
            timestamp: now,
            id: 'action id 1',
          },
        ]);

      const completion =
        new DeleteFromStore({
          store: 'cat',
          id: 'cat id 1',
        });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updateState$).toBeObservable(expected);
    });
  });
});
