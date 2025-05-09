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
  gaming: 'Gaminghörlurar',
  accessories: 'Tillbehör'
};

function ProductPage() {
  const { category } = useParams();
  const firestoreCategory = categoryMap[category] || category;
  const displayCategory = categoryDisplayMap[category] || firestoreCategory;

  return (
    <div className="product-page">
      <ProductGrid category={firestoreCategory} />
    </div>
  );
}

export default ProductPage; 