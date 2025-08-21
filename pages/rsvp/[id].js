import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import guests from '../../data/guests.json'

export default function RSVPPage() {
  const router = useRouter()
  const { id } = router.query
  const [guest, setGuest] = useState(null)
  const [status, setStatus] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (id) {
      const found = guests.find(g => g.id === id)
      setGuest(found || null)
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestId: id, status })
    })
    setSubmitted(true)
  }

  if (!guest) return <h2>Loading guest details...</h2>
  if (submitted) return <h2>Thanks {guest.name}! Your RSVP has been recorded ✅</h2>

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Hi {guest.name}!</h1>
      <p style={{ marginBottom: "1rem" }}>Will you be joining us?</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button type="button" onClick={() => setStatus("Yes")}
          style={{ padding: "0.5rem", backgroundColor: status==="Yes" ? "green" : "#ccc", color: "white", borderRadius: "5px" }}>
          Accept
        </button>
        <button type="button" onClick={() => setStatus("No")}
          style={{ padding: "0.5rem", backgroundColor: status==="No" ? "red" : "#ccc", color: "white", borderRadius: "5px" }}>
          Decline
        </button>
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "blue", color: "white", borderRadius: "5px" }}>Submit</button>
      </form>
    </div>
  )
}
