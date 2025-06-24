const common = require("../lib/common");
const login = async function () {
  const params = common.params;
  return await common.render("pages/login", params);
};
module.exports = login;
