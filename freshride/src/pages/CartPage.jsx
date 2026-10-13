import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'

function CartPage({ products, removeFromCart }) {
  const cartTotal = products.reduce((total, item) => total + item.price, 0)

  return (
    <main className="shop-section">
      <div className="section-heading">
        <p className="eyebrow">Ready for the road</p>
        <h2>Your cart</h2>
      </div>
      {products.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. <Link to="/products">Pick a scent</Link> to get started.
        </p>
      ) : (
        <div className="cart-panel">
          <ul className="cart-list">
            {products.map((item) => (
              <CartItem key={item.cartId} item={item} onRemove={removeFromCart} />
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </main>
  )
}

export default CartPage
