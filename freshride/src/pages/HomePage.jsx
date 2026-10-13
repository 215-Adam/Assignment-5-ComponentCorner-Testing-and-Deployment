import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import './HomePage.css'

const reasons = [
  {
    icon: '🌲',
    title: 'Scents that last the miles',
    text: 'Each vent clip is slow-release, so one freshener keeps your car smelling good for up to 45 days.',
  },
  {
    icon: '🌿',
    title: 'Clean, considered ingredients',
    text: 'Small-batch fragrance oils with no harsh chemical punch. Fresh, never overpowering.',
  },
  {
    icon: '🚗',
    title: 'Clips on in seconds',
    text: 'Fits nearly every vent. Twist to turn the scent up on a long drive or down on a short one.',
  },
]

function HomePage() {
  return (
    <>
      <Hero
        title="Make every drive feel like a getaway."
        subtitle="Thoughtful scents for the miles you make every day."
        ctaText="Find your fresh"
      />
      <section className="home-intro">
        <div className="section-heading">
          <p className="eyebrow">Why ride with us?</p>
          <h2>A better-smelling commute, made simple</h2>
          <p>
            freshride started with one long road trip and a car that smelled like old fries. We make
            car air fresheners we actually want to breathe in.
          </p>
        </div>
        <div className="reason-grid">
          {reasons.map((reason) => (
            <article key={reason.title} className="reason-card">
              <span className="reason-icon" aria-hidden="true">
                {reason.icon}
              </span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
        <div className="home-cta">
          <p>Six scents. Free shipping on orders over $35.</p>
          <Link className="home-cta-link" to="/products">
            Shop all scents <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
