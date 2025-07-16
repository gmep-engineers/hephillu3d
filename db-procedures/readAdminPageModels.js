const readAdminPageModels = async function (conn, dto) {
  const query = `
        select
        models.id,
        models.owner_id,
        models.date_created,
        models.ip_address,
        models.filename,
        models.approved,
        users.email_address 
        from models
        left join users on users.id = models.owner_id        
        order by models.date_created limit ?, 60
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
      filename: res.filename,
      approved: res.approved,
      email_address: res.email_address,
    });
  }
  return resList;
};
module.exports = readAdminPageModels;
