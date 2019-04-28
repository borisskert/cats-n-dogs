import { Cat } from './models/cat';

const catOne: Cat = {
  id: 'cat 1 id',
  name: 'cat 1 name',
  race: 'cat 1 race',
  age: 1,
  owner: 'cat 1 owner',
};

const catTwo: Cat = {
  id: 'cat 2 id',
  name: 'cat 2 name',
  race: 'cat 2 race',
  age: 2,
  owner: 'cat 2 owner',
};

const catThree: Cat = {
  id: 'cat 3 id',
  name: 'cat 3 name',
  race: 'cat 3 race',
  age: 3,
  owner: 'cat 3 owner',
};

export const getCatOne = (): Cat => ({ ...catOne });
export const getCatTwo = (): Cat => ({ ...catTwo });
export const getCatThree = (): Cat => ({ ...catThree });
export const getCatsArray = (): Cat[] => ([ getCatOne(), getCatTwo(), getCatThree() ]);

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
