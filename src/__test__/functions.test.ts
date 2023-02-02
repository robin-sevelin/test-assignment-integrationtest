/**
 *@jest-environment jsdom
 */

import { movieSort } from '../ts/functions';
import { IMovie } from '../ts/models/Movie';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('should sort movies descending order when desc is true ', () => {
  // arrange
  let testData: IMovie[] = [
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

  // act
  movieSort(testData);

  // assert
  expect(testData[0].Title).toBe('King kong');
});

test('should sort movies ascending order when desc is false', () => {
  // arrange
  let testData: IMovie[] = [
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

  // act
  movieSort(testData, false);

  // assert
  expect(testData[0].Title).toBe('Winnie the pooh');
});

test('sort function should not sort when desc is true and list items are equal', () => {
  // arrange
  let testData: IMovie[] = [
    {
      Title: 'Saw',
      imdbID: 'something',
      Type: 'horror',
      Poster: 'none',
      Year: 'Sometime',
    },
    {
      Title: 'Saw',
      imdbID: 'something',
      Type: 'horror',
      Poster: 'none',
      Year: 'Sometime',
    },
  ];

  // act
  let result: IMovie[] = movieSort(testData);

  // assert
  expect(testData[0].Title).toBe('Saw');
});

test('sort function should not sort when desc is false and list items are equal', () => {
  // arrange
  let testData: IMovie[] = [
    {
      Title: 'Saw',
      imdbID: 'something',
      Type: 'horror',
      Poster: 'none',
      Year: 'Sometime',
    },
    {
      Title: 'Saw',
      imdbID: 'something',
      Type: 'horror',
      Poster: 'none',
      Year: 'Sometime',
    },
  ];

  // act
  let result: IMovie[] = movieSort(testData, false);

  // assert
  expect(testData[0].Title).toBe('Saw');
});
