import './CartItem.css'

function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <div>
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <button className="cart-item-remove" type="button" onClick={() => onRemove(item.cartId)}>
        Remove
      </button>
    </li>
  )
}

export default CartItem
