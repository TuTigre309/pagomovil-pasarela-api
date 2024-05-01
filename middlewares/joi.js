import Joi from 'joi';

export const validateRequest = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error, value } = Joi.attempt(req[property], schema);
      if (error) throw error;

      next();
    } catch (error) {
      const message = error.message;
      res.status(422).json({ error: true, message: message });
    }
  };
};
