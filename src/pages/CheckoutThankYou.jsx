import { useNavigate } from 'react-router';
import '../styles/Admin.css';

function CheckoutThankYou() {
  const navigate = useNavigate();
  return (
    <div className="admin-menu" style={{ maxWidth: 400, margin: '3rem auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Tack för din beställning!</h2>
      <button className="admin-btn" onClick={() => navigate('/')}>Fortsätt handla</button>
    </div>
  );
}

export default CheckoutThankYou; 