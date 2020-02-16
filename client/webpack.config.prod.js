import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const srcPath = path.resolve(__dirname, './src/');

export default {
    target: 'web',
    devtool: false,
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
    optimization: {
        occurrenceOrder: true
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: Object.assign({}, {
            'components': path.join(srcPath, 'components'),
            'constants': path.join(srcPath, 'constants'),
            'widgets': path.join(srcPath, 'widgets'),
            'reducers': path.join(srcPath, 'reducers'),
            'config': path.join(srcPath, 'config'),
            'service': path.join(srcPath, 'service'),
            'util': path.join(srcPath, 'util'),
        })
    },
    mode: 'production',
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader']},
            {test: /\.(png|jpg|gif)$/, use: [{loader: 'file-loader'}]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CompressionPlugin({
            test: /\.(js|css|json|html|ttf)/,
            filename: "[path].gz[query]",
            algorithm: "gzip",
            threshold: 0,
            minRatio: 0.9,
            deleteOriginalAssets: false
        })
    ]
};