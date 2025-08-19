import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database";

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
    data: null,
  });
});

if (process.env.NODE_ENV === "production") {
  db()
    .then(() => console.log("✅ DB connected!!"))
    .catch((err) => console.error("❌ DB connect error:", err));
}

export default app;
