import { useMemo, useState } from "react"
import About from "./components/About"
import CartDrawer from "./components/CartDrawer"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Menu from "./components/Menu"
import Navbar from "./components/Navbar"
import Offers from "./components/Offers"
import Testimonials from "./components/Testimonials"

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])

  const addItem = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...current, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id))

  const changeQty = (id, qty) => {
    setCart((current) => {
      if (qty < 1) return current.filter((item) => item.id !== id)
      return current.map((item) => (item.id === id ? { ...item, qty } : item))
    })
  }

  return (
    <div className="min-h-screen w-full bg-bg text-ink">
      <Navbar count={count} onOpenCart={() => setCartOpen(true)} />
      <main className="w-full">
        <Hero />
        <Menu onAdd={addItem} />
        <Offers onAdd={addItem} />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onQty={changeQty}
        onPaid={() => setCart([])}
      />
    </div>
  )
}
