function httResponse(res, data, message, statusCode) {
  res.status(statusCode).json({
    error: false,
    response: data,
    message: message,
  });
}

export default httResponse;
