function httResponse(res, data, message, statusCode) {
  res.status(statusCode).json({
    success: statusCode < 400,
    response: data,
    message: message,
  });
}

export default httResponse;
