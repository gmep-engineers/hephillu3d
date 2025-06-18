const common = require("../lib/common");
const head = async function (siteTheme) {
  const params = common.params;
  params.title = "Hephillu3d";
  params.siteTheme = siteTheme || "dark";
  return await common.render("components/head", params);
};
module.exports = head;
