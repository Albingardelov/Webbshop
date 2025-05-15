import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/CheckoutForm.css';
import { checkoutSchema } from '../validation/checkoutSchema'; // Import Joi schema

function CheckoutForm() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    zip: '',
    city: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    // Optionally, clear the specific field's error when the user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const { error: validationError } = checkoutSchema.validate(form, { abortEarly: false });

    if (validationError) {
      const fieldErrors = {};
      validationError.details.forEach(detail => {
        fieldErrors[detail.path[0]] = detail.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes
    navigate('/thankyou');
  };

  return (
    <form className="checkout-form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="checkout-form-title">Fyll i dina uppgifter</h2>
      
      {/* Name Field */}
      <input name="name" placeholder="Namn" value={form.name} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.name} />
      {errors.name && <div className="checkout-form-error">{errors.name}</div>}
      
      {/* Address Field */}
      <input name="address" placeholder="Adress" value={form.address} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.address} />
      {errors.address && <div className="checkout-form-error">{errors.address}</div>}
      
      {/* Zip Field */}
      <input name="zip" placeholder="Postnummer" value={form.zip} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.zip} />
      {errors.zip && <div className="checkout-form-error">{errors.zip}</div>}
      
      {/* City Field */}
      <input name="city" placeholder="Ort" value={form.city} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.city} />
      {errors.city && <div className="checkout-form-error">{errors.city}</div>}
      
      {/* Email Field */}
      <input name="email" type="email" placeholder="E-post" value={form.email} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.email} />
      {errors.email && <div className="checkout-form-error">{errors.email}</div>}
      
      {/* Phone Field */}
      <input name="phone" type="tel" placeholder="Telefon" value={form.phone} onChange={handleChange} className="checkout-form-input" aria-invalid={!!errors.phone} />
      {errors.phone && <div className="checkout-form-error">{errors.phone}</div>}
      
      <button className="checkout-form-btn" type="submit">Slutför beställning</button>
    </form>
  );
}

export default CheckoutForm; 