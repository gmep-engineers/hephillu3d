const readAdminPageMeshyTasks = require("../../db-procedures/readAdminPageMeshyTasks");
const common = require("../../lib/common");
const taskApi = require("../../api/task");
const updateMeshyTask = require("../../db/meshy_tasks/updateMeshyTask");

const meshy = async function (req, conn, session) {
  const params = common.params;
  params.session = session;
  params.htmlAdminMeshyRows = "";
  const taskList = await readAdminPageMeshyTasks(conn, {
    page: req.query.page || 0,
  });
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].progress !== 100 || !taskList[i].thumbnail_url) {
      const taskApiRes = await taskApi.get(conn, { id: taskList[i].id });
      if (taskApiRes.status === 200) {
        taskList[i].progress = taskApiRes.payload.status;
        taskList[i].thumbnail_url = taskApiRes.payload.thumbnail_url;
        await updateMeshyTask(conn, {
          id: taskList[i].id,
          approved: taskList[i].approved,
          progress: taskList[i].progress,
          thumbnail_url: taskList[i].thumbnail_url,
        });
      }
    }
    params.htmlAdminMeshyRows += `
    <tr>
      <td><img width=100 src="${
        taskList[i].thumbnail_url
      }" alt="no preview available"/></td>
      <td>${taskList[i].date_created}</td>
      <td>${taskList[i].email_address}</td>
      <td>${taskList[i].ip_address}</td>
      <td style="text-align: center"><input type="checkbox" ${
        taskList[i].approved === 1 ? "checked" : ""
      } id="approve-${
      taskList[i].id
    }" onchange="updateApproveReject(this)"/></td>
      <td style="text-align: center"><input type="checkbox" ${
        taskList[i].approved === 0 ? "checked" : ""
      } id="reject-${
      taskList[i].id
    }" onchange="updateApproveReject(this)"/></td>
    </tr>
    `;
  }
  return await common.render("pages/admin-views/meshy", params);
};
module.exports = meshy;
