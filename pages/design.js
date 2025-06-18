const common = require("../lib/common");

const design = async function (req) {
  const params = common.params;
  return await common.render("pages/design", params);
};
module.exports = design;
