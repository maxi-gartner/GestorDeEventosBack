import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/) //solo letras y espacios
    .required()
    .messages({
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 2 characters long.",
      "string.max": "Name cannot exceed 20 characters.",
      "string.pattern.base": "Name can only contain letters and spaces.",
    }),

  lastname: Joi.string()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters long.",
      "string.max": "Last name cannot exceed 20 characters.",
      "string.pattern.base": "Last name can only contain letters and spaces.",
    }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid format.",
  }),

  password: Joi.string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ) //verifica que la contraseña contenga al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),

  age: Joi.number().integer().min(18).max(100).required().messages({
    "number.base": "Age must be a number.",
    "number.min": "You must be at least 18 years old.",
    "number.max": "Age cannot exceed 100 years.",
  }),

  genre: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Genre must be 'male', 'female', or 'other'.",
    "string.empty": "Genre is required.",
  }),

  role: Joi.string().valid("admin", "user").required().messages({
    "any.only": "Role must be 'admin' or 'user'.",
    "string.empty": "Role is required.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid format.",
  }),

  password: Joi.string().min(8).max(30).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 30 characters.",
  }),
});

const validationOptions = {
  abortEarly: false,
};

const result = registerSchema.validate(dataToValidate, validationOptions);
if (result.error) {
  console.log(result.error.details);
}
