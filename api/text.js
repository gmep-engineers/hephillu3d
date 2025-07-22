const createMeshyTask = require("../db/meshy_tasks/createMeshyTask");
const readMeshyTask = require("../db/meshy_tasks/readMeshyTask");
const config = require("../etc/config");
const axios = require("axios");
const apiPayloadRes = require("../lib/apiPayloadRes");
const apiMessageRes = require("../lib/apiMessageRes");
const readUser = require("../db/users/readUser");
const updateUser = require("../db/users/updateUser");

const text = {
  get: async function (conn, dto, session) {
    const meshyTask = await readMeshyTask(conn, dto);
    if (meshyTask) {
      return apiPayloadRes(200, meshyTask);
    } else {
      return apiMessageRes(404, "not found");
    }
  },
  post: async function (conn, dto, session) {
    const user = await readUser(conn, { id: session.owner_id });
    if (user.meshy_credits <= 0) {
      return apiMessageRes(400, "insufficient credits");
    }
    const text = dto.text;
    const headers = { Authorization: `Bearer ${config.API_KEY}` };
    const payload = {
      mode: "preview",
      prompt: text,
      art_style: "sculpture",
    };

    var taskId = "";
    try {
      const response = await axios.post(
        "https://api.meshy.ai/openapi/v2/text-to-3d",
        payload,
        { headers }
      );
      taskId = response.data.result;
      await createMeshyTask(conn, {
        id: taskId,
        owner_id: session.owner_id,
        ip: dto.ip_address,
      });
      await updateUser(conn, {
        meshy_credits: user.meshy_credits - 1,
        id: session.owner_id,
      });
      return { status: 201, payload: { taskId: taskId } };
    } catch (err) {
      return { status: 400, payload: { error: err } };
    }
  },
};
module.exports = text;
