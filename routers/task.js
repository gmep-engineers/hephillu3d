const express = require("express");
const taskApi = require("../api/task");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");

router.get("/", async function (req, res) {
  const dto = {
    id: req.query.id,
  };
  const apiRes = await callPublicEndpoint(taskApi, "get", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
