const readCartPageGalleryImageCartRels = async function (conn, dto) {
  if (!dto.cart_id) {
    return [];
  }
  const query = `
    select
    gallery_images.id,
    gallery_images.url,
    gallery_images.name,
    gallery_images.description,
    gallery_image_cart_rel.has_led_candle,
    gallery_image_cart_rel.glow_id
    from gallery_images
    left join gallery_image_cart_rel on gallery_image_cart_rel.image_id = gallery_images.id
    where gallery_image_cart_rel.cart_id = ?
    `;
  const [result] = await conn.query(query, dto.cart_id);
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      url: res.url,
      name: res.name,
      description: res.description,
      has_led_candle: res.has_led_candle,
    });
  }
  return resList;
};
module.exports = readCartPageGalleryImageCartRels;
