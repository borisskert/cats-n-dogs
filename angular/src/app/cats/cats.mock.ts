import { Cat } from './models/cat';

const catOne: Cat = {
  id: 'cat 1 id',
  name: 'cat 1 name',
  race: 'cat 1 race',
  age: 3,
  owner: 'cat 1 owner',
};

const catTwo: Cat = {
  id: 'cat 2 id',
  name: 'cat 2 name',
  race: 'cat 2 race',
  age: 3,
  owner: 'cat 2 owner',
};

export const getCatOne = (): Cat => ({ ...catOne });
export const getCatTwo = (): Cat => ({ ...catTwo });
export const getCatsArray = (): Cat[] => ([ getCatOne(), getCatTwo() ]);

export const getCats = (): { [id: string]: Cat } => {
  return getCatsArray().reduce((obj, cat) => {
      return {
        ...obj,
        [cat.id]: cat,
      };
    },
    {}
  );
};
