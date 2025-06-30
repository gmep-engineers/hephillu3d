const common = require("../lib/common");

const privacy = async function (req, conn, session) {
  return await common.render("pages/privacy", {});
};
module.exports = privacy;
