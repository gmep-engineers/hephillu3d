const createUser = require("../db/users/createUser");
const bcrypt = require("bcrypt");
const readUser = require("../db/users/readUser");
const apiMessageRes = require("../lib/apiMessageRes");
const createSession = require("../db/sessions/createSession");
const apiResCookie = require("../lib/apiResCookie");
const apiPayloadRes = require("../lib/apiPayloadRes");

const signUp = {
  post: async function (conn, dto) {
    const saltRounds = 10;
    var salt = await bcrypt.genSalt(saltRounds);
    var passhash = await bcrypt.hash(dto.user.password, salt);

    var user = await readUser(conn, { email_address: dto.email_address });

    if (user) {
      return apiMessageRes(400, "user with email already exists");
    }

    const userId = await createUser(conn, {
      email_address: dto.user.email_address,
      passhash: passhash,
    });

    // email user for verification

    const sid = await createSession(conn, {
      owner_id: userId,
      ip_address: dto.ip_address,
    });
    return apiPayloadRes(201, { userId: userId, nextStep: "/design" }, [
      apiResCookie("sid", sid),
    ]);
  },
};
module.exports = signUp;
