const updateModel = async function (conn, dto) {
  const query = `
    update models set
    approved = ?
    where id = ?
    `;
  await conn.query(query, [dto.approved, dto.id]);
};
module.exports = updateModel;
