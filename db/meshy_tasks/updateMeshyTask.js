const readMeshyTask = require("./readMeshyTask");

const updateMeshyTask = async function (conn, dto) {
  const query = `
    update meshy_tasks set
    approved = ?,
    progress = ?,
    thumbnail_url = ?
    where id = ?
    `;

  const meshyTask = await readMeshyTask(conn, { id: dto.id });
  if (!meshyTask) return;
  await conn.query(query, [
    dto.approved,
    dto.progress || meshyTask.progress,
    dto.thumbnail_url || meshyTask.thumbnail_url,
    dto.id,
  ]);
};
module.exports = updateMeshyTask;
