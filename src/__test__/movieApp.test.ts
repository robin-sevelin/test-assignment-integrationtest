/**
 *@jest-environment jsdom
 */
import { displayNoResult } from '../ts/movieApp';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('should render error message to movie-container ', () => {});
