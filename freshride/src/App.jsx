import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'

const CART_STORAGE_KEY = 'freshride-cart'

const products = [
  {
    id: 1,
    name: 'Coastal Cedar',
    price: 12.99,
    image: 'https://placehold.co/600x400/dce9df/193c30?text=Coastal+Cedar',
    description: 'Warm cedarwood meets a clean ocean breeze. A calm start to every drive.',
  },
  {
    id: 2,
    name: 'Citrus Run',
    price: 14.99,
    image: 'https://placehold.co/600x400/f4dfc8/533a20?text=Citrus+Run',
    description: 'Bright bergamot and sweet orange bring a little lift to the daily commute.',
  },
  {
    id: 3,
    name: 'After Rain',
    price: 12.99,
    image: 'https://placehold.co/600x400/dde5ed/283d50?text=After+Rain',
    description: 'Fresh green leaves, cool air, and the quiet feeling of a road after rain.',
  },
  {
    id: 4,
    name: 'Vanilla Cruise',
    price: 13.99,
    image: 'https://placehold.co/600x400/f3ead8/5a4526?text=Vanilla+Cruise',
    description: 'Soft vanilla bean and a touch of amber for slow, easy weekend drives.',
  },
  {
    id: 5,
    name: 'Midnight Pine',
    price: 15.99,
    image: 'https://placehold.co/600x400/d3ded6/14392e?text=Midnight+Pine',
    description: 'Deep pine needles and cool mountain air for late-night highway miles.',
  },
  {
    id: 6,
    name: 'Lavender Lane',
    price: 13.99,
    image: 'https://placehold.co/600x400/e6e0ef/3f3456?text=Lavender+Lane',
    description: 'Calming lavender and light eucalyptus to take the edge off rush hour.',
  },
]

// Load the saved cart from localStorage, falling back to an empty cart if
// nothing is saved yet or the saved data can't be read.
function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

// Jump back to the top of the page whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [cart, setCart] = useState(loadCart)

  // Save the cart every time it changes so it survives refreshes and closed tabs.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  function addToCart(product) {
    // Each cart entry gets its own cartId so the same scent can be added more
    // than once and still be removed one at a time.
    const cartItem = { ...product, cartId: crypto.randomUUID() }
    setCart([...cart, cartItem])
    console.log('Added to cart:', cartItem)
  }

  function removeFromCart(cartId) {
    setCart(cart.filter((item) => item.cartId !== cartId))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header storeName="freshride" cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={<ProductsPage products={products} addToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetailPage products={products} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage products={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
        <Footer
          storeName="freshride"
          email="hello@freshride.com"
          location="Made for the open road."
        />
      </div>
    </BrowserRouter>
  )
}

export default App
