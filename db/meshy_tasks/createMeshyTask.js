const createMeshyTask = async function (conn, dto) {
  const query = `insert into meshy_tasks (id, owner_id, ip_address)
    values (?, ?, ?)
    `;
  await conn.query(query, [dto.id, dto.owner_id, dto.ip_address]);
};
module.exports = createMeshyTask;
