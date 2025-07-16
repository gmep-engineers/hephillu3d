const createCart = require("../db/carts/createCart");
const readCart = require("../db/carts/readCart");
const createGalleryImageCartRel = require("../db/gallery_image_cart_rel/createGalleryImageCartRel");
const updateMeshyTask = require("../db/meshy_tasks/updateMeshyTask");
const updateModel = require("../db/models/updateModel");
const apiMessageRes = require("../lib/apiMessageRes");

const cart = {
  addItem: async function (conn, dto, session) {
    var cart = await readCart(conn, { owner_id: session.owner_id });
    if (!cart) {
      cart = await readCart(conn, { session_id: session.id });
    }
    if (!cart) {
      const cartId = await createCart(conn, {
        owner_id: session.owner_id,
        ip_address: dto.ip_address,
        session_id: session.id,
      });
      cart = await readCart(conn, { id: cartId });
    }
    console.log(cart);
    if (dto.meshyTaskId) {
      await updateMeshyTask(conn, { cart_id: cart.id, id: dto.meshyTaskId });
    }
    if (dto.modelId) {
      await updateModel(conn, { cart_id: cart.id, id: dto.modelId });
    }
    if (dto.galleryImageId) {
      await createGalleryImageCartRel(conn, {
        owner_id: dto.owner_id,
        image_id: dto.image_id,
        cart_id: cart.id,
      });
    }
    return apiMessageRes(201, "item added to cart");
  },
  removeItem: async function (conn, dto, session) {
    var cart = await readCart(conn, { owner_id: session.owner_id });
    if (!cart) {
      cart = await readCart(conn, { session_id: session.id });
    }
    if (!cart) {
      return apiMessageRes(404, "cart not found");
    }
    if (dto.type === "meshyTask") {
      await updateMeshyTask(conn, {
        cart_id: "00000000-0000-0000-0000-000000000000",
        id: dto.id,
      });
    }
    if (dto.type === "model") {
      await updateModel(conn, {
        cart_id: "00000000-0000-0000-0000-000000000000",
        id: dto.id,
      });
    }
    if (dto.type === "galleryImage") {
    }
    return apiMessageRes(201, "item removed from cart");
  },
};
module.exports = cart;
