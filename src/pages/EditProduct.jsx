import { useState, useEffect } from 'react';
import { db } from '../data/database';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { NavLink } from 'react-router';
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

	return (
		<div className="edit-product-outer">
			<div className="edit-product-box">
				<NavLink to="/admin" className="confirm-btn">Tillbaka</NavLink>
				<h2>Redigera produkt</h2>
				<div style={{ margin: '1rem 0' }}>
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
								<button className="edit-btn">Redigera</button>
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