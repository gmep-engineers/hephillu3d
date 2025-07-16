const readAdminPageMeshyTasks = async function (conn, dto) {
  const query = `
        select
        meshy_tasks.id,
        meshy_tasks.owner_id,
        meshy_tasks.date_created,
        meshy_tasks.ip_address,
        meshy_tasks.thumbnail_url,
        meshy_tasks.progress,
        meshy_tasks.approved,
        users.email_address 
        from meshy_tasks
        left join users on users.id = meshy_tasks.owner_id        
        order by meshy_tasks.date_created limit ?, 60
    `;
  const [result] = await conn.query(query, [(dto.page || 0) * 60]);
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      owner_id: res.owner_id,
      date_created: res.date_created,
      ip_address: res.ip_address,
      thumbnail_url: res.thumbnail_url,
      progress: res.progress,
      approved: res.approved,
      email_address: res.email_address,
    });
  }
  return resList;
};
module.exports = readAdminPageMeshyTasks;
