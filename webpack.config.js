const path = require("path");

// Im setting up the paths. The DIST is where webpack will put the bundle when it is done.
// The JS path is where webpack should get its entry
const paths = {
    DIST: path.resolve(__dirname, 'src/public/dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
}

module.exports = {
    entry: path.join(path.JS, 'app.js'),
    output: {
        path: path.DIST,
        filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: [
                    'babel-loader',
                ]
            }
        ]
    },

    resolve: {
        extensions: [ '.js', '.jsx'],
    }
}
