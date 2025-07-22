const readUser = async function (conn, dto, field) {
  var result = [];
  if (dto.id) {
    const query = `select ${field || "*"} from users where id = ?`;
    [result] = await conn.query(query, [dto.id]);
  } else if (dto.email_address) {
    const query = `select ${field || "*"} from users where email_address = ?`;
    [result] = await conn.query(query, [dto.email_address]);
  }
  if (result.length > 0) {
    const res = result[0];
    if (field) {
      return res[field];
    }
    return {
      id: res.id,
      date_created: res.date_created,
      email_address: res.email_address,
      passhash: res.passhash,
      date_created: res.date_created,
      date_activated: res.date_activated,
      date_deleted: res.date_deleted,
      meshy_credits: res.meshy_credits,
    };
  }
  return null;
};
module.exports = readUser;
