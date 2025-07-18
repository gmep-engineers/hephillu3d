const common = require("../lib/common");
const account = require("./settings-views/account");
const settings = async function (req, conn, session, view) {
  const params = common.params;
  const views = {
    account: account,
  };
  var viewObj = views[view];
  if (!viewObj) {
    return null;
  }
  params.session = session;
  params.htmlSettingsView = await viewObj(req, conn, session);
  return await common.render("pages/settings", params);
};

module.exports = settings;
