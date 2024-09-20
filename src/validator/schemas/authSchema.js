import joi from "joi";

const authSchema = {
  login: joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
  register: joi
    .object({
      name: joi.string().required(),
      lastname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      age: joi.number().required(),
      genre: joi.string().required(),
    })
    .required(),
};

export default authSchema;
