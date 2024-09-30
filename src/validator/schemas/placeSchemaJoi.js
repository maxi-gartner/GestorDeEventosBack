import Joi from "joi";

const placeSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 20 characters.",
  }),

  address: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 20 characters.",
  }),

  photo: Joi.string().uri().allow(null).messages({
    "string.uri": "Photo must be a valid URL.",
  }),

  date: Joi.array().items(Joi.string()).messages({
    "array.base": "Date must be an array of strings.",
  }),

  ocupancy: Joi.number().integer().required().messages({
    "number.base": "Ocupancy must be a number.",
    "number.required": "Ocupancy is required.",
  }),
});

export default placeSchema;
