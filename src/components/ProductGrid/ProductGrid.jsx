import { useEffect, useState } from 'react';
import { db } from '../../data/database';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard';
import '../../styles/ProductGrid.css';

function ProductGrid({ category, sortBy = 'name' }) {
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

  // Sort products based on sortBy prop
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      return (Number(a.price) || 0) - (Number(b.price) || 0);
    } else if (sortBy === 'price-desc') {
      return (Number(b.price) || 0) - (Number(a.price) || 0);
    } else {
      // Default: sort by name (A-Ö)
      return (a.name || '').localeCompare(b.name || '', 'sv');
    }
  });

  if (loading) return <div>Laddar produkter...</div>;

  return (
    <div className="product-grid">
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid; 