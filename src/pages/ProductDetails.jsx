import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../data/database';
import { doc, getDoc } from 'firebase/firestore';
import { useCartStore } from '../store/cartStore';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError('');
      try {
        const ref = doc(db, 'Products', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setError('Produkten hittades inte.');
        }
      } catch (err) {
        setError('Kunde inte hämta produktdata.');
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading) return <div className="product-details-loading">Laddar produkt...</div>;
  if (error) return <div className="product-details-error">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-details-container">
      <h2 className="product-details-title">{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} className="product-details-img" />}
      <div className="product-details-price">{product.price} kr</div>
      <div className="product-details-desc">{product.description}</div>
      <div className="product-details-category">Kategori: {product.category}</div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        {added ? 'Tillagd!' : 'Lägg i kundvagn'}
      </button>
    </div>
  );
}

export default ProductDetails; 