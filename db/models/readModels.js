const readModels = async function (conn, dto) {
  var query = "";
  var result = [];
  if (dto.owner_id) {
    query = `select * from models where owner_id = ?`;
    [result] = await conn.query(query, [dto.id]);
  } else if (dto.cart_id) {
    query = `select * from models where cart_id = ?`;
    [result] = await conn.query(query, [dto.cart_id]);
  } else if (dto.approved !== null) {
    query = `select * from models where approved = ?`;
    [result] = await conn.query(query, [dto.approved]);
  }
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      owner_id: res.owner_id,
      date_created: res.date_created,
      ip_address: res.ip_address,
      filename: res.filename,
      approved: res.approved,
      cart_id: res.cart_id,
      has_led_candle: res.has_led_candle,
    });
  }
  console.log(resList);
  return resList;
};
module.exports = readModels;
