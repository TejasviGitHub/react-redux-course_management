import expect from 'expect';
import {authorsFormattedForDropdown} from "./selectors";

describe('Author Selectors', function () {
  describe('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const authors = [
        {id: 'cory-house', firstName: 'cory', lastName: 'house'},
        {id: 'scott-allen', firstName: 'scott', lastName: 'allen'}
      ];

      const expected = [
        {value: 'cory-house', text: 'cory house'},
        {value: 'scott-allen', text: 'scott allen'}
      ];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
