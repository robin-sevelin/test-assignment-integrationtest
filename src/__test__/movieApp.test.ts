/**
 *@jest-environment jsdom
 */

import * as movieservice from '../ts/services/movieservice';
import * as movieApp from '../ts/movieApp';
import { IMovie } from '../ts/models/Movie';
import { displayNoResult } from '../ts/movieApp';
import { testData } from '../ts/services/__mocks__/movieservice';

jest.mock('../ts/services/movieservice');

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('functions inside init()', () => {
  test('should call handleSubmit when form is submited', () => {
    // arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;

    let spyonHandleSubmit = jest
      .spyOn(movieApp, 'handleSubmit')
      .mockReturnValue(new Promise<void>((resolve) => resolve()));

    // act
    movieApp.init();

    // assert
    let searchForm = document.querySelector('form') as HTMLFormElement;
    searchForm.submit();

    expect(spyonHandleSubmit).toBeCalled();
    expect(spyonHandleSubmit).toBeCalledTimes(1);
    spyonHandleSubmit.mockRestore();
  });
});

describe('functions inside handle submit', () => {
  test('get data should be called correctly', async () => {
    // arrange
    document.body.innerHTML = `<input type="text" id="searchText" placeholder="Skriv titel här" /><div id="movie-container"></div>`;
    let searchText: HTMLInputElement = document.getElementById(
      'searchText'
    ) as HTMLInputElement;
    searchText.value = 'Saw';
    let spyonGetData = jest
      .spyOn(movieservice, 'getData')
      .mockReturnValue(Promise.resolve([]));
    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyonGetData).toBeCalledWith('Saw');
    spyonGetData.mockRestore();
  });

  test('create html should be called correctly if try is succesful', async () => {
    // arrange
    document.body.innerHTML = `<input type="text" id="searchText" placeholder="Skriv titel här" /><div id="movie-container"></div>`;

    let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
    let spyonGetData = jest
      .spyOn(movieservice, 'getData')
      .mockReturnValue(Promise.resolve(testData));

    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyonGetData).toBeCalled();
    expect(spyOnCreateHtml).toBeCalled();
    spyOnCreateHtml.mockRestore();
    spyonGetData.mockRestore();
  });

  test('display no result should be called correctly if catch is called', async () => {
    // arrange
    document.body.innerHTML = `<input type="text" id="searchText" placeholder="Skriv titel här" /><div id="movie-container"></div>`;
    let spyOnDisplayNoResult = jest
      .spyOn(movieApp, 'displayNoResult')
      .mockReturnValue();
    let spyonGetData = jest
      .spyOn(movieservice, 'getData')
      .mockReturnValue(Promise.reject());

    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyonGetData).toBeCalled();
    expect(spyOnDisplayNoResult).toBeCalled();
    spyOnDisplayNoResult.mockRestore();
    spyonGetData.mockRestore();
  });

  test('create html should be called correctly if movies length is longer than zero', () => {
    // arrange
    let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    // act
    movieApp.createHtml(testData, container);

    // arrange
    expect(spyOnCreateHtml).toBeCalled();
    expect(spyOnCreateHtml).toBeCalledTimes(1);
    expect(testData.length).toBe(3);
    spyOnCreateHtml.mockRestore();
  });

  test('display no result should be called correctly if movies length is zero', () => {
    // arrange
    let movies: IMovie[] = [];
    let spyOnDisplayNoResult = jest
      .spyOn(movieApp, 'displayNoResult')
      .mockReturnValue();
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    // act
    movieApp.displayNoResult(container);

    // arrange
    expect(spyOnDisplayNoResult).toBeCalled();
    expect(spyOnDisplayNoResult).toBeCalledTimes(1);
    expect(movies.length).toBe(0);
    spyOnDisplayNoResult.mockRestore();
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

describe('functions inside create html', () => {
  test('should render list to html', () => {
    // arrange
    let movies: IMovie[] = [
      {
        Title: 'Something',
        Poster: 'Poster',
        imdbID: 'none',
        Type: 'none',
        Year: 'none',
      },
    ];
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    // act
    movieApp.createHtml(movies, container);

    // assert
    expect(movies.length).toBe(1);
    expect(container.childNodes).not.toBeNull();
    expect(movies[0].Title).toBe('Something');
    expect(container.innerHTML).toContain('Something');
    expect(container.innerHTML).toContain('Poster');
  });
});
