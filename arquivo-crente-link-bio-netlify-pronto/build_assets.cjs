const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const QRCode = require('qrcode');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Google Drive Official SVG
const driveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="transparent"/>
  <g transform="translate(32, 32) scale(0.875)">
    <!-- Yellow Left Segment -->
    <path d="M 153.6 48 L 48 230.4 L 129.6 371.2 L 235.2 188.8 Z" fill="#FFBA00"/>
    <!-- Blue Right Segment -->
    <path d="M 358.4 48 L 153.6 48 L 235.2 188.8 L 440 188.8 Z" fill="#2684FC"/>
    <!-- Green Bottom Segment -->
    <path d="M 129.6 371.2 L 211.2 512 L 464 512 L 382.4 371.2 Z" fill="#00AC47"/>
    <!-- Top-Right Shadow Overlap -->
    <path d="M 235.2 188.8 L 153.6 48 L 194.4 118.4 Z" fill="#F4A100" opacity="0.15"/>
    <path d="M 382.4 371.2 L 440 188.8 L 358.4 188.8 Z" fill="#008337" opacity="0.15"/>
  </g>
</svg>`;

// 2. WhatsApp Official SVG
const whatsappSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="110" ry="110" fill="#25D366"/>
  <path d="M 256 90 C 164.87 90 91 163.87 91 255 C 91 289.43 101.56 321.41 119.67 348 L 100 420 L 174.52 400.68 C 199.39 414.28 226.79 422 256 422 C 347.13 422 421 348.13 421 257 C 421 165.87 347.13 90 256 90 Z M 256 394 C 230.56 394 206.51 387.05 185.87 374.96 L 181 372.07 L 137.12 383.53 L 148.81 341.25 L 145.64 336.2 C 132.22 314.86 124.58 289.87 124.58 263.8 C 124.58 191.22 183.5 132.3 256 132.3 C 328.5 132.3 387.42 191.22 387.42 263.8 C 387.42 336.38 328.5 394 256 394 Z" fill="#FFFFFF"/>
  <path d="M 205.5 188 C 202.1 180.5 198.5 180.3 195.3 180.2 C 192.7 180.1 189.7 180.1 186.7 180.1 C 183.7 180.1 178.8 181.2 174.7 185.7 C 170.6 190.2 159 201 159 223 C 159 245 175 266.3 177.3 269.3 C 179.5 272.3 208.2 316.5 252.2 335.5 C 288.8 351.3 296.3 348.2 304.3 347.4 C 312.3 346.6 330 336.9 333.7 326.4 C 337.4 315.9 337.4 306.9 336.3 305 C 335.2 303.1 332.2 302 327.7 299.7 C 323.2 297.5 301.1 286.6 297 285.1 C 292.9 283.6 289.9 282.8 286.9 287.3 C 283.9 291.8 275.3 302 272.7 305 C 270.1 308 267.5 308.4 263 306.1 C 258.5 303.8 244 299.1 226.8 283.7 C 213.4 271.7 204.4 256.9 201.8 252.4 C 199.2 247.9 201.5 245.5 203.8 243.3 C 205.8 241.3 208.2 238.1 210.5 235.4 C 212.8 222.7 213.5 220.5 215 217.5 C 216.5 214.5 215.8 211.9 214.7 209.6 C 213.5 207.3 209 195.8 205.5 188 Z" fill="#FFFFFF"/>
</svg>`;

// Helper to convert SVG string to PNG
function svgToPng(svgStr, outPath) {
  const tmpSvg = outPath + '.tmp.svg';
  fs.writeFileSync(tmpSvg, svgStr);
  execSync(`ffmpeg -y -i "${tmpSvg}" "${outPath}"`);
  fs.unlinkSync(tmpSvg);
  console.log(`Generated ${outPath}`);
}

svgToPng(driveSvg, path.join(publicDir, '02-google-drive.png'));
svgToPng(whatsappSvg, path.join(publicDir, '03-whatsapp.png'));

// Function to generate BR Code (EMV Pix Payload)
function generatePixPayload(key, name, city) {
  function formatField(id, val) {
    const len = val.length.toString().padStart(2, '0');
    return id + len + val;
  }

  // Merchant Account Information (ID 26)
  const gui = formatField('00', 'br.gov.bcb.pix');
  const pixKey = formatField('01', key);
  const merchantAccount = formatField('26', gui + pixKey);

  const payloadFormat = formatField('00', '01');
  const initMethod = formatField('01', '12'); // static QR
  const mcc = formatField('52', '0000');
  const currency = formatField('53', '986');
  const country = formatField('58', 'BR');
  const merchantName = formatField('59', name.substring(0, 25).toUpperCase());
  const merchantCity = formatField('60', city.substring(0, 15).toUpperCase());
  const additionalData = formatField('62', formatField('05', '***'));

  const rawPayload = payloadFormat + initMethod + merchantAccount + mcc + currency + country + merchantName + merchantCity + additionalData + '6304';

  // CRC16 Calculation (CCITT-FALSE)
  let crc = 0xFFFF;
  for (let i = 0; i < rawPayload.length; i++) {
    crc ^= (rawPayload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
  return rawPayload + crcHex;
}

const pixPayload = generatePixPayload('arquivocrente@gmail.com', 'EBERTH A DOS S SILVA', 'BRASILIA');
console.log('Generated Pix Payload:', pixPayload);

QRCode.toFile(
  path.join(publicDir, '04-pix-qr.png'),
  pixPayload,
  {
    errorCorrectionLevel: 'M',
    type: 'png',
    width: 440,
    margin: 3, // Preserve white margin
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  },
  function (err) {
    if (err) throw err;
    console.log('Generated public/04-pix-qr.png successfully!');
  }
);
