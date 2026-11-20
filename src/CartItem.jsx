import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const unitCost = item => Number(item.cost.replace('$', ''));
const lineTotal = item => unitCost(item) * item.quantity;

export default function CartItem() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const total = items.reduce((sum, item) => sum + lineTotal(item), 0);

  function changeQuantity(item, difference) {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + difference }));
  }

  return (
    <main className="shop-content cart-content" id="cart">
      <h1>Shopping cart</h1>
      {items.length === 0 && <p>Your cart is empty.</p>}
      <div className="cart-items">
        {items.map(item => (
          <article className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>{dollars.format(unitCost(item))} each</p>
              <div className="quantity-controls" aria-label={`${item.name} quantity`}>
                <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item, -1)}>−</button>
                <span>{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item, 1)}>+</button>
              </div>
            </div>
            <div className="cart-line-total">
              <strong>{dollars.format(lineTotal(item))}</strong>
              <button type="button" className="remove-button" aria-label={`Delete ${item.name}`} onClick={() => dispatch(removeItem(item.name))}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <p aria-live="polite">Total Cart Amount <strong>{dollars.format(total)}</strong></p>
        <div className="summary-actions">
          <a href="#plants" className="secondary-link">Continue Shopping</a>
          <button type="button" disabled={!items.length} onClick={() => setCheckoutMessage('Checkout is coming soon.')}>Checkout</button>
        </div>
        <div role="status">{items.length > 0 && checkoutMessage}</div>
      </div>
    </main>
  );
}
