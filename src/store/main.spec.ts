import { splitByWord } from './main';

//option - split by new lines or full stops
// maybe limits on how small chunks should be - 5?
describe('split by new lines', () => {
    test('two strings with a new line', () => {
        const firstLines = 'It was my thirtieth year to heaven\nWoke to my hearing from harbour and neighbour wood';
        const expectedResult = [
            'It was my thirtieth year to heaven',
            'Woke to my hearing from harbour and neighbour wood',
        ];

        const result = splitByWord(firstLines);

        expect(result.length).toBe(2);
        expect(result).toEqual(expectedResult);
    });

    test('if a line has <5 words, it joins 2 up', () => {
        const firstLines = 'Myself to set foot\nThat second\nIn the still sleeping town and set forth.';
        const expectedResult = ['Myself to set foot\nThat second', 'In the still sleeping town and set forth.'];

        const result = splitByWord(firstLines);

        expect(result.length).toBe(2);
        expect(result).toEqual(expectedResult);
    });

    test('with a very long poem', () => {
        const firstLines = `My birthday began with the water-
Birds and the birds of the winged trees flying my name
Above the farms and the white horses
And I rose
In rainy autumn
And walked abroad in a shower of all my days.
High tide and the heron dived when I took the road
Over the border
And the gates
Of the town closed as the town awoke.`;
        const expectedResult = ['Myself to set foot\nThat second', 'In the still sleeping town and set forth.'];

        const result = splitByWord(firstLines);
        console.log(result);

        expect(result.length).toBe(6);
        expect(result).toEqual(expectedResult);
    });
});
