const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
  constructor(
    message = "Something wrong",
    explination = "Service layer Error",
    StatusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.name = "Service Error";
    this.message = message;
    this.explination = explination;
    this.StatusCode = StatusCode;
  }
}

module.exports = ServiceError;
