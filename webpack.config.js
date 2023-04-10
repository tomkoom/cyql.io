const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

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
const frontendDirectory = "cyql_frontend";

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
    // alias
    alias: {
      // https://www.taniarascia.com/react-architecture-directory-structure/
      // "@": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src", frontendDirectory, "assets"),
      // src
      // "@auth": path.resolve(__dirname, "src", frontendDirectory, "src/auth"),
      "@components": path.resolve(__dirname, "src", frontendDirectory, "src/Components"),
      "@context": path.resolve(__dirname, "src", frontendDirectory, "src/Context"),
      "@firestore": path.resolve(__dirname, "src", frontendDirectory, "src/Firestore"),
      "@hooks": path.resolve(__dirname, "src", frontendDirectory, "src/Hooks"),
      "@icons": path.resolve(__dirname, "src", frontendDirectory, "src/Icons"),
      "@idl": path.resolve(__dirname, "src", frontendDirectory, "src/idl"),
      "@modals": path.resolve(__dirname, "src", frontendDirectory, "src/Modals"),
      "@pages": path.resolve(__dirname, "src", frontendDirectory, "src/Pages"),
      "@routes": path.resolve(__dirname, "src", frontendDirectory, "src/Routes"),
      "@state": path.resolve(__dirname, "src", frontendDirectory, "src/State"),
      "@styles": path.resolve(__dirname, "src", frontendDirectory, "src/Styles"),
      "@utils": path.resolve(__dirname, "src", frontendDirectory, "src/Utils"),
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
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, "src", "cyql_frontend", "assets"),
    //       to: path.join(__dirname, "dist", "cyql_frontend"),
    //     },
    //   ],
    // }),
    // dfx 0.11.0
    // https://internetcomputer.org/docs/current/developer-docs/updates/release-notes/#duplicate-asset-keys-are-now-reported-as-errors
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      CYQL_BACKEND_CANISTER_ID: canisters["cyql_backend"],
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
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
