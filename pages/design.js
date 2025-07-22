const readUser = require("../db/users/readUser");
const common = require("../lib/common");

const design = async function (req, conn, session) {
  const params = common.params;
  params.session = session;
  params.meshy_credits = await readUser(
    conn,
    { id: session.owner_id },
    "meshy_credits"
  );
  params.creditsPlural = params.meshy_credits === 1 ? "" : "s";
  return await common.render("pages/design", params);
};
module.exports = design;
