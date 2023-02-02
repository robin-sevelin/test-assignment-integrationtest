import { IMovie } from '../../models/Movie';

export let testData: IMovie[] = [
  {
    Title: 'Saw',
    imdbID: 'something',
    Type: 'horror',
    Poster: 'none',
    Year: 'Sometime',
  },
  {
    Title: 'Winnie the pooh',
    imdbID: 'something',
    Type: 'family movie',
    Poster: 'none',
    Year: 'Sometime',
  },
  {
    Title: 'King kong',
    imdbID: 'something',
    Type: 'adventure',
    Poster: 'none',
    Year: 'Sometime',
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (testData.length > 0) {
      resolve(testData);
    } else {
      reject('Hittade inget som matchade din sökning');
    }
  });
};
