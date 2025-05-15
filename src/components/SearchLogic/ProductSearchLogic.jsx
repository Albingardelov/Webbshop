import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../data/database';

function ProductSearchLogic({ query, children }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lista över kategorier och deras visningsnamn/länkar
  const CATEGORIES = [
    { value: 'hörlurar', label: 'Hörlurar', link: '/category/hörlurar' },
    { value: 'in-ear', label: 'In-Ear', link: '/category/in-ear' },
    { value: 'gaming', label: 'Gaming', link: '/category/gaming' },
    { value: 'accessories', label: 'Tillbehör', link: '/category/accessories' },
    { value: 'tillbehör', label: 'Tillbehör', link: '/category/accessories' },
  ];

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
      // Sök efter kategori-match
      let matchedCategories = CATEGORIES.filter(cat =>
        cat.label.toLowerCase().includes(query.toLowerCase()) ||
        cat.value.toLowerCase().includes(query.toLowerCase())
      );
      // Ta bort dubbletter (baserat på link)
      const seenLinks = new Set();
      matchedCategories = matchedCategories.filter(cat => {
        if (seenLinks.has(cat.link)) return false;
        seenLinks.add(cat.link);
        return true;
      });
      // Lägg till kategori-resultat först
      const categoryResults = matchedCategories.map(cat => ({
        id: `cat-${cat.value}`,
        name: cat.label,
        isCategory: true,
        link: cat.link
      }));
      setResults([...categoryResults, ...filtered]);
      setLoading(false);
    }
    searchProducts();
  }, [query]);

  return children({ results, loading });
}

export default ProductSearchLogic; 