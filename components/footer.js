const common = require("../lib/common");
const footer = async function () {
  const params = common.params;
  return await common.render("components/footer", params);
};

module.exports = footer;
