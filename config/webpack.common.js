const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");


module.exports = {
    context: path.join(__dirname, "../", "src"),
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    entry: ["@babel/polyfill", "./index.tsx"],
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    useBabel: true,
                    babelCore: "@babel/core", // needed for Babel v7
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "assets/img/[name].[ext]?[hash]",
                    esModule: false,
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
}
