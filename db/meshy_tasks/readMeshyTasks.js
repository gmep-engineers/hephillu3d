const readMeshyTasks = async function (conn, dto) {
  var query = "";
  var result = [];
  if (dto.owner_id) {
    query = `select * from meshy_tasks where owner_id = ?`;
    result = await conn.query(query, [dto.owner_id]);
  } else if (dto.cart_id) {
    query = `select * from meshy_tasks where cart_id = ?`;
    result = await conn.query(query, [dto.cart_id]);
  } else if (dto.approved !== null) {
    query = `select * from meshy_tasks where approved = ?`;
    result = await conn.query(query, [dto.approved]);
  }

  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[0];
    resList.push({
      id: res.id,
      date_created: res.date_created,
      owner_id: res.owner_id,
      progress: res.progress,
      thumbnail_url: res.thumbnail_url,
      approved: res.approved,
      ip_address: res.ip_address,
      cart_id: res.cart_id,
      has_led_candle: res.has_led_candle,
      glow_id: res.glow_id,
    });
  }
  return resList;
};
module.exports = readMeshyTasks;
