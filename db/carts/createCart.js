const createCart = async function (conn, dto) {
  const query = `
    insert into carts (id, owner_id, ip_address)
    values (null, ?, ?)
    `;
  const [result] = await conn.query(query, [dto.owner_id, dto.ip_address]);
  return result.insertId;
};
module.exports = createCart;
