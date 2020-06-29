interface ProblemWord {
    word: string;
    correctCount: number;
    incorrectCount: number;
    position: number;
}

interface Text {
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

export const upload = (content: string): Text[] => {
    const textSections = splitByWord(content);
    textSections.map((section, index) => ({
        position: index,
        content: section,
        level: 1,
        correctCount: 0,
        incorrectCount: 0,
        problemWords: [],
    }));

    return [];
};
