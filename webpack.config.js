// noinspection SpellCheckingInspection

const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        twitchNotes: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'extension'),
        filename: "twitch-notes.js",
        assetModuleFilename: "[name][ext]"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    // {
                    //     loader: 'babel-loader',
                    //     options: {
                    //         presets: ['@babel/preset-env']
                    //     }
                    // }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}