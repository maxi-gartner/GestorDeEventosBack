function handleErrors(error, req, res, next) {
  console.error(error);
  res.status(error.statusCode || 400).json({
    error: true,
    message: error.message || "An error occurred",
  });
}

export default handleErrors;
