import { splitSections } from './tidySections';

test('will by newline into sections', () => {
    const content = 'hello\nmate';

    const splitUpContent = splitSections({ content: content, level: 1, problemWords: [] });

    expect(splitUpContent.length).toBe(2);
    expect(splitUpContent[0].length).toBe(1);
    expect(splitUpContent[1].length).toBe(1);
});

test('will split up each individual words into sub sections', () => {
    const content = 'hello what is your name mate I am called Tom James Jones';

    const splitUpContent = splitSections({ content: content, level: 1, problemWords: [] });

    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(12);
});

test('will mark 20% as hidden on level 1', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 1, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(2);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will always hide at least one word', () => {
    const content = 'hello what is another';

    const splitUpContent = splitSections({ content: content, level: 1, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(4);
    expect(isHidden.length).toBe(1);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will hide 40% if on level 2', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 2, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(4);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will hide 60% if on level 3', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 3, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(6);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will hide 80% if on level 4', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 4, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(8);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will hide 100% if on level 5', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 5, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(10);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will hide 100% if above level 5', () => {
    const content = 'hello what is your name mate I am called Tom';

    const splitUpContent = splitSections({ content: content, level: 6, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(10);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will round down if an odd number', () => {
    const content = 'hello what is your name mate I am called';

    const splitUpContent = splitSections({ content: content, level: 1, problemWords: [] });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(9);
    expect(isHidden.length).toBe(1);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will prioritise problem words', () => {
    const content = 'hello what is your name mate I am called';

    const splitUpContent = splitSections({
        content: content,
        level: 1,
        problemWords: [{ position: 1, incorrectCount: 0, correctCount: 0 }],
    });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(9);
    expect(isHidden.length).toBe(1);
    expect(isHidden[0].content).toBe('what');
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will prioritise problem words but not hide too many', () => {
    const content = 'hello what is your name mate I am called';

    const splitUpContent = splitSections({
        content: content,
        level: 1,
        problemWords: [
            { position: 1, incorrectCount: 0, correctCount: 0 },
            { position: 2, incorrectCount: 0, correctCount: 0 },
        ],
    });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(9);
    expect(isHidden.length).toBe(1);
    expect(isTesting.length).toEqual(isHidden.length);
});

test('will top up non problem words if there is space', () => {
    const content = 'hello what is your name mate I am called again';

    const splitUpContent = splitSections({
        content: content,
        level: 3,
        problemWords: [
            { position: 1, incorrectCount: 0, correctCount: 0 },
            { position: 2, incorrectCount: 0, correctCount: 0 },
        ],
    });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isHiddenWords = isHidden.map(({ content }) => content);
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(6);
    expect(isTesting.length).toEqual(isHidden.length);
    expect(isHiddenWords.includes('what')).toBe(true);
    expect(isHiddenWords.includes('is')).toBe(true);
});

test('will not duplicate the same problem word', () => {
    const content = 'hello what is your name mate I am called again';

    const splitUpContent = splitSections({
        content: content,
        level: 3,
        problemWords: [
            { position: 1, incorrectCount: 0, correctCount: 0 },
            { position: 2, incorrectCount: 0, correctCount: 0 },
        ],
    });

    const isHidden = splitUpContent[0].filter((section) => section.isHidden);
    const isHiddenWords = isHidden.map(({ content }) => content);
    const whatOccurs = isHidden.filter(({ content }) => content === 'what');
    const isTesting = splitUpContent[0].filter((section) => section.isTesting);
    expect(splitUpContent.length).toBe(1);
    expect(splitUpContent[0].length).toBe(10);
    expect(isHidden.length).toBe(6);
    expect(isTesting.length).toEqual(isHidden.length);
    expect(isHiddenWords.includes('what')).toBe(true);
    expect(whatOccurs.length).toEqual(1);
});
