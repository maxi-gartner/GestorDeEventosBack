const responses = {
  success: (res, data, message, status = 200) => {
    return res.status(status).json({
      status: "success",
      message: message,
      data: data,
    });
  },

  error: (res, error, message, status = 500) => {
    return res.status(status).json({
      status: "error",
      message: message,
      error: error.message || error,
    });
  },
};

export default responses;
