import { TestBed } from '@angular/core/testing';

import { LevelService } from './level.service';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import { MemDownProvider } from './memdown.provider';

describe('LevelService', () => {

  let service: LevelService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AbstractLeveldownProvider,
            useClass: MemDownProvider
          }
        ]
      });
      service = TestBed.get(LevelService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should put into db', async () => {
    const actual = await service.put('our key for testing', { cat: 'Sivko' }).toPromise();
    expect(actual).toBeNull();

    const cat = await service.get('our key for testing').toPromise();
    expect(cat).toEqual({ cat: 'Sivko' });
  });
});
