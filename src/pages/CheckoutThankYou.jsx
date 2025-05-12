import { useNavigate } from 'react-router';
import '../styles/CheckoutThankYou.css';

function CheckoutThankYou() {
  const navigate = useNavigate();
  return (
    <div className="checkout-thankyou-container">
      <h2 className="checkout-thankyou-title">Tack för din beställning!</h2>
      <button className="checkout-thankyou-btn" onClick={() => navigate('/')}>Fortsätt handla</button>
    </div>
  );
}

export default CheckoutThankYou; 