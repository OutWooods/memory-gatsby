const localStorageHolder = typeof localStorage !== 'undefined' && localStorage;

export interface ProblemWord {
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

export interface TextInfo {
    uploadDate?: Date;
    lastAttempt?: Date;
}

export const splitByWord = (content: string): string[] => {
    return content.split('\n').reduce((lines: string[], newString: string) => {
        if (newString.trim() === '') {
            return lines;
        }

        if (lines.length !== 0 && (newString.match(/\s/g) || []).length <= 4) {
            lines[lines.length - 1] += `\n${newString}`;
            return lines;
        }

        lines.push(newString);
        return lines;
    }, []);
};

export const formatText = (content: string): Text[] => {
    return splitByWord(content).map((section, index) => ({
        position: index,
        content: section,
        level: 1,
        correctCount: 0,
        incorrectCount: 0,
        problemWords: [],
        lastAttempt: undefined,
    }));
};

export const upload = (text: Text[]): boolean => {
    if (localStorageHolder) {
        localStorageHolder.setItem('memory-text', JSON.stringify(text));
        localStorageHolder.setItem(
            'memory-upload',
            JSON.stringify({
                uploadDate: new Date(),
            }),
        );
        return true;
    }

    return false;
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

export const getInfo = (): TextInfo => {
    if (localStorageHolder) {
        const textInfo = localStorageHolder.getItem('memory-upload');
        if (textInfo) {
            const info = JSON.parse(textInfo);
            info.lastAttempt = info.lastAttempt ? new Date(info.lastAttempt) : undefined;
            info.uploadDate = info.uploadDate ? new Date(info.uploadDate) : undefined;
            return info;
        }
    }
    return {};
};

export const setText = (text: Text[]): void => {
    if (localStorageHolder) {
        localStorageHolder.setItem('memory-text', JSON.stringify(text));
    }
};

export const setInfo = (upload: TextInfo): void => {
    if (localStorageHolder) {
        localStorageHolder.setItem('memory-upload', JSON.stringify(upload));
    }
};
