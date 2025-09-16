import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Create new Sequelize instance using the configuration from config.js
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

const findModelFiles = (startPath) => {
  let results = [];
  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findModelFiles(filename));
    } else if (filename.endsWith(".model.js")) {
      results.push(filename);
    }
  }
  return results;
};

(async () => {
  const modelPaths = [
    path.join(__dirname, "../core"),
    path.join(__dirname, "../modules"),
  ];

  const allModelFiles = modelPaths.flatMap((dir) => findModelFiles(dir));

  for (const file of allModelFiles) {
    const modelModule = await import(path.resolve(file));
    const modelDefinition = modelModule.default;
    const model = modelDefinition(sequelize, DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
