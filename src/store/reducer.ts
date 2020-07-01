import { Text, getText, upload, TextInfo, formatText, getInfo } from './main';

interface IState {
    textInfo: TextInfo;
    text: Text[];
    uploadText: string | undefined;
}

interface Action {
    type: 'UPLOAD' | 'NEW_TEXT' | 'reset' | 'FORMAT_TEXT' | 'CANCEL_UPLOAD';
    uploadText?: string;
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

    if (action.type === 'CANCEL_UPLOAD' && state.text) {
        return { ...state, text: [] };
    }

    if (action.type === 'NEW_TEXT' && action.uploadText) {
        state.uploadText = action.uploadText;

        return state;
    }

    switch (action.type) {
        case 'reset':
            return init();
    }

    return state;
};
