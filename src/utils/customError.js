class CustomErrors extends Error {
  statusCode;
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default CustomErrors;
