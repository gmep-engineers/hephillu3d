const createModel = async function (conn, dto) {
  const query = `
    insert into models (id, owner_id, ip_address, filename)
    values (null, ?, ?, ?)
    `;
  const [result] = await conn.query(query, [
    dto.owner_id,
    dto.ip_address,
    dto.filename,
  ]);
  return result.insertId;
};
module.exports = createModel;
