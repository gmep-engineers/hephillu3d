const mysqlDate = function (d) {
  const date = d || new Date();
  return date.toISOString().slice(0, 19).replace("T", " ");
};
module.exports = mysqlDate;
