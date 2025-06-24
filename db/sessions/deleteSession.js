const deleteSession = async function (conn, dto) {
  const query = `delete from sessions where id = ?`;
  await conn.query(query, [dto.id]);
};
module.exports = deleteSession;
