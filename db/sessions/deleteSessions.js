const deleteSessions = async function (conn, dto) {
  const query = `delete from from sessions where owner_id = ?`;
  await conn.query(query, [dto.owner_id]);
};
module.exports = deleteSessions;
