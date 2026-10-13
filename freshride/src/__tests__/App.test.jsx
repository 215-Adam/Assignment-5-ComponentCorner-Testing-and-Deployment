import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const CART_STORAGE_KEY = 'freshride-cart'

const savedCart = [
  { id: 1, name: 'Coastal Cedar', price: 12.99, cartId: 'saved-1' },
  { id: 3, name: 'After Rain', price: 12.99, cartId: 'saved-2' },
]

let localStorageMock

// Parse the cart from the most recent localStorage.setItem call.
function lastSavedCart() {
  const calls = localStorageMock.setItem.mock.calls
  return JSON.parse(calls[calls.length - 1][1])
}

beforeEach(() => {
  localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }
  vi.stubGlobal('localStorage', localStorageMock)
  // jsdom doesn't implement scrollTo, which ScrollToTop calls on every route change.
  vi.stubGlobal('scrollTo', vi.fn())
  vi.spyOn(console, 'log').mockImplementation(() => {})
  window.history.pushState({}, '', '/')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'freshride home' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Make every drive feel like a getaway.' }),
    ).toBeInTheDocument()
  })

  describe('loading the cart from localStorage', () => {
    it('reads the cart from localStorage on startup', () => {
      render(<App />)
      expect(localStorageMock.getItem).toHaveBeenCalledWith(CART_STORAGE_KEY)
    })

    it('starts with an empty cart when nothing is saved', () => {
      render(<App />)
      expect(screen.getByRole('link', { name: 'Cart, 0 items' })).toBeInTheDocument()
    })

    it('restores a saved cart on startup', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart))
      render(<App />)
      expect(screen.getByRole('link', { name: 'Cart, 2 items' })).toBeInTheDocument()
    })

    it('falls back to an empty cart when the saved data is invalid', () => {
      localStorageMock.getItem.mockReturnValue('not valid json')
      render(<App />)
      expect(screen.getByRole('link', { name: 'Cart, 0 items' })).toBeInTheDocument()
    })
  })

  describe('saving the cart to localStorage', () => {
    it('saves the initial cart once the app mounts', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart))
      render(<App />)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        CART_STORAGE_KEY,
        JSON.stringify(savedCart),
      )
    })

    it('saves the updated cart when a product is added', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByRole('link', { name: 'Shop scents' }))
      const [firstAddButton] = screen.getAllByRole('button', { name: 'Add to Cart' })
      await user.click(firstAddButton)

      expect(screen.getByRole('link', { name: 'Cart, 1 items' })).toBeInTheDocument()
      const cart = lastSavedCart()
      expect(cart).toHaveLength(1)
      expect(cart[0]).toMatchObject({ id: 1, name: 'Coastal Cedar', price: 12.99 })
      expect(cart[0].cartId).toEqual(expect.any(String))
    })

    it('lets the same product be added more than once', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByRole('link', { name: 'Shop scents' }))
      const [firstAddButton] = screen.getAllByRole('button', { name: 'Add to Cart' })
      await user.click(firstAddButton)
      await user.click(firstAddButton)

      const cart = lastSavedCart()
      expect(cart).toHaveLength(2)
      expect(cart[0].cartId).not.toBe(cart[1].cartId)
    })

    it('saves the updated cart when an item is removed', async () => {
      const user = userEvent.setup()
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart))
      render(<App />)

      await user.click(screen.getByRole('link', { name: 'Cart, 2 items' }))
      const [firstRemoveButton] = screen.getAllByRole('button', { name: 'Remove' })
      await user.click(firstRemoveButton)

      expect(screen.getByRole('link', { name: 'Cart, 1 items' })).toBeInTheDocument()
      expect(lastSavedCart()).toEqual([savedCart[1]])
    })
  })
})
