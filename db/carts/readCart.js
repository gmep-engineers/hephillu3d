const readCart = async function (conn, dto) {
  var query = ``;
  var result = [];
  if (dto.id) {
    query = `select * from carts where id = ? and is_active = 1`;
    [result] = await conn.query(query, [dto.id]);
  } else if (dto.owner_id) {
    query = `select * from carts where owner_id = ? and is_active = 1`;
    [result] = await conn.query(query, [dto.owner_id]);
  } else if (dto.session_id) {
    query = `select * from carts where session_id = ? and is_active = 1`;
    [result] = await conn.query(query, [dto.session_id]);
  }
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      session_id: res.session_id,
      ip_address: res.ip_address,
      is_active: res.is_active,
    };
  }
  return null;
};
module.exports = readCart;
