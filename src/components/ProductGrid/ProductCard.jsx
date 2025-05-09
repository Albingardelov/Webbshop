import '../../styles/ProductGrid.css';
import cartIcon from '../../assets/cartIcon.svg';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price} kr</div>
      <div className="product-description">{product.description}</div>
      <button className="add-to-cart-btn">
        <img src={cartIcon} alt="Kundvagn" className="cart-icon" /> Lägg i kundvagn
      </button>
    </div>
  );
}

export default ProductCard; 