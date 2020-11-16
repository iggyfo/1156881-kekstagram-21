const path = require("path");

module.exports = {
  entry: [
    "./js/api.js",
    "./js/utils.js",
    "./js/gallery.js",
    "./js/filter.js",
    "./js/picture.js",
    "./js/form.js",
    "./js/preview.js",
    "./js/slider.js",
    "./js/upload.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: "eval-source-map"
}
