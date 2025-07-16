const readModel = require("./readModel");

const updateModel = async function (conn, dto) {
  const query = `
    update models set
    approved = ?,
    cart_id = ?
    where id = ?
    `;
  const model = await readModel(conn, { id: dto.id });
  await conn.query(query, [
    dto.approved !== null ? dto.approved : model.approved,
    dto.cart_id || model.cart_id,
    dto.id,
  ]);
};
module.exports = updateModel;
