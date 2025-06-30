const common = require("../lib/common");

const admin = async function (req, conn, session) {
  const params = common.params;
  params.session = session;
  return await common.render("pages/admin", params);
};
module.exports = admin;
