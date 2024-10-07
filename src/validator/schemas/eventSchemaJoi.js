import Joi from "joi";

const eventSchema = Joi.object({
  place: Joi.string().required().messages({
    "string.empty": "Place is required.",
  }),

  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date.",
    "any.required": "Date is required.",
  }),

  name: Joi.string().min(2).max(40).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 40 characters.",
  }),

  photo: Joi.string().uri().allow(null).messages({
    "string.uri": "Photo must be a valid URL.",
  }),

  description: Joi.string().min(5).max(300).required().messages({
    "string.empty": "Description is required.",
    "string.min": "Description must be at least 5 characters long.",
    "string.max": "Description cannot exceed 300 characters.",
  }),

  attendees: Joi.array().items(Joi.string()).messages({
    "array.base": "Attendees must be an array of strings.",
  }),

  minimumAge: Joi.number().integer().required().messages({
    "number.base": "Minimum age must be a number.",
    "number.min": "Minimum age must be at least 18 years old.",
    "any.required": "Minimum age is required.",
  }),

  comments: Joi.array().items(Joi.string()).messages({
    "array.base": "Comments must be an array of strings.",
  }),
});

export default eventSchema;
