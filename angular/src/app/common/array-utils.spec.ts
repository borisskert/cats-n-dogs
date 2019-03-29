import { TestBed } from '@angular/core/testing';
import { flatMap, groupBy } from './array-utils';

describe('ArrayUtils', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('groupBy', () => {
    it('should group array by key', () => {
      const array = [ { type: 'A', index: 0 }, { type: 'B', index: 1 }, { type: 'A', index: 2 }, ];

      const groupedArray = groupBy(array, 'type');

      expect(groupedArray.A).toEqual([ { type: 'A', index: 0 }, { type: 'A', index: 2 } ]);
      expect(groupedArray.B).toEqual([ { type: 'B', index: 1 } ]);
    });

    it('should group array by key in embedded object', () => {
      const array = [
        { embedded: { type: 'A' }, index: 0 },
        { embedded: { type: 'B' }, index: 1 },
        { embedded: { type: 'A' }, index: 2 },
      ];

      const groupedArray = groupBy(array, 'embedded.type');

      expect(groupedArray.A).toEqual([ { embedded: { type: 'A' }, index: 0 }, { embedded: { type: 'A' }, index: 2 } ]);
      expect(groupedArray.B).toEqual([ { embedded: { type: 'B' }, index: 1 } ]);
    });
  });

  describe('flatMap', () => {
    it('should do nothing with an empty array', () => {
      expect(flatMap([], x => [x])).toEqual([]);
    });

    it('should flat map array', () => {
      expect(flatMap(['a'], x => [x])).toEqual(['a']);
    });
  });
});
