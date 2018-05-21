const path = require("path");
module.exports = {
  components: "src/components/**/*.js",
  require: [
    path.join(__dirname, "./node_modules/semantic-ui-css/semantic.min.css")
  ]
};
