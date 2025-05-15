import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Disallow top-level domains like .com, .org etc.
    .required()
    .label('E-postadress')
    .messages({
      'string.empty': 'E-postadress är obligatoriskt.',
      'string.email': 'Ange en giltig e-postadress.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .label('Lösenord')
    .messages({
      'string.empty': 'Lösenord är obligatoriskt.',
      'string.min': 'Lösenordet måste vara minst 6 tecken långt.',
    }),
}); 