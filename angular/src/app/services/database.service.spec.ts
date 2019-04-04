import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { getCatOne, getCatTwo } from '../cats/cats.mock';
import { Cat } from '../cats/models/cat';
import { AbstractLeveldownProvider } from './level/abstract-leveldown.provider';
import { MemDownProvider } from './level/memdown.provider';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AbstractLeveldownProvider,
          useClass: MemDownProvider
        }
      ]
    });
    service = TestBed.get(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store cat', async () => {
    const catToStore: Cat = getCatOne();

    await service.add('cat', 'cat 1 id', catToStore);
    const storedCat: Cat = await service.read<Cat>('cat', 'cat 1 id').toPromise();

    expect(storedCat).toEqual(catToStore);
  });

  it('should store two cats', async () => {
    const catOneToStore: Cat = getCatOne();
    const catTwoToStore: Cat = getCatTwo();

    await service.add('cat', 'cat 1 id', catOneToStore);
    await service.add('cat', 'cat 1 id', catTwoToStore);

    const storedCats: Cat[] = await service.readAll<Cat>('cat').toPromise();

    expect(storedCats).toEqual([ getCatOne(), getCatTwo() ]);
  });
});
