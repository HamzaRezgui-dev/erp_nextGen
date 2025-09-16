import path from "path";

const config = {
  config: path.resolve("config", "database.js"),
  "models-path": path.resolve("src", "models"),
  "seeders-path": path.resolve("src", "seeders"),
  "migrations-path": path.resolve("src", "migrations"),
};

export default config;
