const path = require("path");

module.exports = {
  entry: { main: "./pages/script.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  // watch: true,
};
