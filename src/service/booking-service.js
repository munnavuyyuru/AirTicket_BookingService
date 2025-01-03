const axios = require("axios");

const { BookingRepository } = require("../repository/index");

const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const ServiceError = require("../utils/errors/service-error");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      if (!data || !data.flightId) {
        throw new ServiceError("Invalid booking data: flightId is required");
      }
      const flightId = data.flightId;

      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

      const response = await axios.get(getFlightRequestURL);

      const flightData = response.data.data;
      let priceOfFlight = flightData.price;

      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient seats in the flight"
        );
      }
      return response.data;
    } catch (error) {
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
