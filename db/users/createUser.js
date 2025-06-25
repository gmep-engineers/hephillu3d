const bcrypt = require("bcrypt");
const createUser = async function (conn, dto) {
  var passhash = dto.passhash;
  if (!passhash && dto.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    passhash = await bcrypt.hash(dto.password, salt);
  }
  const query = `insert into users (id, email_address, passhash)
    values (null, ?, ?)`;
  const [result] = await conn.query(query, [dto.email_address, passhash]);
  return result.insertId;
};
module.exports = createUser;
