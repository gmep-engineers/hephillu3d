const readSession = async function (conn, dto) {
  var result = [];
  if (dto.id) {
    const query = `select * from sessions where id = ?`;
    [result] = await conn.query(query, [dto.id]);
  } else if (dto.owner_id) {
    const query = `select * from sessions where owner_id = ?`;
    [result] = await conn.query(query, [dto.owner_id]);
  }
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      date_created: res.date_created,
      owner_id: res.owner_id,
      ip_address: res.ip_address,
      admin_id: res.admin_id,
    };
  }
  return null;
};
module.exports = readSession;
