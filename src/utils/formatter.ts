export const formatter = (ids: number[]): string => {
    let message = '';
    let chainNumber: number | undefined = undefined;
    let lastNumber: number | undefined = undefined;

    ids.forEach((id) => {
        if (!lastNumber) {
            lastNumber = id;
            return;
        }

        if (lastNumber === id - 1) {
            if (!chainNumber) {
                chainNumber = lastNumber;
            }

            lastNumber = id;
            return;
        }

        if (chainNumber) {
            message += `${chainNumber}-${lastNumber}, `;
            chainNumber = undefined;
            lastNumber = id;
            return;
        }

        message += `${lastNumber}, `;
        lastNumber = id;
    });

    if (lastNumber && chainNumber) {
        return message + `${chainNumber}-${lastNumber}`;
    }

    if (lastNumber && message === '') {
        return message + `${lastNumber}`;
    }

    if (lastNumber) {
        return message + `${lastNumber}`;
    }

    return message;
};
