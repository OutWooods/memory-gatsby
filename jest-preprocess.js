import { createTransformer } from 'babel-jest';

const babelOptions = {
    presets: ['babel-preset-gatsby'],
};

module.exports = createTransformer(babelOptions);
