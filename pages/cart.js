const cartItem = require("../components/cartItem");
const readCartPageGalleryImageCartRels = require("../db-procedures/readCartPageGalleryImageCartRels");
const readMeshyTasks = require("../db/meshy_tasks/readMeshyTasks");
const readModels = require("../db/models/readModels");
const readCart = require("../db/carts/readCart");
const common = require("../lib/common");

const getGlowType = function (glow_id) {
  switch (glow_id) {
    case 1:
      return "Small";
    case 2:
      return "Medium";
    default:
      return "Large";
  }
};

const cart = async function (req, conn, session) {
  const params = common.params;
  params.htmlCartItems = "";
  var cart = await readCart(conn, { owner_id: session.owner_id });
  if (!cart) {
    cart = await readCart(conn, { session_id: session.id });
  }
  if (!cart) {
    return await common.render("pages/cart", params);
  }
  const models = await readModels(conn, { cart_id: cart.id });
  const meshyTasks = await readMeshyTasks(conn, {
    cart_id: cart.id,
  });
  const galleryImages = await readCartPageGalleryImageCartRels(conn, {
    cart_id: cart.id,
  });
  for (let i = 0; i < models.length; i++) {
    params.htmlCartItems += await cartItem({
      id: models[i].id,
      glowType: getGlowType(models[i].glow_id),
      has_led_candle: models[i].has_led_candle,
      modelSrc: `https://${params.config.AWS_S3_BUCKET}.s3.${params.config.AWS_REGION}.amazonaws.com/${models[i].filename}`,
      type: "model",
    });
  }
  for (let i = 0; i < meshyTasks.length; i++) {
    params.htmlCartItems += await cartItem({
      id: meshyTasks[i].id,
      glowType: getGlowType(meshyTasks[i].glow_id),
      has_led_candle: meshyTasks[i].has_led_candle,
      imgSrc: meshyTasks[i].thumbnail_url,
      type: "meshyTask",
    });
  }
  for (let i = 0; i < galleryImages.length; i++) {
    params.htmlCartItems += await cartItem({
      id: galleryImages[i].id,
      glowType: getGlowType(galleryImages[i].glow_id),
      has_led_candle: galleryImages[i].has_led_candle,
      imgSrc: galleryImages[i].url,
      type: "galleryImage",
    });
  }
  params.models = models;
  params.meshyTasks = meshyTasks;
  params.galleryImages = galleryImages;
  params.subtotal = 0;
  params.tax = 0;
  params.shipping = 0;
  return await common.render("pages/cart", params);
};
module.exports = cart;
