const page = require("../templates/page");
const mysql = require("mysql2/promise");
const common = require("../lib/common");
const readSession = require("../db/sessions/readSession");

const getAdminPage = async function (req, res, main) {
  const sid = req.cookies.sid;
  if (!sid) {
    res.redirect(302, "/login");
    return;
  }
  const conn = await mysql.createConnection(common.db);
  const session = await readSession(conn, { id: sid });
  if (!session) {
    conn.destroy();
    res.clearCookie("sid");
    res.redirect(302, "/login");
    return;
  }
  if (!session.admin_id) {
    conn.destroy();
    res.redirect(302, "/");
    return;
  }
  if (!req.params.view) {
    conn.destroy();
    res.redirect(302, "/admin/meshy");
    return;
  }
  const view = req.params.view;
  const mainHtml = await main(req, conn, session, view);
  if (!mainHtml) {
    conn.destroy();
    res.redirect(302, "/admin/meshy");
    return;
  }
  const fullHtml = await page(session, mainHtml);
  conn.destroy();
  res.status(200).end(fullHtml);
};

module.exports = getAdminPage;
