import { useState } from 'react';
import { useParams } from 'react-router';
import ProductGrid from '../components/ProductGrid/ProductGrid';

const categoryDisplayMap = {
  'hörlurar': 'Hörlurar',
  'in-ear': 'In-Ear',
  gaming: 'Gaming',
  accessories: 'Tillbehör'
};
const categoryMap = {
  'hörlurar': 'Headset',
  'in-ear': 'In-Ear',
  gaming: 'gamingheadset',
  accessories: 'accessories'
};

function ProductPage() {
  const { category } = useParams();
  const firestoreCategory = categoryMap[category] || category;
  const displayCategory = categoryDisplayMap[category] || firestoreCategory;
  const [sortBy, setSortBy] = useState('name');

  return (
    <div className="product-page">
      <div className="sort-controls">
        <label htmlFor="sort-select" className="sort-label">Sortera efter:</label>
        <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Namn (A-Ö)</option>
          <option value="price">Pris (lägst först)</option>
          <option value="price-desc">Pris (högst först)</option>
        </select>
      </div>
      <ProductGrid category={firestoreCategory} sortBy={sortBy} />
    </div>
  );
}

export default ProductPage; 