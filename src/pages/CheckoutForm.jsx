import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/CheckoutForm.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateZip(zip) {
  return /^\d{5}$/.test(zip);
}
function validatePhone(phone) {
  return /^[+]?\d{8,}$/.test(phone.replace(/\s+/g, ''));
}

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

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name || form.name.trim().length < 2) newErrors.name = 'Namn måste vara minst 2 tecken';
    if (!form.address || form.address.trim().length < 2) newErrors.address = 'Adress måste vara minst 2 tecken';
    if (!form.zip || !validateZip(form.zip)) newErrors.zip = 'Postnummer måste vara 5 siffror';
    if (!form.city || form.city.trim().length < 2) newErrors.city = 'Ort måste vara minst 2 tecken';
    if (!form.email || !validateEmail(form.email)) newErrors.email = 'Ange en giltig e-postadress';
    if (!form.phone || !validatePhone(form.phone)) newErrors.phone = 'Telefon måste vara minst 8 siffror och bara siffror';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate('/thankyou');
    }
  };

  return (
    <form className="checkout-form-container" onSubmit={handleSubmit}>
      <h2 className="checkout-form-title">Fyll i dina uppgifter</h2>
      <input name="name" placeholder="Namn" value={form.name} onChange={handleChange} className="checkout-form-input" />
      {errors.name && <div className="checkout-form-error">{errors.name}</div>}
      <input name="address" placeholder="Adress" value={form.address} onChange={handleChange} className="checkout-form-input" />
      {errors.address && <div className="checkout-form-error">{errors.address}</div>}
      <input name="zip" placeholder="Postnummer" value={form.zip} onChange={handleChange} className="checkout-form-input" />
      {errors.zip && <div className="checkout-form-error">{errors.zip}</div>}
      <input name="city" placeholder="Ort" value={form.city} onChange={handleChange} className="checkout-form-input" />
      {errors.city && <div className="checkout-form-error">{errors.city}</div>}
      <input name="email" placeholder="E-post" value={form.email} onChange={handleChange} className="checkout-form-input" />
      {errors.email && <div className="checkout-form-error">{errors.email}</div>}
      <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} className="checkout-form-input" />
      {errors.phone && <div className="checkout-form-error">{errors.phone}</div>}
      <button className="checkout-form-btn" type="submit">Slutför beställning</button>
    </form>
  );
}

export default CheckoutForm; 