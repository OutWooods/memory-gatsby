const localStorageHolder = typeof localStorage !== 'undefined' && localStorage;

interface ProblemWord {
    word: string;
    correctCount: number;
    incorrectCount: number;
    position: number;
}

export interface Text {
    lastAttempt: Date | undefined;
    position: number;
    content: string;
    level: number;
    correctCount: number;
    incorrectCount: number;
    problemWords: ProblemWord[];
}

export const splitByWord = (content: string): string[] => {
    return content.split('\n').reduce((lines: string[], newString: string) => {
        if (lines.length !== 0 && (newString.match(/\s/g) || []).length <= 4) {
            lines[lines.length - 1] += `\n${newString}`;
            return lines;
        }

        lines.push(newString);
        return lines;
    }, []);
};

export const upload = (content: string): void => {
    const text = splitByWord(content).map((section, index) => ({
        position: index,
        content: section,
        level: 1,
        correctCount: 0,
        incorrectCount: 0,
        problemWords: [],
        lastAttempt: undefined,
    }));

    if (localStorageHolder) {
        localStorageHolder.setItem('memory-text', JSON.stringify(text));
    }
};

export const getText = (): Text[] => {
    if (localStorageHolder) {
        const memoryText = localStorageHolder.getItem('memory-text');
        if (memoryText) {
            return JSON.parse(memoryText).map((text: Text) => {
                text.lastAttempt = text.lastAttempt ? new Date(text.lastAttempt) : undefined;
                return text;
            });
        }
    }
    return [];
};

export const setText = (text: Text[]): void => {
    if (localStorageHolder) {
        localStorageHolder.setItem('memory-text', JSON.stringify(text));
    }
};
