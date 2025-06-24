const readShippingAddress = async function (conn, dto) {
  const query = `
    select * from shipping_addresses where id = ?
    `;
  const [result] = await conn.query(query, [dto.id]);
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      street: res.street,
      city: res.city,
      state: res.state,
      postal_code: res.postal_code,
    };
  }
  return null;
};
