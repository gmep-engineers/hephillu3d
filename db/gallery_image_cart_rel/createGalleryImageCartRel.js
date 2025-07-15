const createGalleryImageCartRel = async function (conn, dto) {
  const query = `insert into gallery_image_cart_rel (id, owner_id, image_id, cart_id) values (null, ?, ?, ?)`;
  await conn.query(query, [dto.owner_id, dto.image_id, dto.cart_id]);
};
