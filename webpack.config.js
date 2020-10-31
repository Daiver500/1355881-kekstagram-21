const path = require("path")

module.exports = {
 entry: [
   "./js/server.js",
   "./js/bigpicture.js",
   "./js/cardcreate.js",
   "./js/filters.js",
   "./js/modalopenclose.js",
   "./js/submit.js",
   "./js/success.js",
   "./js/error.js",
   "./js/validation.js",
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
