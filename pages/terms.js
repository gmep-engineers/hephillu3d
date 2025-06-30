const common = require("../lib/common");

const terms = async function (req, conn, session) {
  return await common.render("pages/terms", {});
};
module.exports = terms;
