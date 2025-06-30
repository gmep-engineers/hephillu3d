const adminRow = async function (objectListItem) {
  const params = {};
  params.objectListItem = objectListItem;
  return await common.render("components/adminRow", params);
};
