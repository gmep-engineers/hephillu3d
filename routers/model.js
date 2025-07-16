const express = require("express");
const modelApi = require("../api/model");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const multer = require("multer");
const callPrivateEndpoint = require("../lib/callPrivateEndpoint");
const callAdminEndpoint = require("../lib/callAdminEndpoint");
const upload = multer({ dest: "./uploads" });

router.post("/", upload.single("file", 15), async function (req, res) {
  dto = {
    file: req.file,
    ip_address: req.ip,
  };
  if (req.cookies.sid) {
    const apiRes = await callPrivateEndpoint(req, res, modelApi, "post", dto);
    res.status(apiRes.status).send(apiRes.payload);
  } else {
    const apiRes = await callPublicEndpoint(modelApi, "post", dto);
    res.status(apiRes.status).send(apiRes.payload);
  }
});

router.put("/", async function (req, res) {
  const dto = {
    id: req.query.id,
    approved: req.body.approved,
  };
  const apiRes = await callAdminEndpoint(req, res, modelApi, "put", dto);
  res.status(apiRes.status).send(apiRes.payload);
});

module.exports = router;
