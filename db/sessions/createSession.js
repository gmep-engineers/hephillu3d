const { v4: uuidv4 } = require("uuid");
const createSession = async function (conn, dto) {
  const id = uuidv4();
  const query = `
  insert into sessions (id, owner_id, ip_address)
  values (?, ?, ?)
  `;
  await conn.query(query, [id, dto.owner_id, dto.ip_address]);
  return id;
};

module.exports = createSession;
