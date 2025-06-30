const readAdmin = async function (conn, dto) {
  var query = "";
  var result = [];
  if (dto.user_id) {
    query = `select * from admins where user_id = ?`;
    [result] = await conn.query(query, [dto.user_id]);
  } else if (dto.id) {
    query = `select * from admins where id = ?`;
    [result] = await conn.query(query, [dto.id]);
  }
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      user_id: res.user_id,
    };
  }
  return null;
};
module.exports = readAdmin;
