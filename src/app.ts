import "dotenv/config";
import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

app.listen(3333, () => console.log("Running on port 3333"));
