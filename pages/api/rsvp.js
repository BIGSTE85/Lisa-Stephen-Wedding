import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { guestId, status } = req.body

    // Path to a file where we’ll save responses
    const filePath = path.join(process.cwd(), 'data', 'responses.json')

    // Read existing responses
    let responses = []
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath)
      responses = JSON.parse(data)
    }

    // Add/update response
    const existingIndex = responses.findIndex(r => r.guestId === guestId)
    if (existingIndex >= 0) {
      responses[existingIndex].status = status
    } else {
      responses.push({ guestId, status })
    }

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(responses, null, 2))

    console.log(`Guest ${guestId} responded: ${status}`)
    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: "Method not allowed" })
}
