import {
  includes,
  negate
} from '../src/utils.js';

describe("The utils.includes function", () => {
   beforeEach(() => {
     self.TestData = [ 0, 1, 2, 3];
   });
   afterEach(() => { });

   it('should locate a value if it exists', () => {
     expect(includes(self.TestData, 0)).toBe.true;
   });

   it('should locate a value if it does not exists', () => {
     let TestData = [ 0, 1, 2, 3];
     expect(includes(self.TestData, 'zero')).toBe.false;
   });

   it('should Throw if non array is checked', () => {
     expect(includes).toThrow(TypeError);
   });
});

describe("The utils.negate function", () =>  {
   it('should make a positive producer be a negative producer', () => {
     let negator = negate(function(a) {return true;});
     expect(negator('a')).toBe.false;
   });

   it('should make a negative producer be a positive producer', () => {
     let negator = negate(function(a) {return false;});
     expect(negator('a')).toBe.true;
   });
});
