import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'

const product = {
  id: 1,
  name: 'Coastal Cedar',
  price: 12.99,
  image: 'https://example.com/coastal-cedar.png',
  description: 'Warm cedarwood meets a clean ocean breeze.',
}

function renderProductCard(onAddToCart = vi.fn()) {
  render(
    <MemoryRouter>
      <ProductCard product={product} onAddToCart={onAddToCart} />
    </MemoryRouter>,
  )
  return { onAddToCart }
}

describe('ProductCard', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      renderProductCard()
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('displays the product name from props', () => {
      renderProductCard()
      expect(screen.getByRole('heading', { name: 'Coastal Cedar' })).toBeInTheDocument()
    })

    it('displays the formatted price from props', () => {
      renderProductCard()
      expect(screen.getByText('$12.99')).toBeInTheDocument()
    })

    it('displays the description and product image', () => {
      renderProductCard()
      expect(screen.getByText(product.description)).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'Coastal Cedar car air freshener' })).toHaveAttribute(
        'src',
        product.image,
      )
    })

    it('contains an "Add to Cart" button', () => {
      renderProductCard()
      expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls the addToCart function when "Add to Cart" is clicked', async () => {
      const user = userEvent.setup()
      const { onAddToCart } = renderProductCard()

      await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

      expect(onAddToCart).toHaveBeenCalledTimes(1)
      expect(onAddToCart).toHaveBeenCalledWith(product)
    })

    it('calls addToCart once per click', async () => {
      const user = userEvent.setup()
      const { onAddToCart } = renderProductCard()
      const button = screen.getByRole('button', { name: 'Add to Cart' })

      await user.click(button)
      await user.click(button)

      expect(onAddToCart).toHaveBeenCalledTimes(2)
    })

    it('does not call addToCart before the button is clicked', () => {
      const { onAddToCart } = renderProductCard()
      expect(onAddToCart).not.toHaveBeenCalled()
    })
  })
})
