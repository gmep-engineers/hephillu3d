const common = require("./common");
const mysql = require("mysql2/promise");

const callPublicEndpoint = async function (api, action, dto) {
  const conn = await mysql.createConnection(common.db);
  var sid = req.cookies.sid;
  if (!sid) {
    sid = await createSession(conn, {
      owner_id: null,
      ip_address: req.ip,
      admin_id: null,
    });
    res.cookie("sid", sid);
  }
  const session = await readSession(conn, { id: sid });
  const res = await api[action](conn, dto, session);
  conn.destroy();
  return res;
};

module.exports = callPublicEndpoint;
