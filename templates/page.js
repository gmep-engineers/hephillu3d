const footer = require("../components/footer");
const head = require("../components/head");
const header = require("../components/header");
const common = require("../lib/common");

const page = async function (conn, session, mainHtml) {
  const params = common.params;
  params.head = await head();
  params.header = await header(conn, session);
  params.main = mainHtml;
  params.footer = await footer();

  return await common.render("templates/page", params);
};
module.exports = page;
