import { Text, getText, upload, TextInfo, formatText, getInfo, setText, setInfo } from './main';

interface IState {
    textInfo: TextInfo;
    text: Text[];
    completeSections: number;
    uploadText: string | undefined;
}

interface Action {
    type:
        | 'UPLOAD'
        | 'NEW_TEXT'
        | 'reset'
        | 'FORMAT_TEXT'
        | 'CANCEL_UPLOAD'
        | 'COMPLETE_ROUND'
        | 'WRONG_WORD'
        | 'RIGHT_WORD';
    uploadText?: string;
    position?: number;
    isRight?: boolean;
    letterPlace?: number;
}

export const init = (): IState => {
    return { text: getText(), uploadText: undefined, textInfo: getInfo(), completeSections: 0 };
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

    if (action.type === 'COMPLETE_ROUND' && action.position !== undefined && action.isRight !== undefined) {
        const currentPosition = state.text.find((section) => section.position === action.position);

        if (!currentPosition) {
            throw new Error();
        }

        if (action.isRight) {
            currentPosition.correctCount += 1;
            currentPosition.incorrectCount = 0;
            currentPosition.level += 1;
        } else {
            currentPosition.incorrectCount += 1;
            currentPosition.correctCount = 0;
        }
        state.completeSections += 1;
        let textInfo = state.textInfo;
        if (state.text.filter((part) => part.level >= 3).length < state.completeSections) {
            textInfo = {
                lastAttempt: new Date(),
                uploadDate: state.textInfo.uploadDate,
            };
            setInfo(textInfo);
        }

        setText(state.text);
        return { ...state, text: state.text, textInfo: textInfo };
    }

    if (action.type === 'CANCEL_UPLOAD' && state.text) {
        return { ...state, text: [] };
    }

    if (action.type === 'NEW_TEXT' && action.uploadText) {
        state.uploadText = action.uploadText;

        return state;
    }

    if (action.type === 'WRONG_WORD' && action.position !== undefined && action.letterPlace) {
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

        setText(state.text);
        return state;
    }

    if (action.type === 'RIGHT_WORD' && action.position && action.letterPlace) {
        const currentPosition = state.text.find((section) => section.position === action.position);
        if (!currentPosition) {
            throw new Error();
        }
        const problemWord = currentPosition.problemWords.find((issue) => issue.position === action.letterPlace);
        if (problemWord) {
            problemWord.incorrectCount = problemWord.incorrectCount > 0 ? problemWord.incorrectCount - 1 : 0;
            problemWord.correctCount += 1;
            if (problemWord.incorrectCount === 0) {
                const index = currentPosition.problemWords.findIndex((issue) => issue.position === action.letterPlace);
                currentPosition.problemWords.splice(index, 1);
            }
            setText(state.text);
        }

        return state;
    }

    switch (action.type) {
        case 'reset':
            return init();
    }

    return state;
};
