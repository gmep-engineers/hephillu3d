const express = require("express");
var path = require("path");
const home = require("./pages/home");
const design = require("./pages/design");

const getPublicPage = require("./lib/getPublicPage");
const imageRouter = require("./routers/image");
const modelRouter = require("./routers/model");
const taskRouter = require("./routers/task");
const textRouter = require("./routers/text");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api/image", imageRouter);
app.use("/api/model", modelRouter);
app.use("/api/task", taskRouter);
app.use("/api/text", textRouter);

app.get("/", async (req, res) => {
  await getPublicPage(req, res, home);
});

app.get("/design", async (req, res) => {
  await getPublicPage(req, res, design);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
