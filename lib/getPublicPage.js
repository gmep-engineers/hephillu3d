const createSession = require("../db/sessions/createSession");
const readSession = require("../db/sessions/readSession");
const page = require("../templates/page");
const mysql = require("mysql2/promise");
const common = require("../lib/common");

const getPublicPage = async function (req, res, main) {
  var sid = req.cookies.sid;
  const conn = await mysql.createConnection(common.db);
  if (!sid) {
    sid = await createSession(conn, {
      owner_id: null,
      ip_address: req.ip,
      admin_id: null,
    });
    res.cookie("sid", sid);
  }
  const session = await readSession(conn, { id: sid });
  const mainHtml = await main(req, conn, session);
  const fullHtml = await page(conn, session, mainHtml);
  conn.destroy();
  res.status(200).end(fullHtml);
};

module.exports = getPublicPage;
