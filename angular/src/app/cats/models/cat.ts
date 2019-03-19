export interface Cat {
  id: string;
  name: string;
  race: string;
  age: number;
  owner: string;
}

const initialCat: Cat = {
  id: null,
  name: null,
  race: null,
  age: null,
  owner: null,
};

export const newCat = (): Cat => ({ ...initialCat });
