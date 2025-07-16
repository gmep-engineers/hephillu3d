const readAdminPageModels = require("../../db-procedures/readAdminPageModels");
const common = require("../../lib/common");

const model = async function (req, conn, session) {
  const params = common.params;
  params.session = session;
  params.htmlAdminModelRows = "";
  const modelList = await readAdminPageModels(conn, {
    page: req.query.page || 0,
  });
  for (let i = 0; i < modelList.length; i++) {
    params.htmlAdminModelRows += `
    <tr>
      <td>preview</td>
      <td>${modelList[i].date_created}</td>
      <td>${modelList[i].email_address}</td>
      <td>${modelList[i].ip_address}</td>
      <td style="text-align: center"><input type="checkbox" ${
        modelList[i].approved === 1 ? "checked" : ""
      } id="approve-${
      modelList[i].id
    }" onchange="updateApproveReject(this)"/></td>
      <td style="text-align: center"><input type="checkbox" ${
        modelList[i].approved === 0 ? "checked" : ""
      } id="reject-${
      modelList[i].id
    }" onchange="updateApproveReject(this)"/></td>
    </tr>
    </tr>
    `;
  }
  return await common.render("pages/admin-views/model", params);
};
module.exports = model;
