const common = require("./common");
const mysql = require("mysql2/promise");
const readSession = require("../db/sessions/readSession");
const apiMessageRes = require("./apiMessageRes");

const callPrivateEndpoint = async function (req, res, api, action, dto) {
  const sid = req.cookies.sid;
  if (!sid) {
    return apiMessageRes(401, "not authorized");
  }
  const conn = await mysql.createConnection(common.db);
  const session = await readSession(conn, { id: sid });
  if (!session) {
    return apiMessageRes(401, "not authorized");
  }
  const apiRes = await api[action](conn, dto, session);
  conn.destroy();
  return apiRes;
};

module.exports = callPrivateEndpoint;
