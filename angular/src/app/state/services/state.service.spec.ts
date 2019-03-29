import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig } from '../../app.config';
import { MockedAppConfig } from '../../app.config.mock';

describe('StateService', () => {
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
    const service: StateService = TestBed.get(StateService);
    expect(service).toBeTruthy();
  });
});
