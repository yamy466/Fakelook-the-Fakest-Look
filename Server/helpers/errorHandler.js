const CustomError = require("./customError");

module.exports = errorHandler = (error) => {
  return typeof error === CustomError
    ? error
    : new CustomError("unknownError", 400, "error we didn't handle :(");
};
