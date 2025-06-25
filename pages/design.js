const common = require("../lib/common");

const design = async function (req, conn, session) {
  const params = common.params;
  params.session = session;
  return await common.render("pages/design", params);
};
module.exports = design;
