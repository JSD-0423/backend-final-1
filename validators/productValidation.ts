import Joi from "joi";

export const productValidation = Joi.object({
  id: Joi.number().integer().min(0),
  title: Joi.string()
    .min(3)
    .max(25)
    .label("Product title")
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "string.empty": "Sorry, {{#label}} can not be empty",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
      },
    })
    .required(),
  price: Joi.number()
    .min(0.0)
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "number.min": "Sorry, the minimum price is 0.0",
      },
    })
    .required(),
  description: Joi.string()
    .min(10)
    .label("Product description")
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "string.empty": "Sorry, {{#label}} can not be empty",
        "string.min": "minimum 10 character required",
      },
    }),
   image: Joi.string()
    .uri()
    .min(12)
    .label("Product image")
    .options({
      messages: {
        "string.empty": "Sorry, {{#label}} can not be empty",
        "string.min": "minimum 12 character required",
      },
    }),
  category: Joi.string()
    .min(3)
    .max(10)
    .label("Category")
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "string.empty": "Sorry, {{#label}} can not be empty",
        "string.min": "minimum 4 character required",
        "string.max": "maximum 10 characters allowed",
      },
    })
    .required(),
  categoryId: Joi.number()
    .integer()
    .min(0)
    .label("Category id")
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "number.min": "Sorry, category id can not be less than 0",
      },
    })
    .required(),
  brandId: Joi.number()
    .integer()
    .label("Brand ID")
    .min(0)
    .options({
      messages: {
        "any.required": "Please, enter the {{#label}}",
        "number.min": "Sorry, brand id can not be less than 0",
      },
    })
    .required(),
});

export const searchValidation = Joi.string()
  .label("Product title")
  .options({
    messages: {
      "string.empty": "Sorry, {{#label}} can not be empty",
    },
  })
  .required();
