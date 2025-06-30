const common = require("../lib/common");

const about = async function () {
  return await common.render("pages/about", {});
};
module.exports = about;
