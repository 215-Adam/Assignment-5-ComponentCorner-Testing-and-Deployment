import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../CartItem'

const item = {
  id: 2,
  name: 'Citrus Run',
  price: 14.99,
  cartId: 'cart-item-123',
}

function renderCartItem(onRemove = vi.fn()) {
  render(
    <ul>
      <CartItem item={item} onRemove={onRemove} />
    </ul>,
  )
  return { onRemove }
}

describe('CartItem', () => {
  it('renders without crashing', () => {
    renderCartItem()
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('displays the item name', () => {
    renderCartItem()
    expect(screen.getByText('Citrus Run')).toBeInTheDocument()
  })

  it('displays the item price', () => {
    renderCartItem()
    expect(screen.getByText('$14.99')).toBeInTheDocument()
  })

  it('contains a remove button', () => {
    renderCartItem()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('calls the remove function with the item cartId when Remove is clicked', async () => {
    const user = userEvent.setup()
    const { onRemove } = renderCartItem()

    await user.click(screen.getByRole('button', { name: 'Remove' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith('cart-item-123')
  })

  it('does not call the remove function before the button is clicked', () => {
    const { onRemove } = renderCartItem()
    expect(onRemove).not.toHaveBeenCalled()
  })
})
