import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(7).required().label('Namn').messages({
    'string.empty': 'Namn är obligatoriskt',
    'string.min': 'Namn måste vara minst 7 tecken',
  }),
  price: Joi.number().min(0).required().label('Pris').messages({
    'number.base': 'Pris måste vara ett nummer',
    'number.empty': 'Pris är obligatoriskt',
  }),
  description: Joi.string().min(15).required().label('Beskrivning').messages({
    'string.empty': 'Beskrivning är obligatorisk',
    'string.min': 'Beskrivning måste vara minst 15 tecken',
  }),
  image: Joi.string().uri().required().label('Bild-URL').messages({
    'string.empty': 'Bild-URL är obligatorisk',
    'string.uri': 'Bild-URL måste vara en giltig länk',
  }),
  category: Joi.string().required().label('Kategori').messages({
    'string.empty': 'Kategori är obligatorisk',
  }),
}); 