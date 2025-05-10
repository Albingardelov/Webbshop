import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../data/database';

function ProductSearchLogic({ query, children }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    async function searchProducts() {
      const snapshot = await getDocs(collection(db, 'Products'));
      const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = allProducts.filter(
        p =>
          (p.name && p.name.toLowerCase().includes(query.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);
    }
    searchProducts();
  }, [query]);

  return children({ results, loading });
}

export default ProductSearchLogic; 