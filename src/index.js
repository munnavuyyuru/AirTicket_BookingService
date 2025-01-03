const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT, DB_SYNC, FLIGHT_SERVICE_PATH } = require("./config/serverConfig");
const db = require("./models/index");
const apiRoutes = require("./routers/index");
const axios = require("axios");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started on port ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/1`;

    // const flight = await axios.get(getFlightRequestURL, { timeout: 5000 });
    // console.log(flight.data);
  });
};

setupAndStartServer();
