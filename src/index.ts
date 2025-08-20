import express from "express";
import router from "./routes/api";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./utils/database";
import dotenv from "dotenv";
import docs from "./docs/route";

dotenv.config();

async function init() {
  try {
    const result = await db();

    console.log("database status: ", result);

    const app = express();
    app.use(cors());

    app.use(bodyParser.json());

    const { PORT } = process.env;

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to Evently API",
        data: null,
      });
    });

    app.use("/api/v1", router);

    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
