const path = require('path');

module.exports = {
    stories: ['../stories/**/*.stories.(tsx|mdx)'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                sourceLoaderOptions: null,
            }
        },
        '@storybook/addon-knobs'
    ],

    /** Unfortunately need to keep storybook config intact, as it provided necessary content */
    webpackFinal: async config => {
        config.devtool = 'inline-source-map';
        config.module.rules = config.module.rules.map(rule => {
            if (rule.test.toString().includes('svg')) {
              const test = rule.test.toString().replace('svg|', '').replace(/\//g, '')
              return { ...rule, test: new RegExp(test) }
            } else {
              return rule
            }
          })
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    // Optional
                    {
                        loader: require.resolve('react-docgen-typescript-loader')
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader' // compiles Le ss to CSS
                    }
                ]
            }
        );
        config.resolve.modules.push(
            path.resolve(),
            'node_modules/'
        );
        config.resolve.extensions.push('.ts', '.tsx');
        config.optimization.minimize = false;
        return config;
    }
};
