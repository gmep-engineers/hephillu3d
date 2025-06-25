const mysqlDate = require("../../lib/mysqlDate");

const updateSession = async function (conn, dto) {
  const query = `update sessions set
    last_accessed = ?
    where id = ?
    `;
  await conn.query(query, [mysqlDate(), dto.id]);
};
module.exports = updateSession;
