const deleteSession = require("../db/sessions/deleteSession");
const deleteSessions = require("../db/sessions/deleteSessions");

const logout = {
  post: async function (conn, dto, session) {
    if (dto.all) {
      await deleteSessions(conn, { owner_id: session.owner_id });
      return { status: 201, payload: { messaged: "logged out all" } };
    } else {
      await deleteSession(conn, { id: session.id });
      return { status: 201, payload: { messaged: "logged out" } };
    }
  },
};

module.exports = logout;
