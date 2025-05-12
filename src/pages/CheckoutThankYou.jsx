import { useNavigate } from 'react-router';
import { useCartStore } from '../store/cartStore';
import '../styles/CheckoutThankYou.css';

function CheckoutThankYou() {
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  const handleContinue = () => {
    clearCart();
    navigate('/');
  };
  return (
    <div className="checkout-thankyou-container">
      <h2 className="checkout-thankyou-title">Tack för din beställning!</h2>
      <button className="checkout-thankyou-btn" onClick={handleContinue}>Fortsätt handla</button>
    </div>
  );
}

export default CheckoutThankYou; 