function require(path1) {
  return undefined;
}

const path = require("path");

let module;
module.exports = {
  entry: [
    "./js/server.js",
    "./js/bigpicture.js",
    "./js/cardcreate.js",
    "./js/filters.js",
    "./js/validation.js",
    "./js/modalopenclose.js",
    "./js/submit.js",
    "./js/success.js",
    "./js/error.js",
    "./js/effects.js",
    "./js/scale.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "finaljs"),
    iife: true
  },
  devtool: false
}
