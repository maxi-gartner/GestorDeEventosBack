import CustomErrors from "../utils/customError.js";

function validator(schema) {
  return function (req, res, next) {
    const validate = schema.validate(req.body, { abortEarly: false });
    if (validate.error) {
      throw new CustomErrors(validate.error.details[0].message, 400);
    }
    next();
  };
}

export default validator;
