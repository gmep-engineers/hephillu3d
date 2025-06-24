const mysqlDate = require("../../lib/mysqlDate");
const deleteUser = async function (conn, dto) {
  const query = `update users set date_deleted = ? where id = ?`;
  await conn.query(query, [mysqlDate(), dto.id]);
};
module.exports = deleteUser;
