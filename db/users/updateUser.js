const readUser = require("./readUser");

const updateUser = async function (conn, dto) {
  var query = `
    update users set
    email_address = ?,
    passhash = ?
    where id = ?
    `;
  const user = await readUser(conn, dto);
  if (!user) return;
  var passhash = dto.passhash;
  if (!passhash && dto.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    passhash = await bcrypt.hash(dto.password, salt);
  }
  await conn.query(query, [
    dto.email_address || user.email_address,
    dto.passhash || user.passhash,
    dto.id || user.id,
  ]);
};
module.exports = updateUser;
