const galleryImage = require("../components/galleryImage");
const readGalleryImages = require("../db/gallery_images/readGalleryImages");
const common = require("../lib/common");

const gallery = async function (req, conn, session) {
  const params = common.params;
  const galleryImages = await readGalleryImages(conn);
  params.htmlGalleryImages = "";
  for (let i = 0; i < galleryImages.length; i++) {
    params.htmlGalleryImages += await galleryImage(galleryImages[i]);
  }

  return await common.render("pages/gallery", params);
};
module.exports = gallery;
