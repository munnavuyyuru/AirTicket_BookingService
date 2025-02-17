const { StatusCodes } = require("http-status-codes");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const BookingService = require("../service/booking-service");

const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "SUCCESS" };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "Succesfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      console.log("Inside the booking controller : ", response);
      return res.status(StatusCodes.OK).json({
        data: response,
        success: true,
        message: "successfully booked a flight",
        error: {},
      });
    } catch (error) {
      return res.status(error.StatusCode).json({
        data: {},
        success: false,
        message: error.message,
        error: error.explination,
      });
    }
  }
}

module.exports = BookingController;
