import app from "./src/app.js";
import config from "./config/config.js";
import db from "./src/models/index.js";

const server = app.listen(config.port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    console.log(
      `Server listening on port ${config.port} in ${config.env} mode.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
