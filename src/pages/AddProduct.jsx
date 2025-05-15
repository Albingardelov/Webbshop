import { useState } from 'react';
import { db } from '../data/database';
import { collection, addDoc } from 'firebase/firestore';
import { productSchema } from '../validation/productSchema';
import '../styles/AddProduct.css';
import { NavLink } from 'react-router';

const CATEGORIES = [
	{ value: 'Headset', label: 'Hörlurar' },
	{ value: 'In-Ear', label: 'In-Ear' },
	{ value: 'gamingheadset', label: 'Gaming' },
	{ value: 'accessories', label: 'Tillbehör' },
];

function AddProduct() {
	const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState('');
	const [showConfirm, setShowConfirm] = useState(false);

	const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		setErrors({});
		setSuccess('');
		const { error } = productSchema.validate(
			{ ...form, price: Number(form.price) },
			{ abortEarly: false }
		);
		if (error) {
			const fieldErrors = {};
			error.details.forEach(err => {
				fieldErrors[err.path[0]] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}
		setShowConfirm(true);
	};

	const handleConfirm = async () => {
		setShowConfirm(false);
		try {
			await addDoc(collection(db, 'Products'), { ...form, price: Number(form.price) });
			setSuccess('Produkten har lagts till!');
			setForm({ name: '', price: '', description: '', image: '', category: '' });
		} catch (err) {
			setErrors({ general: 'Kunde inte spara produkten.' });
		}
	};

	return (
		<form className="add-product-form" onSubmit={handleSubmit} noValidate>
			<NavLink to="/admin" className="confirm-btn addproduct-back-btn">Tillbaka</NavLink>
			<h2 className="addproduct-title">Lägg till produkt</h2>
			<input name="name" placeholder="Namn" value={form.name} onChange={handleChange} />
			{errors.name && <div className="form-error">{errors.name}</div>}
			<input name="price" placeholder="Pris" value={form.price} onChange={handleChange} />
			{errors.price && <div className="form-error">{errors.price}</div>}
			<input name="description" placeholder="Beskrivning" value={form.description} onChange={handleChange} />
			{errors.description && <div className="form-error">{errors.description}</div>}
			<input name="image" placeholder="Bild-URL" value={form.image} onChange={handleChange} />
			{errors.image && <div className="form-error">{errors.image}</div>}
			<select name="category" value={form.category} onChange={handleChange}>
				<option value="">Välj kategori</option>
				{CATEGORIES.map(cat => (
					<option key={cat.value} value={cat.value}>{cat.label}</option>
				))}
			</select>
			{errors.category && <div className="form-error">{errors.category}</div>}
			{showConfirm ? (
				<>
					<button type="button" className="confirm-btn addproduct-confirm-btn" onClick={handleConfirm}>Ja, lägg till</button>
					<button type="button" className="cancel-btn addproduct-cancel-btn" onClick={() => setShowConfirm(false)}>Avbryt</button>
				</>
			) : (
				<button type="submit" className="addproduct-submit-btn">Lägg till produkt</button>
			)}
			{errors.general && <div className="form-error">{errors.general}</div>}
			{success && <div className="form-success">{success}</div>}
		</form>
	);
}

export default AddProduct;