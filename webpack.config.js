const path = require("path");

module.exports = {
  entry: [
    "./js/api.js",
    "./js/utils.js",
    "./js/gallery.js",
    "./js/form.js",
    "./js/filter.js",
    "./js/picture.js",
    "./js/slider.js",
    "./js/preview.js",
    "./js/upload.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve("./js/"),
    iife: true
  },
  devtool: false
}
