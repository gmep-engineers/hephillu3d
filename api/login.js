const bcrypt = require("bcrypt");
const apiResCookie = require("../lib/apiResCookie");
const readUser = require("../db/users/readUser");
const apiMessageRes = require("../lib/apiMessageRes");
const apiPayloadRes = require("../lib/apiPayloadRes");
const createSession = require("../db/sessions/createSession");

const login = {
  post: async function (conn, dto) {
    const email_address = dto.email_address;
    const password = dto.password;
    const user = await readUser(conn, { email_address: email_address });
    if (!user) return apiMessageRes(400, "email address not found");
    const compare = await bcrypt.compare(password, user.passhash);
    if (!compare) return apiMessageRes(400, "password incorrect");
    const sessionId = await createSession(conn, {
      owner_id: user.id,
      ip_address: dto.ipAddress,
      access_level: user.access_level,
    });
    return apiPayloadRes(201, { sessionId: sessionId }, [
      apiResCookie("sid", sessionId),
    ]);
  },
};

module.exports = login;
