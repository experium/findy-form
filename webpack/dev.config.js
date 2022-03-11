const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../.tmp'),
        filename: 'app.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'DOMAIN': process.env.DOMAIN ? `"${process.env.DOMAIN}"` : undefined,
                'NODE_ENV': '"development"',
                'RECAPTCHA': '"6LeGFW0aAAAAADzkbozlVnpbROvKEBMwc-d4zkMx"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'demo/indexDev.html',
                    to: 'index.html'
                }
            ]
        }),
    ],
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, '../.tmp'),
        watchContentBase: true,
        port: 9000,
        host: '0.0.0.0',
        public: 'localhost:9000',
        disableHostCheck: true,
        historyApiFallback: true,
        open: true,
        hot: false,
        liveReload: false,
    }
};

