import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import httpStatus from "http-status";
import config from "../config/config.js";
import { jwtStrategy } from "../config/passport.js";
import routes from "./routes.js";
import { authLimiter } from "./middlewares/rateLimiter.middleware.js";
import {
  errorConverter,
  errorHandler,
} from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";
// import initializeScheduler from "./scheduler.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

if (config.env === "development") {
  app.use(morgan("dev"));
}

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

if (config.env === "production") {
  app.use("/api/v1/auth", authLimiter);
}

app.use("/api/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

// initializeScheduler();

export default app;
