const readUser = async function (conn, dto) {
  var result = [];
  if (dto.id) {
    const query = `select * from users where email_address = ?`;
    [result] = await conn.query(query, [dto.id]);
  } else if (dto.email_address) {
    const query = `select * from users where email_address = ?`;
    [result] = await conn.query(query, [dto.email_address]);
  }
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      date_created: res.date_created,
      email_address: res.email_address,
      passhash: res.passhash,
      profile: res.profile,
      image_id: res.image_id,
      comment_thread_id: res.commentThreadId,
      access_level: res.accessLevel,
    };
  }
  return null;
};
module.exports = readUser;
