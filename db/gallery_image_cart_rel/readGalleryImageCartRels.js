const readGalleryImageCartRels = async function (conn, dto) {
  var query = "";
  var result = [];
  if (dto.owner_id) {
    query = `select * from gallery_image_cart_rels where owner_id = ?`;
    result = await conn.query(query, [dto.owner_id]);
  } else if (dto.cart_id) {
    query = `select * from gallery_image_cart_rels where cart_id = ?`;
    result = await conn.query(query, [dto.cart_id]);
  }
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      owner_id: res.owner_id,
      image_id: res.image_id,
      cart_id: res.cart_id,
      has_led_canlde: res.has_led_canlde,
      glow_id: res.glow_id,
    });
  }
  return resList;
};
module.exports = readGalleryImageCartRels;
