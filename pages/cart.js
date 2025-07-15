const cartItem = require("../components/cartItem");
const readCartPageGalleryImageCartRels = require("../db-procedures/readCartPageGalleryImageCartRels");
const readMeshyTasks = require("../db/meshy_tasks/readMeshyTasks");
const readModels = require("../db/models/readModels");
const common = require("../lib/common");
const mysql = require("mysql2/promise");

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
  var destroyConn = false;
  if (!conn) {
    conn = await mysql.createConnection(common.db);
    destroyConn = true;
  }
  const models = await readModels(conn, { cart_id: req.cookies.cart_id });
  const meshyTasks = await readMeshyTasks(conn, {
    cart_id: req.cookies.cart_id,
  });
  const galleryImages = await readCartPageGalleryImageCartRels(conn, {
    cart_id: req.cookies.cart_id,
  });
  params.htmlCartItems = "";
  for (let i = 0; i < models.length; i++) {
    params.htmlCartItems += await cartItem({
      glowType: getGlowType(models[i].glow_id),
      has_led_candle: models[i].has_led_candle,
      type: "model",
    });
  }
  for (let i = 0; i < meshyTasks.length; i++) {
    params.htmlCartItems += await cartItem({
      glowType: getGlowType(meshyTasks[i].glow_id),
      has_led_candle: meshyTasks[i].has_led_candle,
      imgSrc: meshyTasks[i].thumbnail_url,
      type: "meshyTask",
    });
  }
  for (let i = 0; i < galleryImages.length; i++) {
    params.htmlCartItems += await cartItem({
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
  if (destroyConn) {
    conn.destroy();
  }
  return await common.render("pages/cart", params);
};
module.exports = cart;
