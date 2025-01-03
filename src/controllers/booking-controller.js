const { StatusCodes } = require("http-status-codes");
const BookingService = require("../service/booking-service");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log("Inside the booking controller : ", response);
    return res.status(StatusCodes.OK).json({
      data: response.data,
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
};
module.exports = {
  create,
};
