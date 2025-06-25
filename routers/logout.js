const express = require("express");
const logoutApi = require("../api/logout");
const router = express.Router();
const callPrivateEndpoint = require("../lib/callPrivateEndpoint");

router.get("/", async function (req, res) {
  dto = {
    all: false,
  };
  await callPrivateEndpoint(req, res, logoutApi, "post", dto);
  res.clearCookie("sid");
  res.redirect("/");
});

router.get("/all", async function (req, res) {
  dto = {
    all: true,
  };
  await callPrivateEndpoint(req, res, logoutApi, "post", dto);
  res.clearCookie("sid");
  res.redirect("/");
});

module.exports = router;
