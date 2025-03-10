/*jshint esversion: 6 */
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env, argv) => {
  const devMode = env.NODE_ENV !== "production";

  if (argv.mode === "development") {
    console.log("webpack is in dev mode");
  } else if (argv.mode === "production") {
    console.log("webpack is in production mode");
  } else {
    console.log("webpack has no mode defined");
  }

  return {
    mode: argv.mode || "development",

    entry: {
      index: path.join(__dirname, "src/", "index.js"),
      infoPages: path.join(__dirname, "src/", "infoPages.js"),
    },

    output: {
      filename: devMode ? "[name].js" : "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      assetModuleFilename: "assets/[hash][ext][query]", // for asset modules
    },

    devtool: "source-map",

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      hot: true,
      historyApiFallback: true,
    },

    resolve: {
      alias: {
        scss: path.resolve(__dirname, "src/scss"),
        utils: path.resolve(__dirname, "src/utils"),
        public: path.resolve(__dirname, "public"),
      },
      extensions: [".js", ".scss"],
      fallback: {
        fs: false, // 👈 Add this line to prevent 'fs' module errors
      },
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.js$/,
          exclude: {
            and: [/node_modules/],
            not: [/d3-geo|d3-tile|d3-array/],
          },
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.(hbs|handlebars)$/,
          use: [
            {
              loader: "handlebars-loader",
              options: {
                helperDirs: path.resolve(__dirname, "src/hbs_helpers"),
                partialDirs: [path.resolve(__dirname, "src/hbs_partials")],
                runtime: require.resolve("handlebars/runtime"), // Explicitly use the runtime
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: "asset/resource",
        },
      ],
    },

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /node_modules/,
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
          extractComments: true,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },

    stats: "minimal",

    plugins: [
      new ESLintPlugin({
        eslintPath: require.resolve("eslint/use-at-your-own-risk"), // Set eslintPath to the internal resolver
        emitWarning: true,
        emitError: true,
        overrideConfigFile: path.resolve(__dirname, "eslint.config.mjs"),
      }),

      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: "body",
        template: path.join(__dirname, "public", "index.html"),
        excludeChunks: ["infoPages"],
        scriptLoading: "defer",
      }),

      new HtmlWebpackPlugin({
        filename: "info/how.html",
        inject: "body",
        template: path.join(__dirname, "public/info", "how.html"),
        excludeChunks: ["index"],
        scriptLoading: "defer",
      }),

      new HtmlWebpackPlugin({
        filename: "info/why.html",
        inject: "body",
        template: path.join(__dirname, "public/info", "why.html"),
        excludeChunks: ["index"],
        scriptLoading: "defer",
      }),

      new HtmlWebpackPlugin({
        filename: "info/resources.html",
        inject: "body",
        template: path.join(__dirname, "public/info", "resources.html"),
        excludeChunks: ["index"],
        scriptLoading: "defer",
      }),

      new CopyPlugin([{ from: "public", to: "public" }]),

      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
        ignoreOrder: true,
      }),

      new StylelintPlugin({
        fix: true,
        lintDirtyModulesOnly: true,
        emitErrors: true,
        emitWarning: true,
      }),

      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
        "process.env.USE_REDUX_LOGGER": JSON.stringify(env.USE_REDUX_LOGGER),
        "process.env.USE_PRELOADED_STATE": JSON.stringify(
          env.USE_PRELOADED_STATE
        ),
      }),
    ],
  };
};
