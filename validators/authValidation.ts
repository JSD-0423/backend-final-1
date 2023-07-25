import Joi from "joi";

const passwordPatternMessage =
  "Password must contain at least 8 characters, one uppercase, one number and one special case character";

export const userSchema = Joi.object({
  id: Joi.number().integer().min(0),
  firstName: Joi.string()
    .min(4)
    .max(20)
    .options({
      messages: {
        "string.pattern.base": "Please, enter a valid First name",
        "string.min": "minimum 4 character required",
        "string.max": "maximum 30 characters allowed",
      },
    })
    .required(),
  lastName: Joi.string()
    .min(4)
    .max(20)
    .options({
      messages: {
        "string.pattern.base": "Please, enter a valid Last name",
        "string.min": "minimum 4 character required",
        "string.max": "maximum 30 characters allowed",
      },
    })
    .required(),
  email: Joi.string().email().min(9).max(25).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
      passwordPatternMessage
    )
    .options({
      messages: {
        "string.pattern.base": "Please, enter a valid password",
        "string.min": "minimum 8 character required",
        "string.max": "maximum 30 characters allowed",
      },
    })
    .required(),
  repeatPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirmation password")
    .options({
      messages: { "any.only": "Confirmation password does not match" },
    }),
});

export const credentialsSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(30)
    .options({
      messages: {
        "email.empty": "Sorry, email can not be empty",
        "email.base": "Please, enter a valid email",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
      },
    })
    .message("Please, enter a valid email")
    .required(),
  password: Joi.string()
    .min(9)
    .max(30)
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
      passwordPatternMessage
    )
    .message("Please, enter a valid password")
    .required(),
});
export const idSchema = Joi.number();
