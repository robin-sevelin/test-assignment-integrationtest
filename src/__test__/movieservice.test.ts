import { IMovie } from '../ts/models/Movie';
import { getData } from '../ts/services/movieservice';

// jest.mock('../ts/services/movieservice');

jest.mock('axios', () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith('error')) {
        reject('something went wrong');
      } else {
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
      }
    });
  },
}));

// test('should get data correctly ', async () => {
//   // arrange

//   // act
//   let data = await getData('test');

//   // assert
//   expect(data.length).toBe(3);
// });

test('should get error getting data', async () => {
  try {
    let data = await getData('error');
  } catch (error: any) {
    expect(error.length).toBe(0);
  }
});

// test('should get saw correctly', async () => {
//   let text = '';

//   let movie: IMovie[] = await getData(text);

//   movie[0].Title;

//   expect(movie[0].Title).toBe('Saw');
//   expect(movie.length).toBe(3);
// });
