const common = require("../lib/common");
const galleryImage = async function (image) {
  return await common.render("components/galleryImage", image);
};
module.exports = galleryImage;
