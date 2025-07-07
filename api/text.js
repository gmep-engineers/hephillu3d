const createMeshyTask = require("../db/meshy_tasks/createMeshyTask");
const config = require("../etc/config");
const axios = require("axios");

const text = {
  post: async function (conn, dto, session) {
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
      return { status: 201, payload: { taskId: taskId } };
    } catch (err) {
      console.log(err);
      return { status: 400, payload: { error: err } };
    }
  },
};
module.exports = text;
