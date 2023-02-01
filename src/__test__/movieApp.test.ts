/**
 *@jest-environment jsdom
 */

import * as movieservice from '../ts/services/movieservice';
import * as movieApp from '../ts/movieApp';
import { IMovie } from '../ts/models/Movie';
import { displayNoResult } from '../ts/movieApp';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('functions inside handle submit', () => {
  test('get data should be called when string is longer than zero', async () => {
    // arrange
    let searchText = 'Some text';
    let spyOnGetData = jest.spyOn(movieservice, 'getData');

    // act
    await movieservice.getData(searchText);

    // assert
    expect(spyOnGetData).toBeCalled();
    expect(spyOnGetData).not.toBeNull();
  });

  test('create html should be called when movies.length is longer than zero', () => {
    // arrange
    let container: HTMLDivElement = document.getElementById(
      'movie-container'
    ) as HTMLDivElement;
    let testData: IMovie[] = [
      {
        Title: 'Saw',
        imdbID: 'something',
        Type: 'horror',
        Poster: 'none',
        Year: 'Sometime',
      },
    ];
    let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

    // act
    movieApp.createHtml(testData, container);

    // assert
    expect(spyOnCreateHtml).toBeCalled();
    expect(spyOnCreateHtml).toBeCalledTimes(1);
    expect(spyOnCreateHtml).not.toBeNull();
  });

  test('create html should not be called if movies.length is zero', () => {
    // arrange
    let container: HTMLDivElement = document.getElementById(
      'movie-container'
    ) as HTMLDivElement;
    let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

    let testData: IMovie[] = [];

    // act
    movieApp.createHtml(testData, container);

    // assert
    expect(spyOnCreateHtml).toBeCalled();
  });
});

test('should render error message to div', () => {
  // arrange
  let container: HTMLDivElement;
  container = document.createElement('div');
  document.body.appendChild(container);

  // act
  displayNoResult(container);

  // assert
  expect(container.children[0].tagName).toBe('P');
  expect(container.children[0].innerHTML).toBe('Inga sökresultat att visa');
});

test('should render html', () => {});
