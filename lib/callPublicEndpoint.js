const common = require("./common");
const mysql = require("mysql2/promise");
const readSession = require("../db/sessions/readSession");

const callPublicEndpoint = async function (req, res, api, action, dto) {
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
  const apiRes = await api[action](conn, dto, session);
  conn.destroy();
  return apiRes;
};

module.exports = callPublicEndpoint;
