const common = require("../lib/common");
const meshy = require("./admin-views/meshy");
const model = require("./admin-views/model");

const admin = async function (req, conn, session, view) {
  const params = common.params;
  const views = {
    meshy: meshy,
    model: model,
  };
  var viewObj = views[view];
  if (!viewObj) {
    return null;
  }
  params.htmlAdminView = await viewObj(req, conn, session);
  return await common.render("pages/admin", params);
};
module.exports = admin;
