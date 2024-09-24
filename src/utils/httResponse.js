function httResponse(res, data, message, statusCode) {
  res.status(statusCode).json({
    success: true,
    response: data,
    message: message,
  });
}

export default httResponse;
