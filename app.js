const express = require("express");
const cookieParser = require("cookie-parser");
var path = require("path");
const home = require("./pages/home");
const login = require("./pages/login");
const signUp = require("./pages/signUp");
const design = require("./pages/design");

const getPublicPage = require("./lib/getPublicPage");
const imageRouter = require("./routers/image");
const modelRouter = require("./routers/model");
const signUpRouter = require("./routers/signUp");
const taskRouter = require("./routers/task");
const textRouter = require("./routers/text");
const getPrivatePage = require("./lib/getPrivatePage");

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api/image", imageRouter);
app.use("/api/model", modelRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/task", taskRouter);
app.use("/api/text", textRouter);

app.get("/", async (req, res) => {
  await getPublicPage(req, res, home);
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
