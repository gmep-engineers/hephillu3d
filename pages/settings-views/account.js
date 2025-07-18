const common = require("../../lib/common");
const account = async function (req, conn, session) {
  const params = common.params;
  params.session = session;

  params.user = {};

  return await common.render("pages/settings-views/account", params);
};
module.exports = account;
