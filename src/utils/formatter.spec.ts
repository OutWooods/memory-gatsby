import { formatter } from './formatter';

test('returns single value', () => {
    expect(formatter([1])).toEqual('1');
});

test('returns multiple different values', () => {
    expect(formatter([1, 3])).toEqual('1, 3');
});

test('returns 2 values in a chain', () => {
    expect(formatter([1, 2])).toEqual('1-2');
});

test('returns many values in a chain', () => {
    expect(formatter([1, 2, 3])).toEqual('1-3');
});

test('returns a value and a chain', () => {
    expect(formatter([1, 2, 3, 5])).toEqual('1-3, 5');
});

test('returns two chains', () => {
    expect(formatter([1, 2, 3, 5, 6, 7, 8])).toEqual('1-3, 5-8');
});

test('returns a string for a weird mix of numbers', () => {
    expect(formatter([1, 2, 3, 5, 9, 10, 11, 13, 27, 28])).toEqual('1-3, 5, 9-11, 13, 27-28');
});
