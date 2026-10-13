import { Link } from 'react-router-dom'
import './Header.css'

function Header({ storeName, cartCount }) {
	return (
		<header className="site-header">
			<Link className="store-brand" to="/" aria-label={`${storeName} home`}>
				<span className="brand-mark" aria-hidden="true">F</span>
				<span>{storeName}</span>
			</Link>
			<nav className="site-nav" aria-label="Main navigation">
				<Link to="/">Home</Link>
				<Link to="/products">Shop scents</Link>
				<Link to="/cart">Cart</Link>
				<Link className="cart-container" to="/cart" aria-label={`Cart, ${cartCount} items`}>
					<span className="cart-icon">🛒</span>
					<span className="cart-count">{cartCount}</span>
				</Link>
			</nav>
		</header>
	)
}

export default Header
