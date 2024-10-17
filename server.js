const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const DB = process.env.MONGO_DB_URI.replace(
  "<PASSWORD>",
  process.env.MONGO_DB_PASSWORD
);

mongoose
  .connect(DB, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => {
    console.log("Database Connection Successful...");
  })
  .catch((err) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runnig on port ${port} ......`);
});
