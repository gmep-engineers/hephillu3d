const common = require("./common");
const mysql = require("mysql2/promise");

const callPublicEndpoint = async function (api, action, dto) {
  const conn = await mysql.createConnection(common.db);
  const res = await api[action](conn, dto);
  conn.destroy();
  return res;
};

module.exports = callPublicEndpoint;
