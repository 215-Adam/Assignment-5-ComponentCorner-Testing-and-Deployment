import { Link } from 'react-router-dom'
import './Hero.css'

function Hero({ title, subtitle, ctaText }) {
	return (
		<section className="hero">
			<div className="hero-content">
				<p className="hero-kicker">A little more fresh, a lot more you</p>
				<h1>{title}</h1>
				<p className="hero-subtitle">{subtitle}</p>
				<Link className="hero-cta" to="/products">
					{ctaText}
					<span aria-hidden="true">&rarr;</span>
				</Link>
			</div>
			<span className="hero-note">SCENT FOR THE SCENIC ROUTE</span>
		</section>
	)
}

export default Hero
