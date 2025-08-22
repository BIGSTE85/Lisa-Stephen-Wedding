export default function Home() {
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SUPABASE ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Stephen & Lisa's Wedding 🎉
      </h1>
      <p style={{ fontSize: "1.2rem" }}>
        Welcome! Please use the QR code on your invitation to RSVP.
      </p>
    </main>
  )
}
