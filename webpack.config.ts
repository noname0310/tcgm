import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import TsMacros from "ts-macros";
import { Program } from "typescript";

module.exports = {
    entry: "./test/index.ts",
    output: {
        path: path.join(__dirname, "/testbundle"),
        filename: "[name].bundle.js",
        assetModuleFilename: "images/[name][ext]",
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "esnext"
                    },
                    getCustomTransformers: (program: Program) => ({
                        before: [
                            TsMacros(program),
                        ]
                    })
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset",
            }
        ],
    },
    resolve: {
        modules: ["src", "test", "node_modules"],
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./test/index.html",
        }),
        new ESLintPlugin({
            extensions: ["ts"],
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: 20310,
        allowedHosts: [
            "nonamehome.iptime.org",
        ],
        client: {
            logging: "none",
        },
    },
    mode: "development",
};
