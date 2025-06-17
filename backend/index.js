import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
console.log(__dirname);

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://r1-assignment-eleven.netlify.app",
    ],

    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
