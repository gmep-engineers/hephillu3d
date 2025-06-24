const createShippingAddress = async function (conn, dto) {
  const query = `
    insert into shipping_addresses (id, owner_id, street, city, state, postal_code)
    values (null, ?, ?, ?, ?, ?)
    `;
  const [result] = await conn.query(query, [
    dto.owner_id,
    dto.street,
    dto.city,
    dto.state,
    dto.postal_code,
  ]);
  return result.insertId;
};
module.exports = createShippingAddress;
