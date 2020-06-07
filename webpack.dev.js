const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

let devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
};

if (process.env.HOT === 'true') {
    devConfig = {
        ...devConfig,
        devServer: {
            contentBase: './',
            historyApiFallback: true,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
            port: process.env.PORT || 8080,
        },
    };
}

module.exports = merge(baseConfig, devConfig);
