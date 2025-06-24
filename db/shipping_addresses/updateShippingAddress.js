const updateShippingAddress = async function (conn, dto) {
  const query = `
    update shipping_addresses set
    street = ?,
    city = ?,
    state = ?,
    postal_code = ?
    where id = ?
    `;
  const shippingAddress = await readShippingAddress(conn, dto);
  if (!shippingAddress) {
    return;
  }
  await conn.query(query, [
    dto.street || shippingAddress.street,
    dto.city || shippingAddress.city,
    dto.state || shippingAddress.state,
    dto.postal_code || shippingAddress.postal_code,
    dto.id,
  ]);
};
