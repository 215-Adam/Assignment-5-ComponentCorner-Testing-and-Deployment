import { Link, useParams } from 'react-router-dom'
import './ProductDetailPage.css'

function ProductDetailPage({ products, addToCart }) {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <main className="shop-section">
        <div className="section-heading">
          <h2>Scent not found</h2>
          <p>We couldn't find that air freshener.</p>
        </div>
        <Link className="detail-back" to="/products">&larr; Back to all scents</Link>
      </main>
    )
  }

  return (
    <main className="shop-section">
      <Link className="detail-back" to="/products">&larr; Back to all scents</Link>
      <div className="detail-layout">
        <img className="detail-image" src={product.image} alt={`${product.name} car air freshener`} />
        <div>
          <p className="product-type">Vent clip fragrance</p>
          <h2 className="detail-name">{product.name}</h2>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <ul className="detail-facts">
            <li>Lasts up to 45 days</li>
            <li>Adjustable scent strength</li>
            <li>Fits most car vents</li>
          </ul>
          <button className="add-to-cart" type="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductDetailPage
