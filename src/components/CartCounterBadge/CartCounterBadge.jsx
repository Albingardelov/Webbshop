import '../../styles/CartCounterBadge.css';
import cartIcon from '../../assets/cartIcon.svg';
import { useCartStore } from '../../store/cartStore';

function CartCounterBadge() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-counter-badge-wrapper">
      <img src={cartIcon} alt="Kundvagnsikon" className="cart-counter-badge-icon" />
      {count > 0 && (
        <span className="cart-counter-badge">{count}</span>
      )}
    </div>
  );
}

export default CartCounterBadge; 