import Joi from 'joi';

export const bvcConfirmPayment = Joi.object().keys({
  referencia: Joi.string().max(12).required().messages({
    'string.max': 'La referencia debe tener un máximo de 12 caracteres',
    'any.required': 'La referencia es obligatoria'
  }),
  fecha: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
    'string.pattern.base': 'La fecha debe tener el formato DD/MM/YYYY',
    'any.required': 'La fecha es obligatoria'
  }),
  banco: Joi.string().length(4).required().messages({
    'string.length': 'El banco debe tener 4 caracteres',
    'any.required': 'El banco es obligatorio'
  }),
  telefonoP: Joi.string().pattern(/^[1-9]\d*$/).required().messages({
    'string.pattern.base': 'El teléfono no puede comenzar con 0',
    'any.required': 'El teléfono es obligatorio'
  }),
  monto: Joi.string().pattern(/^\d+(\.\d+)?$/).required().messages({
    'string.pattern.base': 'El monto debe ser un número con punto decimal (por ejemplo, 123.45)',
    'any.required': 'El monto es obligatorio'
  })
});
