import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../data/database';
import { doc, getDoc } from 'firebase/firestore';
import { useCartStore } from '../store/cartStore';

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

  if (loading) return <div style={{ padding: '2rem' }}>Laddar produkt...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  if (!product) return null;

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2>{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: 300, borderRadius: 8, marginBottom: 16 }} />}
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: '1rem 0' }}>{product.price} kr</div>
      <div style={{ marginBottom: '1rem' }}>{product.description}</div>
      <div style={{ color: '#555', marginBottom: '1.5rem' }}>Kategori: {product.category}</div>
      <button className="add-to-cart-btn" onClick={handleAddToCart} style={{ width: '100%' }}>
        {added ? 'Tillagd!' : 'Lägg i kundvagn'}
      </button>
    </div>
  );
}

export default ProductDetails; 