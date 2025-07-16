const readShippingAddresses = async function (conn, dto) {
  var query = ``;
  var result = [];
  if (dto.owner_id) {
    query = `select * from shipping_addresses where owner_id = ?`;
    [result] = await conn.query(query, [dto.owner_id]);
  } else {
    query = `select * from shipping_addresses`;
    [result] = await conn.query(query);
  }
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      owner_id: res.owner_id,
      recipient: res.recipient,
      street: res.street,
      unit: res.unit,
      city: res.city,
      state: res.state,
      postal_code: res.postal_code,
      country_iso: res.country_iso,
    });
  }
  return resList;
};
module.exports = readShippingAddresses;
