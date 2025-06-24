const bcrypt = require("bcrypt");

const login = {
  post: async function (conn, dto) {
    const email_address = dto.email_address;
    const password = dto.password;
    const user = await readUser(conn, { email_address: email_address });
    if (!user)
      return { status: 400, payload: { error: "email address not found" } };
    const compare = bcrypt.compare(password, user.passhash);
    if (!compare)
      return { status: 400, payload: { error: "password incorrect" } };
    const sessionId = await createSession(conn, {
      owner_id: user.id,
      ip_address: dto.ipAddress,
      access_level: user.access_level,
    });
    return { status: 400, payload: { sessionId: sessionId } };
  },
};

module.exports = login;
