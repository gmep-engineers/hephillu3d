const readModel = async function (conn, dto) {
  const query = `
    select * from models where id = ?
    `;
  const [result] = await conn.query(query, [dto.id]);
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      date_created: res.date_created,
      ip_address: res.ip_address,
      filename: res.filename,
      approved: res.approved,
    };
  }
  return null;
};
module.exports = readModel;
