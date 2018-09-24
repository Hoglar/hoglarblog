const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Im setting up the paths. The DIST is where webpack will put the bundle when it is done.
// The JS path is where webpack should get its entry
const paths = {
    DIST: path.resolve(__dirname, 'src/public/dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/preSite/js'),
}

module.exports = {
    watch: true,
    entry: path.join(paths.JS, 'app.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },

    plugins: [
        new ExtractTextPlugin('style.bundle.css'),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
            // File loader so i can put files in asset
            // When preSite gets loaded we also get assets
            // we then can access pictures
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'static/dist',
                        },
                    }
                ]
            }
        ],

    },

    resolve: {
        extensions: [ '.js', '.jsx'],
    }
}
