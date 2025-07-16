const getCartCount = async function (conn, dto) {
  const query = `
    select count(*) from meshy_tasks where cart_id = ?
    union
    select count(*) from models where cart_id = ?
    union
    select count(*) from gallery_image_cart_rel where cart_id = ?
    `;
  const [result] = await conn.query(query, [
    dto.cart_id,
    dto.cart_id,
    dto.cart_id,
  ]);
  var count = 0;
  for (let i = 0; i < result.length; i++) {
    count = count + result[i]["count(*)"];
  }
  return count;
};
module.exports = getCartCount;
