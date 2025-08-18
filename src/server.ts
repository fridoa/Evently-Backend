import app from "./index";
import db from "./utils/database";

async function init() {
  try {
    const result = await db();

    console.log("✅ database status(local): ", result);

    const { PORT } = process.env;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
