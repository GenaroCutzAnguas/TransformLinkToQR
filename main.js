const express = require('express');
const qrcode = require('qrcode');
const open = require('open');

const app = express();
const port = 4000;

const url = process.argv[2];

if (!url) {
    console.error('Error: Please provide a URL as a command-line argument. For example: node main.js https://www.google.com');
    process.exit(1);
}

app.get('/', async (req, res) => {
    try {
        const qrCodeDataUrl = await qrcode.toDataURL(url);
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>QR Code Generator</title>
                <style>
                    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
                    img { border: 2px solid #ccc; padding: 10px; }
                </style>
            </head>
            <body>
                <h1>QR Code for:</h1>
                <p>${url}</p>
                <img src="${qrCodeDataUrl}" alt="QR Code">
            </body>
            </html>
        `);
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('An error occurred while generating the QR code.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    open.default(`http://localhost:${port}`);
});