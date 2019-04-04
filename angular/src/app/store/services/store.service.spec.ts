import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockedAppConfig } from '../../app.config.mock';
import { AbstractLeveldownProvider } from '../../services/level/abstract-leveldown.provider';
import { MemDownProvider } from '../../services/level/memdown.provider';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      provideMockedAppConfig(),
      {
        provide: AbstractLeveldownProvider,
        useClass: MemDownProvider
      }
    ],
  }));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
