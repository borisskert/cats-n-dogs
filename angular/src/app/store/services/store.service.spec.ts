import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockedAppConfig } from '../../app.config.mock';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      provideMockedAppConfig()
    ]
  }));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
