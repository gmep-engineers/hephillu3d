const express = require("express");
const taskApi = require("../api/task");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const callAdminEndpoint = require("../lib/callAdminEndpoint");

router.get("/", async function (req, res) {
  const dto = {
    id: req.query.id,
  };
  const apiRes = await callPublicEndpoint(req, res, taskApi, "get", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
router.put("/", async function (req, res) {
  const dto = {
    id: req.query.id,
    approved: req.body.approved,
    progress: req.body.progress,
    thumbnail_url: req.body.thumbnail_url,
  };
  const apiRes = await callAdminEndpoint(req, res, taskApi, "put", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
