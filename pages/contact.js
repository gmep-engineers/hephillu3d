const common = require("../lib/common");

const contact = async function () {
  return await common.render("pages/contact", {});
};
module.exports = contact;
