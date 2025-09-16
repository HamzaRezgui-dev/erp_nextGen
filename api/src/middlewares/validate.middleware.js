import Joi from "joi";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const objectToValidate = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const joiSchema = Joi.object(
    Object.keys(schema).reduce((acc, key) => {
      acc[key] = schema[key];
      return acc;
    }, {})
  );

  const { error, value } = joiSchema.validate(objectToValidate, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

export default validate;
