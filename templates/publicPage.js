const footer = require("../components/footer");
const head = require("../components/head");
const common = require("../lib/common");

const publicPage = async function (mainHtml) {
  const params = common.params;
  params.head = await head();
  params.main = mainHtml;
  params.footer = await footer();

  return await common.render("templates/publicPage", params);
};
module.exports = publicPage;
