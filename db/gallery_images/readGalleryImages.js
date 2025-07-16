const readGalleryImages = async function (conn, dto) {
  const query = `select * from gallery_images`;
  const [result] = await conn.query(query);
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      url: res.url,
      name: res.name,
      description: res.description,
    });
  }
  return resList;
};
module.exports = readGalleryImages;
