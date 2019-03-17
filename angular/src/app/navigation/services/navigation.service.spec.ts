import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes([]),
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return navigation elements for admin', () => {
    const navigationElements = service.navigationFor([ 'moped_admin' ]);

    expect(navigationElements).toEqual([
      {
        text: 'Home',
        type: 'HOME',
        enabled: false,
        hidden: true,
        order: 0,
      },
      {
        text: 'Users',
        type: 'USERS',
        enabled: true,
        hidden: false,
        order: 1,
      },
      {
        text: 'Cats',
        type: 'CATS',
        enabled: true,
        hidden: false,
        order: 2,
      },
      {
        text: 'Dogs',
        type: 'DOGS',
        enabled: true,
        hidden: false,
        order: 3,
      },
      {
        text: 'Planets',
        type: 'PLANETS',
        enabled: false,
        hidden: false,
        order: 4,
      }
    ]);
  });

  it('should return navigation elements for user', () => {
    const navigationElements = service.navigationFor([ 'moped_user' ]);

    expect(navigationElements).toEqual([
      {
        text: 'Home',
        type: 'HOME',
        enabled: false,
        hidden: true,
        order: 0,
      },
      {
        text: 'Users',
        type: 'USERS',
        enabled: true,
        hidden: false,
        order: 1,
      },
      {
        text: 'Planets',
        type: 'PLANETS',
        enabled: false,
        hidden: false,
        order: 4,
      }
    ]);
  });

  it('should return navigation elements for admin and user', () => {
    const navigationElements = service.navigationFor([ 'moped_admin', 'moped_user' ]);

    expect(navigationElements).toEqual([
      {
        text: 'Home',
        type: 'HOME',
        enabled: false,
        hidden: true,
        order: 0,
      },
      {
        text: 'Users',
        type: 'USERS',
        enabled: true,
        hidden: false,
        order: 1,
      },
      {
        text: 'Cats',
        type: 'CATS',
        enabled: true,
        hidden: false,
        order: 2,
      },
      {
        text: 'Dogs',
        type: 'DOGS',
        enabled: true,
        hidden: false,
        order: 3,
      },
      {
        text: 'Planets',
        type: 'PLANETS',
        enabled: false,
        hidden: false,
        order: 4,
      }
    ]);
  });

  it('should return navigation elements for admin and user in opposite order', () => {
    const navigationElements = service.navigationFor([ 'moped_user', 'moped_admin' ]);

    expect(navigationElements).toEqual([
      {
        text: 'Home',
        type: 'HOME',
        enabled: false,
        hidden: true,
        order: 0,
      },
      {
        text: 'Users',
        type: 'USERS',
        enabled: true,
        hidden: false,
        order: 1,
      },
      {
        text: 'Cats',
        type: 'CATS',
        enabled: true,
        hidden: false,
        order: 2,
      },
      {
        text: 'Dogs',
        type: 'DOGS',
        enabled: true,
        hidden: false,
        order: 3,
      },
      {
        text: 'Planets',
        type: 'PLANETS',
        enabled: false,
        hidden: false,
        order: 4,
      }
    ]);
  });
});
