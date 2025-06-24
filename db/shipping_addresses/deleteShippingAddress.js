const deleteShippingAddress = async function (conn, dto) {
  const query = `
    delete from shipping_addresses where id = ?
    `;
  await conn.query(query, [dto.id]);
};
