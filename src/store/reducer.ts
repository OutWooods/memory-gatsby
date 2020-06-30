import { Text, getText, upload } from './main';

interface IState {
    text: Text[];
    uploadText: string | undefined;
}

interface Action {
    type: 'UPLOAD' | 'NEW_TEXT' | 'reset';
    uploadText?: string;
}

export const init = (): IState => {
    return { text: getText(), uploadText: undefined };
};

export const reducer = (state: IState, action: Action): IState => {
    console.log(state.uploadText);
    if (action.type === 'UPLOAD' && state.uploadText) {
        upload(state.uploadText);
        state.uploadText = undefined;

        return state;
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
