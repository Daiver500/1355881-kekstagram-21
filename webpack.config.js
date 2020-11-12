const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/timeout.js",
    "./js/big-picture.js",
    "./js/cardcreate.js",
    "./js/filters.js",
    "./js/validation.js",
    "./js/submit.js",
    "./js/modal.js",
    "./js/photoloading.js",
    "./js/success.js",
    "./js/error.js",
    "./js/effects.js",
    "./js/scale.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
