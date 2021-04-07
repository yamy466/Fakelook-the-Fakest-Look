module.exports = class CustomError extends Error {
    constructor(name, status = 400, message = "") {
        super(message);
        this.name = name;
        this.statusCode = status;
    }
}