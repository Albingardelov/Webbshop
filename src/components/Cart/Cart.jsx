import '../../styles/Cart.css';
import trashIcon from '../../assets/trashCan.svg';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router';

function Cart() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cartItems.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      {/* Produktkort */}
      {cartItems.length === 0 ? (
        <div className="cart-empty">Din kundvagn är tom.</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-product-card" key={item.id}>
              <img className="cart-product-image" src={item.image} alt={item.name} />
              <div className="cart-product-info">
                <div className="cart-product-name"><b>{item.name}</b></div>
                <div className="cart-product-model">{item.model}</div>
                <div className="cart-quantity-controls">
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="cart-product-price">{item.price} kr</div>
            </div>
          ))}

          {/* Totalsumma */}
          <div className="cart-summary-row">
            <span>Totalt: {cartItems.reduce((sum, item) => sum + item.quantity, 0)} produkt{cartItems.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 'er' : ''}</span>
            <span>{total} kr</span>
          </div>

          {/* Töm kundvagnen */}
          <button className="cart-clear-btn" onClick={clearCart}>
            <img src={trashIcon} alt="Töm kundvagnen" className="cart-trash-icon" /> Töm kundvagnen
          </button>

          {/* Kassasammanställning */}
          <div className="cart-checkout-box">
            <div className="cart-checkout-row">
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} produkt{cartItems.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 'er' : ''}</span>
              <span>{total} kr</span>
            </div>
            <div className="cart-checkout-row">
              <span>Frakt</span>
              <span>0 kr</span>
            </div>
            <hr className="cart-divider" />
            <div className="cart-checkout-row cart-total-row">
              <span>Totalt</span>
              <span>{total} kr</span>
            </div>
            <hr className="cart-divider" />
            <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>Gå till kassan</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 