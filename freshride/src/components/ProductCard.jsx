import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const { id, name, price, image, description } = product

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return (
    <article className="product-card">
      <Link to={`/products/${id}`}>
        <img className="product-image" src={image} alt={`${name} car air freshener`} />
      </Link>
      <div className="product-details">
        <p className="product-type">Vent clip fragrance</p>
        <h3 className="product-name">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <p className="product-price">{formattedPrice}</p>
          <button className="add-to-cart" type="button" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
