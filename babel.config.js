
/**
 * When requireing this config in your project, ensure the package.json file in your 
 * project contains the "browserslist" key/val pair. Example below:
 * 
 * "browserslist": [
 *     ">0.2%",
 *     "not dead",
 *     "not ie <= 11",
 *     "not op_mini all"
 * ],
 * 
 * This configuration will "include polyfills and code transforms needed for users whose browsers"
 * meet the specifications outlines in the "browserslist" array. 
 * For more information visit: https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
 */

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry"
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        'react-hot-loader/babel'
    ]
};