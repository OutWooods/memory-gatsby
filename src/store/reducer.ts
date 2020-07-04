import { Text, getText, upload, TextInfo, formatText, getInfo } from './main';

interface IState {
    textInfo: TextInfo;
    text: Text[];
    uploadText: string | undefined;
}

interface Action {
    type: 'UPLOAD' | 'NEW_TEXT' | 'reset' | 'FORMAT_TEXT' | 'CANCEL_UPLOAD' | 'COMPLETE_ROUND' | 'WRONG_WORD';
    uploadText?: string;
    position?: number;
    isRight?: boolean;
    letterPlace?: number;
}

export const init = (): IState => {
    return { text: getText(), uploadText: undefined, textInfo: getInfo() };
};

export const reducer = (state: IState, action: Action): IState => {
    if (action.type === 'UPLOAD' && state.text) {
        upload(state.text);
        const textInfo = { uploadDate: new Date() };

        return { ...state, textInfo: textInfo };
    }

    if (action.type === 'FORMAT_TEXT' && state.uploadText) {
        const text = formatText(state.uploadText);

        return { ...state, uploadText: undefined, text: text };
    }

    console.log(action.type);
    console.log(action.position);
    console.log(action.isRight);
    if (action.type === 'COMPLETE_ROUND' && action.position !== undefined && action.isRight !== undefined) {
        console.log('this position');
        const currentPosition = state.text.find((section) => section.position === action.position);

        if (!currentPosition) {
            throw new Error();
        }
        console.log(currentPosition.level, 'another');

        if (action.isRight) {
            currentPosition.correctCount += 1;
            currentPosition.incorrectCount = 0;
            currentPosition.level += 1;
        } else {
            currentPosition.incorrectCount += 1;
            currentPosition.correctCount = 0;
        }

        currentPosition.lastAttempt = new Date();

        return { ...state, text: state.text };
    }

    if (action.type === 'CANCEL_UPLOAD' && state.text) {
        return { ...state, text: [] };
    }

    if (action.type === 'NEW_TEXT' && action.uploadText) {
        state.uploadText = action.uploadText;

        return state;
    }

    if (action.type === 'WRONG_WORD' && action.position && action.letterPlace) {
        const currentPosition = state.text.find((section) => section.position === action.position);
        if (!currentPosition) {
            throw new Error();
        }
        const problemWord = currentPosition.problemWords.find((issue) => issue.position === action.letterPlace);
        if (problemWord) {
            problemWord.incorrectCount += 1;
            problemWord.correctCount += 0;
        } else {
            currentPosition.problemWords.push({
                correctCount: 0,
                incorrectCount: 1,
                position: action.letterPlace,
            });
        }

        return state;
    }

    switch (action.type) {
        case 'reset':
            return init();
    }

    return state;
};
