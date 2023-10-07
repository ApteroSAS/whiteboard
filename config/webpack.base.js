const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
    entry: {
        index: ["./src/js/index.js"],
        light: ["./src/js/light.js"],
        view: ["./src/js/view.js"],
        render: ["./src/js/render.js"],
        "pdf.worker": "pdfjs-dist/build/pdf.worker.entry",
    },
    output: {
        path: path.join(__dirname, "..", "dist"),
        filename: "[name]-[fullhash].js",
    },
    resolve: {
        extensions: ["*", ".json", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    compact: true,
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|otf|pdf)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
        }),
        new CopyPlugin({ patterns: [{ from: "assets", to: "" }] }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",  // Output filename
            chunks: ["index"],  // Linking with index.js
            minify: false,
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: "src/light.html",
            filename: "light.html",  // Output filename
            chunks: ["light"],  // Linking with light.js
            minify: false,
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: "src/view.html",
            filename: "view.html",  // Output filename
            chunks: ["view"],  // Linking with light.js
            minify: false,
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: "src/render.html",
            filename: "render.html",  // Output filename
            chunks: ["render"],  // Linking with light.js
            minify: false,
            inject: true,
        }),
    ],
};

module.exports = config;
