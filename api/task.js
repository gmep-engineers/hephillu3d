const config = require("../etc/config");
const axios = require("axios");

const task = {
  get: async function (conn, dto) {
    const id = dto.id;
    const headers = { Authorization: `Bearer ${config.API_KEY}` };
    try {
      const response = await axios.get(
        `https://api.meshy.ai/openapi/v1/image-to-3d/${id}`,
        { headers }
      );
      if (response.data.progress < 100) {
        return { status: 200, payload: { progress: response.data.progress } };
      } else {
        return {
          status: 200,
          payload: {
            progress: response.data.progress,
            thumbnail_url: response.data.thumbnail_url,
          },
        };
      }
    } catch (err) {
      return { status: 500, payload: { error: "server error" } };
    }
  },
};
module.exports = task;
