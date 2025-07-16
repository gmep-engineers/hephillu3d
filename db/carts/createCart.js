const { v4: uuidv4 } = require("uuid");
const createCart = async function (conn, dto) {
  const id = uuidv4();
  const query = `
    insert into carts (id, owner_id, ip_address, session_id)
    values (?, ?, ?, ?)
    `;
  await conn.query(query, [id, dto.owner_id, dto.ip_address, dto.session_id]);
  return id;
};
module.exports = createCart;
