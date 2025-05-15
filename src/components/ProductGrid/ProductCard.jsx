import '../../styles/ProductGrid.css';
import cartIcon from '../../assets/cartIcon.svg';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

	// Toast
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price} kr</div>
      <div className="product-description">{product.description}</div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        <img src={cartIcon} alt="Kundvagn" className="cart-icon" /> {added ? 'Tillagd!' : 'Lägg i kundvagn'}
      </button>
    </div>
  );
}

export default ProductCard; 