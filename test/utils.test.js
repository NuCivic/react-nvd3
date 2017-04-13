import {
  includes,
  negate,
  pick,
  without,
  isPlainObject,
  bindFunctions,
} from '../src/utils.js';

describe("Function utils.includes(array, item)", () => {
   beforeEach(() => {
     self.TestData = [ 0, 1, 2, 3];
   });
   afterEach(() => { });

   it('should locate a value if it exists', () => {
     expect(includes(self.TestData, 0)).toBe.true;
   });

   it('should not locate a value if it does not exists', () => {
     expect(includes(self.TestData, 'zero')).toBe.false;
   });

   it('should Throw TypeError', () => {
     expect(includes).toThrow(TypeError);
   });
});

describe("Function utils.negate(f)", () =>  {
   it('should make a positive producer be a negative producer', () => {
     let negator = negate(function(a) {return true;});
     expect(negator('a')).toBe.false;
   });

   it('should make a negative producer be a positive producer', () => {
     let negator = negate(function(a) {return false;});
     expect(negator('a')).toBe.true;
   });
});

describe("Function utils.pick(obj, keys)", () =>  {
   it('should return empty if empty is passed', () => {
     expect(pick({}, ["a", "b"])).toEqual({});
   });

   it('should return empty object if no keys are passed', () => {
     expect(pick({a: 1, b: 2}, [])).toEqual({});
   });

   it('should return only picked keys', () => {
     expect(pick({a: 1, b: 2}, ["a"])).toEqual({a: 1});
   });

   it('should return object if all keys are passed', () => {
     expect(pick({a: 1, b: 2}, ["a", "b", "c"])).toEqual({a: 1, b: 2});
   });
});

describe("Function utils.without(obj, keys)", () =>  {
   it('should return empty if empty is passed', () => {
     expect(without({}, ["a", "b"])).toEqual({});
   });

   it('should return empty object if all keys are passed', () => {
     expect(without({a: 1, b: 2}, ["a", "b", "c"])).toEqual({});
   });

   it('should return only unpicked keys', () => {
     expect(without({a: 1, b: 2}, ["a"])).toEqual({b: 2});
   });

   it('should return object if all not keys passed', () => {
     expect(without({a: 1, b: 2}, ["c"])).toEqual({a: 1, b: 2});
   });
});

describe("Function utils.isPlainObject(obj)", () =>  {
  it("should verify Objects as plain objects", () => {
    let myObject = new Object();
    expect(isPlainObject(myObject)).toBe(true);
  });

  it("should verify {} as a plain objects", () => {
    expect(isPlainObject({a: 1, b: {}})).toBe(true);
  });

  it("should not verify String as a plain objects", () => {
    let myString = new String("Hello");
    expect(isPlainObject(myString)).toBe(false);
  });
});
