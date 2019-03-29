import { TestBed } from '@angular/core/testing';
import { filter } from './object-utils';

describe('ObjectUtils', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('filter', () => {
    it('should filter positive', () => {
      const object = {
        A: 'a',
        B: 'b',
        C: 'c',
      };

      const filtered = filter(object, (key) => key === 'B');

      expect(filtered).toEqual({ B: 'b' });
    });

    it('should filter negative', () => {
      const object = {
        A: 'a',
        B: 'b',
        C: 'c',
      };

      const filtered = filter(object, (key) => key !== 'B');

      expect(filtered).toEqual({ A: 'a', C: 'c', });
    });
  });
});
