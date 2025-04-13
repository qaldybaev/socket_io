import express from "express"; 
import { join } from "node:path";

const app = express();
app.use( "/js",express.static(join(process.cwd(), "js")));

app.get("/", (req, res) => {
  res.sendFile(join(process.cwd(), "index.html"));
});

app.get("/page/:pageName", (req, res) => {
  const { pageName } = req.params;
  res.sendFile(join(process.cwd(), "pages", `${pageName}.html`));
});

app.listen(4000, () => {
  console.log("Front 4000 portda ishladi");
});
