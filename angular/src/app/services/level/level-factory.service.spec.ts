import { TestBed } from '@angular/core/testing';

import { LevelFactory } from './level-factory.service';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import { LevelJsProvider } from './level-js.provider';

describe('LevelFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: AbstractLeveldownProvider,
        useClass: LevelJsProvider
      }
    ]
  }));

  it('should be created', () => {
    const service: LevelFactory = TestBed.get(LevelFactory);
    expect(service).toBeTruthy();
  });
});
