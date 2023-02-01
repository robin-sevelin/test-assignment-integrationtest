import { IMovie } from '../../models/Movie';

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve([
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
    ]);
  });
};
