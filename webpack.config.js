const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve(),
            'node_modules/',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude:path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude:path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.jsx$/,
                exclude:path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                exclude:path.resolve(__dirname, "node_modules"),
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Le ss to CSS
                    },
                ],
            },
        ],
    },
    plugins: [new CopyWebpackPlugin([{ from: 'public' }], {})],
};
