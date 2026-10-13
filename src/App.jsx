import { useEffect, useState } from "react"
import axios from "axios"
const API = "http://localhost:3000"
function App() {
  const [products, setProducts] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  useEffect(() => { axios.get(`${API}/api/products`).then(res => setProducts(res.data)) }, [])
  const login = async () => {
    const res = await axios.post(`${API}/api/auth/login`, { email: "test@test.com", password: "123456" })
    setToken(res.data.token); localStorage.setItem("token", res.data.token); alert("Login sukses!")
  }
  const addToCart = async (id) => {
    await axios.post(`${API}/api/cart`, { productId: id, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } })
    alert("Masuk keranjang!")
  }
  const checkout = async () => {
    const res = await axios.post(`${API}/api/orders/checkout`, {}, { headers: { Authorization: `Bearer ${token}` } })
    alert(`Checkout sukses! Total: ${res.data.total}`)
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between mb-6"><h1 className="text-2xl font-bold">Toko Online</h1>
      <div className="flex gap-2"><button onClick={login} className="bg-black text-white px-4 py-2 rounded">Login Test</button><button onClick={checkout} className="bg-green-600 text-white px-4 py-2 rounded">Checkout</button></div></header>
      <div className="grid grid-cols-3 gap-4">{products.map(p => <div key={p.id} className="bg-white p-4 rounded shadow"><h2 className="font-bold">{p.name}</h2><p>Rp {p.price}</p><button onClick={() => addToCart(p.id)} className="mt-2 w-full bg-blue-600 text-white py-2 rounded">+ Keranjang</button></div>)}</div>
    </div>
  )
}
export default App
