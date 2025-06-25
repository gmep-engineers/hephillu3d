const common = require("../lib/common");

const signUp = async function () {
  const params = common.params;
  return await common.render("pages/signUp", params);
};
module.exports = signUp;
