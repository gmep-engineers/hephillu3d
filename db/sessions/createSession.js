const uuidv4 = require("uuid");
const createSession = async function (conn, dto) {
  const id = uuidv4();
  const query = `
  insert into sessions (id, owner_id, ipv4_address, ipv6_address)
  values (?, ?, ?, ?)
  `;
  await conn.query(query, [
    id,
    dto.owner_id,
    dto.ipv4_address,
    dto.ipv6_address,
  ]);
  return id;
};

module.export = createSession;
