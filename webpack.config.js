const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    mode: "development",
    watch: true,
    watchOptions: {
        followSymlinks: true
    },

    plugins: [
    ],
    devServer: {
        port: 4000,
        liveReload: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
            watch: true
        },
    },
    output: {
        publicPath: "",
        filename: 'kasimir.js',
        path: path.resolve(__dirname, 'dist'),
    },
};