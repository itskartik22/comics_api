const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { globalErrorHandler } = require("./middleware/errorHandler");
dotenv.config({ path: "./config.env" });
// const AppError = require("./utils/appError");
//Create express app
const app = express();
app.use(cookieParser());

//Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

const comicRouter = require("./routes/comicRoutes");
const managerRouter = require("./routes/managerRoutes");
//Routes Middleware
app.use("/api/comics", comicRouter);
app.use("/api/comics/manager", managerRouter);

app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Page not found",
    });
});


app.use(globalErrorHandler);

module.exports = app;
