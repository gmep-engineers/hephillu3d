const config = require("../etc/config");
const axios = require("axios");

const text = {
  post: async function (dto) {
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
      return { status: 201, payload: { taskId: taskId } };
    } catch (err) {
      return { status: 400, payload: { error: err } };
    }
  },
};
module.exports = text;
