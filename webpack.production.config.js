const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfig = require('./webpack.config');

webpackConfig.module.loaders.forEach((loader) => {
    let loaderString;
    let loaderStringLength;

    if (loader.loader.indexOf('style-loader') !== -1) {
        loaderString = loader.loader;
        loaderStringLength = loader.loader.length;

        loader.loader = ExtractTextPlugin.extract(
            'style-loader',
            loaderString.substring(13, loaderStringLength)
        );
    }
});

webpackConfig.watch = false;
webpackConfig.plugins = [
    new ExtractTextPlugin('[name].css')
];

module.exports = webpackConfig;
