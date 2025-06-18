const common = require("../lib/common");
const header = async function () {
  const params = common.params;
  return await common.render(`components/header`, params);
};

module.exports = header;
