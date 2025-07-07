const express = require("express");
const cookieParser = require("cookie-parser");
var path = require("path");
const admin = require("./pages/admin");
const home = require("./pages/home");
const login = require("./pages/login");
const signUp = require("./pages/signUp");
const design = require("./pages/design");

const getPublicPage = require("./lib/getPublicPage");
const imageRouter = require("./routers/image");
const loginRouter = require("./routers/login");
const logoutRouter = require("./routers/logout");
const modelRouter = require("./routers/model");
const signUpRouter = require("./routers/signUp");
const taskRouter = require("./routers/task");
const textRouter = require("./routers/text");
const getPrivatePage = require("./lib/getPrivatePage");
const getAdminPage = require("./lib/getAdminPage");

const app = express();

// Remove www subdomain as this could cause cors issues
app.use((req, res, next) => {
  if (req.headers.host.startsWith("www.")) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api/image", imageRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/model", modelRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/task", taskRouter);
app.use("/api/text", textRouter);

app.get("/", async (req, res) => {
  await getPublicPage(req, res, home);
});

app.get("/admin", async (req, res) => {
  await getAdminPage(req, res, admin);
});

app.get("/admin/:view", async (req, res) => {
  await getAdminPage(req, res, admin);
});

app.get("/sign-up", async (req, res) => {
  await getPublicPage(req, res, signUp);
});

app.get("/login", async (req, res) => {
  await getPublicPage(req, res, login);
});

app.get("/design", async (req, res) => {
  if (req.cookies.sid) {
    await getPrivatePage(req, res, design);
  } else {
    await getPublicPage(req, res, design);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
