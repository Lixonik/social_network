import path from 'path'
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.resolve();

const pugFolder = `${__dirname}/views`;
const pugs = fs.readdirSync(pugFolder).filter(fileName => fileName.endsWith('.pug'));

export default {
    mode: "development",
    entry: {
        babelPolyfill: "@babel/polyfill",
        index: path.resolve(__dirname, 'src', 'index.js'),
        users: path.resolve(__dirname, 'src/scripts', 'users.js'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist/webpack'),
        publicPath: '/',
        clean: true,
        filename: '[name].js',
    },
    plugins: [
        ...pugs.map(page => new HtmlWebpackPlugin({
            template: `${pugFolder}/${page}`,
            filename: `views/${page}`,
        })),
        new MiniCssExtractPlugin({
            filename: 'styles/style.css'
        })
    ],
    module: {
        rules: [

            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            },
            {
                test : /\.css$/i,
                exclude: /node_modules/,
                use : [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test : /\.less$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            }
        ]
    }

}