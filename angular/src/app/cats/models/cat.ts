import { UUID } from 'angular2-uuid';

export interface Cat {
  id: string;
  name: string;
  race: string;
  age: number;
  owner: string;
  created: Date;
}

const initialCat: Cat = {
  id: null,
  name: null,
  race: null,
  age: null,
  owner: null,
  created: null,
};

export const newCat = (): Cat => ({ ...initialCat, id: UUID.UUID(), created: new Date() });
