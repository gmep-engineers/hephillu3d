const common = require("../lib/common");
const header = async function (session) {
  const params = common.params;
  params.session = session;
  return await common.render(`components/header`, params);
};

module.exports = header;
