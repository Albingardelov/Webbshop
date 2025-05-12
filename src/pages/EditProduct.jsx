import { useState, useEffect } from 'react';
import { db } from '../data/database';
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NavLink, useNavigate, useParams } from 'react-router';
import '../styles/AddProduct.css';

const CATEGORIES = [
	{ value: 'Headset', label: 'Hörlurar' },
	{ value: 'In-Ear', label: 'In-Ear' },
	{ value: 'gamingheadset', label: 'Gaming' },
	{ value: 'accessories', label: 'Tillbehör' },
];

function EditProduct() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const params = useParams();
	const productId = params.id;

	// Hämta produkt för redigering om id finns
	useEffect(() => {
		if (!productId) return;
		async function fetchProduct() {
			const ref = doc(db, 'Products', productId);
			const snap = await getDoc(ref);
			if (snap.exists()) {
				const data = snap.data();
				setEditProduct({ id: snap.id, ...data });
				setForm({
					name: data.name || '',
					price: data.price || '',
					description: data.description || '',
					image: data.image || '',
					category: data.category || ''
				});
			}
		}
		fetchProduct();
	}, [productId]);

	// Hämta produkter för kategori
	useEffect(() => {
		if (!selectedCategory) {
			setProducts([]);
			return;
		}
		setLoading(true);
		async function fetchProducts() {
			const querySnapshot = await getDocs(collection(db, 'Products'));
			const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			const filtered = allProducts.filter(p => p.category && p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
			setProducts(filtered);
			setLoading(false);
		}
		fetchProducts();
	}, [selectedCategory]);

	const handleDelete = async (id) => {
		setDeleteLoading(true);
		await deleteDoc(doc(db, 'Products', id));
		setProducts(products.filter(p => p.id !== id));
		setDeleteId(null);
		setDeleteLoading(false);
	};

	const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });

	const handleUpdate = async e => {
		e.preventDefault();
		setSaving(true);
		setSuccess('');
		try {
			await updateDoc(doc(db, 'Products', productId), {
				...form,
				price: Number(form.price)
			});
			setSuccess('Produkten har uppdaterats!');
		} catch (err) {
			setErrors({ general: 'Kunde inte spara ändringarna.' });
		}
		setSaving(false);
	};

	if (productId && editProduct) {
		return (
			<form className="add-product-form" onSubmit={handleUpdate}>
				<NavLink to="/admin/edit" className="confirm-btn">Tillbaka</NavLink>
				<h2 className="edit-title">Redigera produkt</h2>
				<input name="name" placeholder="Namn" value={form.name} onChange={handleFormChange} required />
				<input name="price" placeholder="Pris" value={form.price} onChange={handleFormChange} required />
				<input name="description" placeholder="Beskrivning" value={form.description} onChange={handleFormChange} required />
				<input name="image" placeholder="Bild-URL" value={form.image} onChange={handleFormChange} required />
				<select name="category" value={form.category} onChange={handleFormChange} required>
					<option value="">Välj kategori</option>
					{CATEGORIES.map(cat => (
						<option key={cat.value} value={cat.value}>{cat.label}</option>
					))}
				</select>
				<button type="submit" disabled={saving}>Spara ändringar</button>
				{errors.general && <div className="form-error">{errors.general}</div>}
				{success && <div className="form-success">{success}</div>}
			</form>
		);
	}

	// Standardvy: välj kategori och visa produkter
	return (
		<div className="edit-product-outer">
			<div className="edit-product-box">
				<NavLink to="/admin" className="confirm-btn">Tillbaka</NavLink>
				<h2 className="edit-title">Redigera produkt</h2>
				<div className="edit-category-select">
					<select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
						<option value="">Välj kategori</option>
						{CATEGORIES.map(cat => (
							<option key={cat.value} value={cat.value}>{cat.label}</option>
						))}
					</select>
				</div>
				{loading && <div>Laddar produkter...</div>}
				{selectedCategory && (
					<div className="product-grid">
						{products.map(product => (
							<div className="product-card" key={product.id}>
								{product.image && <img src={product.image} alt={product.name} className="product-image" />}
								<div className="product-name">{product.name}</div>
								<div className="product-price">{product.price} kr</div>
								<div className="product-description">{product.description}</div>
								<button className="edit-btn" onClick={() => navigate(`/admin/edit/${product.id}`)}>Redigera</button>
								<button className="delete-btn" onClick={() => setDeleteId(product.id)}>Ta bort</button>
								{deleteId === product.id && (
									<div className="delete-confirm">
										<div>Vill du verkligen ta bort produkten?</div>
										<button onClick={() => handleDelete(product.id)} disabled={deleteLoading}>Ja</button>
										<button onClick={() => setDeleteId(null)} disabled={deleteLoading}>Nej</button>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default EditProduct;