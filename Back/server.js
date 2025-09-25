const express = require('express');
const qrcode = require('qrcode');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors()); // permite que el frontend consuma la API

// Endpoint que genera QR a partir de un parámetro ?url=
app.get('/qrcode', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required as query parameter ?url=' });
    }

    try {
        const qrCodeDataUrl = await qrcode.toDataURL(url);
        res.json({ url, qrCodeDataUrl });
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).json({ error: 'Error generating QR code' });
    }
});

app.listen(port, () => {
    console.log(`✅ Backend running at http://localhost:${port}`);
});
