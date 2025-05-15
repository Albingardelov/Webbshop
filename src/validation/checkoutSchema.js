import Joi from 'joi';

export const checkoutSchema = Joi.object({
  name: Joi.string().trim().min(2).required().label('Namn').messages({
    'string.empty': 'Namn är obligatoriskt.',
    'string.min': 'Namn måste vara minst 2 tecken.',
  }),
  address: Joi.string().trim().min(2).required().label('Adress').messages({
    'string.empty': 'Adress är obligatoriskt.',
    'string.min': 'Adress måste vara minst 2 tecken.',
  }),
  zip: Joi.string().pattern(/^\d{5}$/).required().label('Postnummer').messages({
    'string.empty': 'Postnummer är obligatoriskt.',
    'string.pattern.base': 'Postnummer måste bestå av 5 siffror.',
  }),
  city: Joi.string().trim().min(2).required().label('Ort').messages({
    'string.empty': 'Ort är obligatoriskt.',
    'string.min': 'Ort måste vara minst 2 tecken.',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('E-post').messages({
    'string.empty': 'E-post är obligatoriskt.',
    'string.email': 'Ange en giltig e-postadress.',
  }),
  phone: Joi.string()
    .custom((value, helpers) => {
      const phoneNumber = value.replace(/\s+/g, ''); // Ta bort mellanslag
      if (!/^[+]?\d{8,}$/.test(phoneNumber)) {
        return helpers.error('string.pattern.base');
      }
      return value; // Returnera ursprungsvärdet om det är giltigt (eller det modifierade om du föredrar det)
    }, 'custom validation')
    .required()
    .label('Telefon')
    .messages({
      'string.empty': 'Telefonnummer är obligatoriskt.',
      'string.pattern.base': 'Telefonnummer måste vara minst 8 siffror och endast innehålla siffror (eventuellt +).',
    }),
}); 