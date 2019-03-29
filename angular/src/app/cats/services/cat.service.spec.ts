import { TestBed } from '@angular/core/testing';

import { CatService } from './cat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig } from '../../app.config';
import { MockedAppConfig } from '../../app.config.mock';

describe('CatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      {
        provide: AppConfig,
        useClass: MockedAppConfig
      }
    ]
  }));

  it('should be created', () => {
    const service: CatService = TestBed.get(CatService);
    expect(service).toBeTruthy();
  });
});
