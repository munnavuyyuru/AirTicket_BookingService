const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT, DB_SYNC } = require("./config/serverConfig");
const db = require("./models/index");
const apiRoutes = require("./routers/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started on port ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
