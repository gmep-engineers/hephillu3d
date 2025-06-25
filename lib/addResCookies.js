const addResCookies = function (res, cookies) {
  if (!cookies) return;
  console.log(cookies);
  cookies.forEach((cookie) => {
    res.cookie(cookie.key, cookie.value);
  });
};
module.exports = addResCookies;
