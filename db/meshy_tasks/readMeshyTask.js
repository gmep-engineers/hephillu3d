const readMeshyTask = async function (conn, dto) {
  const query = `
    select * from meshy_tasks where id = ?
    `;
  const [result] = await conn.query(query, [dto.id]);
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      date_created: res.date_created,
      approved: res.approved,
      thumbnail_url: res.thumbnail_url,
    };
  }
  return null;
};
module.exports = readMeshyTask;
