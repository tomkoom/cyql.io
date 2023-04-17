const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

let localCanisters, prodCanisters, canisters;

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");

  canisters = network === "local" ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] = canisters[canister][network];
  }
}
initCanisterIds();

const isDevelopment = process.env.NODE_ENV !== "production";
const asset_entry = path.join("src", "cyql_frontend", "src", "index.html");
const frontendDir = "cyql_frontend";

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
    },

    // https://www.taniarascia.com/react-architecture-directory-structure/
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src", frontendDir, "assets"),

      // components
      "@components": path.resolve(__dirname, "src", frontendDir, "src/Components"),
      // ...
      "@btns": path.resolve(__dirname, "src", frontendDir, "src/Components/btns"),
      "@icons": path.resolve(__dirname, "src", frontendDir, "src/Components/ui-elements/icons"),
      "@layout": path.resolve(__dirname, "src", frontendDir, "src/Components/layout"),
      "@ui-elements": path.resolve(__dirname, "src", frontendDir, "src/Components/ui-elements"),
      // end components

      "@constants": path.resolve(__dirname, "src", frontendDir, "src/constants"),
      "@context": path.resolve(__dirname, "src", frontendDir, "src/context"),
      "@firestore": path.resolve(__dirname, "src", frontendDir, "src/firestore"),
      "@hooks": path.resolve(__dirname, "src", frontendDir, "src/hooks"),
      "@idl": path.resolve(__dirname, "src", frontendDir, "src/idl"),
      "@modals": path.resolve(__dirname, "src", frontendDir, "src/modals"),
      "@pages": path.resolve(__dirname, "src", frontendDir, "src/pages"),
      "@routes": path.resolve(__dirname, "src", frontendDir, "src/routes"),
      "@state": path.resolve(__dirname, "src", frontendDir, "src/state"),
      "@styles": path.resolve(__dirname, "src", frontendDir, "src/styles"),
      "@utils": path.resolve(__dirname, "src", frontendDir, "src/utils"),
      // ...etc
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", "cyql_frontend"),
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  module: {
    rules: [
      { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
      // svg
      { test: /\.(svg)$/, use: [{ loader: "file-loader" }] },
      // css modules
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1, modules: true } },
        ],
        include: /\.module\.css$/,
      },
      // css
      { test: /\.css$/, use: ["style-loader", "css-loader"], exclude: /\.module\.css$/ },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      cache: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      CYQL_BACKEND_CANISTER_ID: canisters["cyql_backend"],
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
    new Dotenv(),
  ],
  // proxy /api to port 8000 during development
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    // hot: true,
    // liveReload: false,
    hot: false,
    liveReload: false,
    // contentBase: path.resolve(__dirname, "./src/cyql_frontend"),
    // watchContentBase: true
  },
};
