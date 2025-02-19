import express from "express";
import cors from "cors";
// import { createClient } from "@supabase/supabase-js";
// import { nanoid } from "nanoid";
import authenticate from "./middleware";
import { login, signUp } from "./auth";
import { getShortUrl, postShortUrl } from "./short-code";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// cookieSession

app.get("/", (req, res) => {
  res.send("Hi World!");
});

app.post("/auth/signup", signUp);

app.post("/auth/login", login);

app.post("/shorten", authenticate, postShortUrl);
app.get("/:short_code", getShortUrl);

// app.get("/test_guard", authenticate, (req, res) => {
//   console.log("user", req.body.user);
//   res.send("Congratulations, you are authenticated!");
// });

app.listen(
  port,
  () => console.log(`Listening on port ${port}\nhttp://localhost:${port}`),
);
