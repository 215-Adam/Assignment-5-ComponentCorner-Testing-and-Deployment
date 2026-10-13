import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = renderHomePage()
    expect(container).not.toBeEmptyDOMElement()
  })

  it('displays the hero heading and subtitle', () => {
    renderHomePage()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Make every drive feel like a getaway.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Thoughtful scents for the miles you make every day.'),
    ).toBeInTheDocument()
  })

  it('displays the intro section and all three reasons', () => {
    renderHomePage()
    expect(screen.getByText('Why ride with us?')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'A better-smelling commute, made simple' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Scents that last the miles' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Clean, considered ingredients' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clips on in seconds' })).toBeInTheDocument()
  })

  it('links to the products page', () => {
    renderHomePage()
    expect(screen.getByRole('link', { name: /find your fresh/i })).toHaveAttribute(
      'href',
      '/products',
    )
    expect(screen.getByRole('link', { name: /shop all scents/i })).toHaveAttribute(
      'href',
      '/products',
    )
  })
})
