
require('dotenv').config();

if (process.env.NODE_ENV == "development") {
  require("babel-register");
  require("./bin/www");
} else {
  require("./dist/bin/www");
}