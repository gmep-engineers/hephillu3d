const common = require("../lib/common");

const about = async function (req, conn, session) {
  return await common.render("pages/about", {});
};
module.exports = about;
