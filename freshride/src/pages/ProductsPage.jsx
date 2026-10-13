import ProductCard from '../components/ProductCard'

function ProductsPage({ products, addToCart }) {
  return (
    <main className="shop-section">
      <div className="section-heading">
        <p className="eyebrow">Small-batch car fragrance</p>
        <h2>Pick your next favorite</h2>
        <p>Six considered scents. A better-feeling ride.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
