const readCart = async function (conn, dto) {
  const query = `select * from carts where id = ?`;
  const [result] = await conn.query(query, [dto.id]);
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      ip_address: res.ip_address,
    };
  }
  return null;
};
module.exports = readCart;
