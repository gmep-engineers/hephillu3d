const deleteMeshyTask = async function (conn, dto) {
  const query = `
    delete from meshy_tasks where id = ?
    `;
  await conn.query(query, [dto.id]);
};
module.exports = deleteMeshyTask;
