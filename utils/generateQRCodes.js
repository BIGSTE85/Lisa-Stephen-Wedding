const QRCode = require('qrcode')
const fs = require('fs')
const path = require('path')
const guests = require('../data/guests.json')

const outputDir = path.join(__dirname, '../qrcodes')

// Create output folder if it doesn't exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

guests.forEach(guest => {
  // Replace with your deployed URL later
  const url = `http://localhost:3001/rsvp/${guest.id}`

  const filename = path.join(outputDir, `${guest.name.replace(/\s+/g, "_")}.png`)

  QRCode.toFile(filename, url, (err) => {
    if (err) throw err
    console.log(`QR code generated for ${guest.name}`)
  })
})
