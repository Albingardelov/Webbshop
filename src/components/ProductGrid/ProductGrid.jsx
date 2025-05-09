import { useEffect, useState } from 'react';
import { db } from '../../data/database';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard';
import '../../styles/ProductGrid.css';

function ProductGrid({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = category
        ? allProducts.filter(p => p.category && p.category.trim().toLowerCase() === category.trim().toLowerCase())
        : allProducts;
      setProducts(filtered);
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  if (loading) return <div>Laddar produkter...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid; 