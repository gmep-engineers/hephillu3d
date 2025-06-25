const page = require("../templates/page");

const getPublicPage = async function (req, res, main) {
  const mainHtml = await main(req);
  const fullHtml = await page(null, mainHtml);
  res.status(200).end(fullHtml);
};

module.exports = getPublicPage;
