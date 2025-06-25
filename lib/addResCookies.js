const addResCookies = function (res, cookies) {
  if (!cookies) return;
  cookies.forEach((cookie) => {
    res.cookie(cookie.key, cookie.value);
  });
};
module.exports = addResCookies;
