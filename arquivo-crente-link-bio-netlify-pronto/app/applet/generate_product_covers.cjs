const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  '/app/applet/public/products',
  '/public/products',
  '/app/applet/public',
  '/app/applet/src/assets',
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Helper to convert SVG string to PNG file using ffmpeg
function createCover(svgContent, filename) {
  const tmpSvg = path.join('/tmp', filename + '.svg');
  const targetPath = path.join('/app/applet/public/products', filename);

  fs.writeFileSync(tmpSvg, svgContent);
  execSync(`ffmpeg -y -i "${tmpSvg}" "${targetPath}"`);
  fs.unlinkSync(tmpSvg);

  // Copy to all alternate locations
  const altLocations = [
    `/public/products/${filename}`,
    `/app/applet/public/${filename}`,
    `/public/${filename}`,
    `/${filename}`,
    `/app/applet/src/assets/${filename}`
  ];

  altLocations.forEach(loc => {
    try {
      const parent = path.dirname(loc);
      if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
      fs.copyFileSync(targetPath, loc);
    } catch (e) {
      // ignore root copy permission errors if any
    }
  });

  const stat = fs.statSync(targetPath);
  console.log(`Generated ${filename} - Size: ${(stat.size / 1024).toFixed(1)} KB`);
}

// -------------------------------------------------------------
// COVER 05: 21 Dias com Deus em Família
// -------------------------------------------------------------
const svg05 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bg05" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FAF5EE"/>
      <stop offset="50%" stop-color="#F3EAD8"/>
      <stop offset="100%" stop-color="#EBE0CC"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#AA7C11"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="800" fill="url(#bg05)"/>
  
  <!-- Outer Gold Frame -->
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#C89B2C" stroke-width="2.5" rx="16"/>
  <rect x="26" y="26" width="548" height="748" fill="none" stroke="#1D3C28" stroke-width="1" rx="12"/>

  <!-- Botanical Leaf Ornaments (Top Corners) -->
  <g fill="#A3B18A" opacity="0.6">
    <path d="M 40 40 Q 70 30 90 60 Q 60 70 40 40 Z"/>
    <path d="M 50 65 Q 80 70 85 100 Q 60 95 50 65 Z"/>
    <path d="M 560 40 Q 530 30 510 60 Q 540 70 560 40 Z"/>
    <path d="M 550 65 Q 520 70 515 100 Q 540 95 550 65 Z"/>
  </g>

  <!-- Top Logo Section -->
  <g transform="translate(300, 65)">
    <rect x="-60" y="-18" width="120" height="28" rx="14" fill="#1D3C28" filter="url(#shadow)"/>
    <path d="M 0 -10 L -6 -2 L -2 -2 L -2 6 L 2 6 L 2 -2 L 6 -2 Z" fill="#D4AF37"/>
    <text x="0" y="24" font-family="'Georgia', serif" font-size="14" font-weight="bold" fill="#1D3C28" text-anchor="middle" letter-spacing="2">ARQUIVO CRENTE</text>
    <path d="M -15 30 Q 0 36 15 30" fill="none" stroke="#C89B2C" stroke-width="1.5"/>
  </g>

  <!-- Main Title -->
  <text x="300" y="165" font-family="'Georgia', 'Times New Roman', serif" font-size="64" font-weight="900" fill="#1D3C28" text-anchor="middle" letter-spacing="3">21 DIAS</text>
  <text x="300" y="215" font-family="'Brush Script MT', 'Palatino', serif" font-size="52" font-style="italic" fill="#C89B2C" text-anchor="middle">com Deus</text>
  <text x="300" y="270" font-family="'Georgia', 'Times New Roman', serif" font-size="54" font-weight="900" fill="#1D3C28" text-anchor="middle" letter-spacing="4">EM FAMÍLIA</text>

  <!-- Subtitle Pill Badge -->
  <g transform="translate(300, 315)">
    <rect x="-210" y="-18" width="420" height="36" rx="18" fill="#1D3C28" stroke="#C89B2C" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="0" y="5" font-family="'Georgia', serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">UM DEVOCIONAL PARA FORTALECER A FÉ DENTRO DO SEU LAR</text>
  </g>

  <!-- Center Family Illustration Graphic -->
  <g transform="translate(300, 500)">
    <!-- Soft Glow Base -->
    <ellipse cx="0" cy="80" rx="210" ry="40" fill="#C89B2C" opacity="0.15"/>
    <rect x="-200" y="-140" width="400" height="220" rx="20" fill="#FFFFFF" opacity="0.85" stroke="#C89B2C" stroke-width="1.5" filter="url(#shadow)"/>
    
    <!-- Couch / Living Room Silhouette & Family Reading Bible -->
    <!-- Cozy Couch -->
    <path d="M -180 30 C -180 -20 -150 -50 -120 -50 L 120 -50 C 150 -50 180 -20 180 30 L 180 70 L -180 70 Z" fill="#E8D8C8" stroke="#C89B2C" stroke-width="1"/>
    
    <!-- Parents & Children Reading Bible Illustration Icons -->
    <!-- Father -->
    <circle cx="-70" cy="-70" r="22" fill="#5C4033"/>
    <path d="M -95 -20 C -95 -50 -45 -50 -45 -20 Z" fill="#2C4C38"/>
    
    <!-- Mother -->
    <circle cx="70" cy="-65" r="20" fill="#8B5A2B"/>
    <path d="M 45 -15 C 45 -45 95 -45 95 -15 Z" fill="#A85C32"/>

    <!-- Children -->
    <circle cx="-25" cy="-40" r="16" fill="#D2B48C"/>
    <circle cx="25" cy="-35" r="15" fill="#E6C280"/>

    <!-- Open Glowing Bible in Family Hands -->
    <g transform="translate(0, 15)">
      <path d="M -40 -10 Q 0 -25 40 -10 L 35 25 Q 0 10 -35 25 Z" fill="#FFFDFA" stroke="#C89B2C" stroke-width="2"/>
      <path d="M 0 -22 L 0 12" stroke="#C89B2C" stroke-width="1.5"/>
      <path d="M -30 -2 Q -15 -10 -5 -2" stroke="#A7A7A7" stroke-width="1"/>
      <path d="M 5 -2 Q 15 -10 30 -2" stroke="#A7A7A7" stroke-width="1"/>
      <!-- Rays -->
      <path d="M 0 -30 L 0 -45 M -20 -35 L -30 -45 M 20 -35 L 30 -45" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Side Frame Verse Badge -->
    <g transform="translate(130, -90)">
      <rect x="-40" y="-30" width="80" height="60" rx="6" fill="#FAF5EE" stroke="#C89B2C" stroke-width="1"/>
      <text x="0" y="-12" font-family="'Georgia', serif" font-size="8" fill="#1D3C28" text-anchor="middle">Eu e a minha</text>
      <text x="0" y="-2" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="#C89B2C" text-anchor="middle">casa</text>
      <text x="0" y="8" font-family="'Georgia', serif" font-size="8" fill="#1D3C28" text-anchor="middle">serviremos ao Senhor</text>
      <text x="0" y="20" font-family="'Georgia', serif" font-size="7" font-weight="bold" fill="#1D3C28" text-anchor="middle">JOSUÉ 24:15</text>
    </g>
  </g>

  <!-- Bottom Quote Banner -->
  <g transform="translate(300, 720)">
    <text x="0" y="0" font-family="'Georgia', serif" font-size="16" font-weight="bold" fill="#1D3C28" text-anchor="middle" letter-spacing="1">“EU E A MINHA CASA SERVIREMOS AO SENHOR.”</text>
    <text x="0" y="25" font-family="'Georgia', serif" font-size="14" font-weight="bold" fill="#C89B2C" text-anchor="middle" letter-spacing="2">JOSUÉ 24:15</text>
  </g>
</svg>`;

// -------------------------------------------------------------
// COVER 06: Salmos Explicados em Mapas Visuais
// -------------------------------------------------------------
const svg06 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bgParchment" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8D3A7"/>
      <stop offset="50%" stop-color="#D9C08D"/>
      <stop offset="100%" stop-color="#C5AA71"/>
    </linearGradient>
    <linearGradient id="greenRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A3A1A"/>
      <stop offset="50%" stop-color="#145C2C"/>
      <stop offset="100%" stop-color="#0A3A1A"/>
    </linearGradient>
    <linearGradient id="woodRoll" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5C3A21"/>
      <stop offset="50%" stop-color="#A06A3B"/>
      <stop offset="100%" stop-color="#3D2413"/>
    </linearGradient>
    <filter id="shadow6" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Parchment Scroll Background -->
  <rect width="600" height="800" fill="url(#bgParchment)"/>

  <!-- Scroll Top & Bottom Wooden Rolls -->
  <rect x="10" y="8" width="580" height="24" rx="12" fill="url(#woodRoll)" filter="url(#shadow6)"/>
  <rect x="10" y="768" width="580" height="24" rx="12" fill="url(#woodRoll)" filter="url(#shadow6)"/>

  <!-- Parchment Inner Border -->
  <rect x="30" y="42" width="540" height="716" fill="none" stroke="#8C6D3B" stroke-width="2" stroke-dasharray="8 4"/>

  <!-- Top Shield & Emblem -->
  <g transform="translate(100, 115)">
    <path d="M -25 -30 L 25 -30 C 25 10 0 35 0 35 C 0 35 -25 10 -25 -30 Z" fill="url(#greenRibbon)" stroke="#D4AF37" stroke-width="2"/>
    <path d="M 0 -20 L 0 15 M -12 -5 L 12 -5" stroke="#D4AF37" stroke-width="3"/>
  </g>

  <!-- Open Bible Right Top -->
  <g transform="translate(500, 115)">
    <path d="M -30 -15 Q 0 -25 30 -15 L 25 15 Q 0 5 -25 15 Z" fill="#FFFDF0" stroke="#8C6D3B" stroke-width="1.5"/>
    <path d="M 0 -20 L 0 8" stroke="#8C6D3B" stroke-width="1"/>
  </g>

  <!-- Main Title -->
  <text x="300" y="105" font-family="'Georgia', serif" font-size="46" font-weight="900" fill="#0D3B1E" text-anchor="middle" letter-spacing="2">SALMOS</text>
  <text x="300" y="145" font-family="'Georgia', serif" font-size="28" font-weight="bold" fill="#1B522B" text-anchor="middle" letter-spacing="3">EXPLICADOS</text>

  <!-- Ribbon Banner: EM MAPAS VISUAIS -->
  <g transform="translate(300, 195)">
    <!-- Ribbon Ends -->
    <path d="M -230 -5 L -250 -20 L -230 -35 L -200 -20 Z" fill="#0A3A1A"/>
    <path d="M 230 -5 L 250 -20 L 230 -35 L 200 -20 Z" fill="#0A3A1A"/>
    <!-- Main Ribbon Body -->
    <rect x="-210" y="-22" width="420" height="44" rx="8" fill="url(#greenRibbon)" stroke="#D4AF37" stroke-width="2" filter="url(#shadow6)"/>
    <text x="0" y="8" font-family="'Georgia', serif" font-size="24" font-weight="900" fill="#EBD9B2" text-anchor="middle" letter-spacing="3">EM MAPAS VISUAIS</text>
  </g>

  <!-- Subtitle Badge -->
  <rect x="110" y="242" width="380" height="28" rx="6" fill="#FDF8ED" stroke="#8C6D3B" stroke-width="1"/>
  <text x="300" y="261" font-family="'Georgia', serif" font-size="13" font-weight="bold" fill="#0D3B1E" text-anchor="middle" letter-spacing="1">GUIA VISUAL COMPLETO DOS 150 SALMOS</text>

  <!-- Gold Seal Badge Right -->
  <g transform="translate(490, 290)">
    <circle cx="0" cy="0" r="38" fill="#D4AF37" filter="url(#shadow6)"/>
    <circle cx="0" cy="0" r="32" fill="#0D3B1E" stroke="#EBD9B2" stroke-width="1.5"/>
    <text x="0" y="-8" font-family="'Georgia', serif" font-size="9" fill="#D4AF37" text-anchor="middle" font-weight="bold">EDIÇÃO</text>
    <text x="0" y="6" font-family="'Georgia', serif" font-size="10" fill="#FFFFFF" text-anchor="middle" font-weight="900">COMPLETA</text>
    <text x="0" y="18" font-family="sans-serif" font-size="10" fill="#D4AF37" text-anchor="middle">★★★</text>
  </g>

  <!-- Center Illustration: King David with Harp & Jerusalem Landscape -->
  <g transform="translate(300, 430)">
    <!-- Landscape Backdrop Frame -->
    <rect x="-240" y="-120" width="480" height="240" rx="12" fill="#FDF3E0" stroke="#8C6D3B" stroke-width="1.5" filter="url(#shadow6)"/>
    
    <!-- Sunset & Jerusalem Hills -->
    <circle cx="0" cy="-20" r="100" fill="#FFAA33" opacity="0.3"/>
    <path d="M -240 80 Q -120 20 0 60 Q 120 10 240 70 L 240 120 L -240 120 Z" fill="#D9A86C"/>
    
    <!-- Temple / Jerusalem City Silhouettes -->
    <rect x="-60" y="-20" width="120" height="60" fill="#8C6D3B" opacity="0.6"/>
    <polygon points="0,-40 -50,-20 50,-20" fill="#8C6D3B" opacity="0.7"/>

    <!-- King David playing Harp Silhouette Left -->
    <g transform="translate(-160, 20)">
      <circle cx="0" cy="-35" r="14" fill="#0D3B1E"/>
      <path d="M -20 30 Q -15 -15 0 -20 Q 20 -15 20 30 Z" fill="#0D3B1E"/>
      <!-- Golden Harp -->
      <path d="M 10 -25 Q 35 -10 25 25 Q 10 20 10 -25 Z" fill="none" stroke="#D4AF37" stroke-width="3"/>
      <line x1="15" y1="-15" x2="15" y2="20" stroke="#D4AF37" stroke-width="1"/>
      <line x1="20" y1="-10" x2="20" y2="22" stroke="#D4AF37" stroke-width="1"/>
    </g>

    <!-- People Walking towards Temple -->
    <g fill="#0D3B1E" opacity="0.8">
      <circle cx="60" cy="50" r="6"/>
      <rect x="56" y="56" width="8" height="20" rx="3"/>
      <circle cx="90" cy="55" r="5"/>
      <rect x="87" y="60" width="6" height="16" rx="2"/>
    </g>
  </g>

  <!-- 4 Feature Badges at Bottom -->
  <g transform="translate(300, 600)">
    <!-- Badge 1 -->
    <g transform="translate(-180, 0)">
      <rect x="-50" y="-25" width="100" height="50" rx="8" fill="#FDF8ED" stroke="#0D3B1E" stroke-width="1.5"/>
      <text x="0" y="-5" font-family="'Georgia', serif" font-size="11" font-weight="bold" fill="#0D3B1E" text-anchor="middle">150 MAPAS</text>
      <text x="0" y="12" font-family="'Georgia', serif" font-size="10" fill="#8C6D3B" text-anchor="middle">VISUAIS</text>
    </g>
    <!-- Badge 2 -->
    <g transform="translate(-60, 0)">
      <rect x="-50" y="-25" width="100" height="50" rx="8" fill="#FDF8ED" stroke="#0D3B1E" stroke-width="1.5"/>
      <text x="0" y="-5" font-family="'Georgia', serif" font-size="10" font-weight="bold" fill="#0D3B1E" text-anchor="middle">LINGUAGEM</text>
      <text x="0" y="12" font-family="'Georgia', serif" font-size="10" fill="#8C6D3B" text-anchor="middle">CLARA</text>
    </g>
    <!-- Badge 3 -->
    <g transform="translate(60, 0)">
      <rect x="-50" y="-25" width="100" height="50" rx="8" fill="#FDF8ED" stroke="#0D3B1E" stroke-width="1.5"/>
      <text x="0" y="-5" font-family="'Georgia', serif" font-size="10" font-weight="bold" fill="#0D3B1E" text-anchor="middle">APLICAÇÕES</text>
      <text x="0" y="12" font-family="'Georgia', serif" font-size="10" fill="#8C6D3B" text-anchor="middle">PRÁTICAS</text>
    </g>
    <!-- Badge 4 -->
    <g transform="translate(180, 0)">
      <rect x="-50" y="-25" width="100" height="50" rx="8" fill="#FDF8ED" stroke="#0D3B1E" stroke-width="1.5"/>
      <text x="0" y="-8" font-family="'Georgia', serif" font-size="8" font-weight="bold" fill="#0D3B1E" text-anchor="middle">IDEAL PARA</text>
      <text x="0" y="4" font-family="'Georgia', serif" font-size="8" fill="#0D3B1E" text-anchor="middle">IGREJA, CÉLULA</text>
      <text x="0" y="16" font-family="'Georgia', serif" font-size="8" fill="#8C6D3B" text-anchor="middle">E FAMÍLIA</text>
    </g>
  </g>

  <!-- Bottom Banner Ribbon -->
  <g transform="translate(300, 690)">
    <rect x="-240" y="-22" width="480" height="44" rx="22" fill="url(#greenRibbon)" stroke="#D4AF37" stroke-width="2" filter="url(#shadow6)"/>
    <text x="0" y="5" font-family="'Georgia', serif" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">COMPREENDA. MEDITE. ENSINE. VIVA A PALAVRA.</text>
  </g>
</svg>`;

// -------------------------------------------------------------
// COVER 07: Trunfo Bíblico
// -------------------------------------------------------------
const svg07 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bgNavy" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0B1A3A"/>
      <stop offset="50%" stop-color="#050E21"/>
      <stop offset="100%" stop-color="#020612"/>
    </linearGradient>
    <linearGradient id="gold3d" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE89C"/>
      <stop offset="30%" stop-color="#E5B23A"/>
      <stop offset="70%" stop-color="#A87714"/>
      <stop offset="100%" stop-color="#F2CF66"/>
    </linearGradient>
    <linearGradient id="blueRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#124080"/>
      <stop offset="50%" stop-color="#1F63C4"/>
      <stop offset="100%" stop-color="#124080"/>
    </linearGradient>
    <filter id="shadow7" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Dark Navy Background -->
  <rect width="600" height="800" fill="url(#bgNavy)"/>

  <!-- Ornate Gold Frame Borders -->
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#D4AF37" stroke-width="2.5" rx="14"/>
  <rect x="28" y="28" width="544" height="744" fill="none" stroke="#D4AF37" stroke-width="1" rx="10"/>

  <!-- Gold Corner Ornaments -->
  <g stroke="#D4AF37" stroke-width="2" fill="none">
    <path d="M 20 50 Q 50 50 50 20"/>
    <path d="M 580 50 Q 550 50 550 20"/>
    <path d="M 20 750 Q 50 750 50 780"/>
    <path d="M 580 750 Q 550 750 550 780"/>
  </g>

  <!-- Crown Top -->
  <g transform="translate(300, 70)" filter="url(#shadow7)">
    <path d="M -25 10 L -35 -20 L -12 -5 L 0 -25 L 12 -5 L 35 -20 L 25 10 Z" fill="url(#gold3d)" stroke="#8C6D3B" stroke-width="1"/>
    <circle cx="-35" cy="-20" r="4" fill="#FFF"/>
    <circle cx="0" cy="-25" r="4" fill="#FFF"/>
    <circle cx="35" cy="-20" r="4" fill="#FFF"/>
  </g>

  <!-- Main Title: TRUNFO BÍBLICO -->
  <text x="300" y="155" font-family="'Impact', 'Georgia', serif" font-size="64" font-weight="900" fill="url(#gold3d)" text-anchor="middle" letter-spacing="4" filter="url(#shadow7)">TRUNFO</text>
  <text x="300" y="235" font-family="'Impact', 'Georgia', serif" font-size="68" font-weight="900" fill="url(#gold3d)" text-anchor="middle" letter-spacing="4" filter="url(#shadow7)">BÍBLICO</text>

  <!-- Blue Ribbon Banner: GRANDES PERSONAGENS -->
  <g transform="translate(300, 285)">
    <rect x="-190" y="-18" width="380" height="36" rx="6" fill="url(#blueRibbon)" stroke="#D4AF37" stroke-width="1.5" filter="url(#shadow7)"/>
    <text x="0" y="6" font-family="'Georgia', serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">GRANDES PERSONAGENS</text>
  </g>

  <!-- Subtitle -->
  <text x="300" y="335" font-family="'Georgia', serif" font-size="15" font-style="italic" fill="#E2C480" text-anchor="middle">Conheça as histórias da Bíblia enquanto se diverte!</text>

  <!-- Center Characters Illustration & Open Glowing Bible -->
  <g transform="translate(300, 490)">
    <!-- Glow Halo -->
    <ellipse cx="0" cy="10" rx="180" ry="100" fill="#FFE082" opacity="0.15"/>
    
    <!-- 6 Character Silhouettes (King David, Moses, Esther, Paul, Mary, Samuel) -->
    <g filter="url(#shadow7)">
      <!-- King David with Crown Center Left -->
      <g transform="translate(-60, -70)">
        <circle cx="0" cy="-30" r="22" fill="#E5B23A"/>
        <path d="M -25 30 L -25 -5 L 25 -5 L 25 30 Z" fill="#6B2D8B"/>
        <path d="M -15 -35 L -20 -50 L -7 -40 L 0 -52 L 7 -40 L 20 -50 L 15 -35 Z" fill="url(#gold3d)"/>
      </g>
      <!-- Moses with Staff Center Right -->
      <g transform="translate(40, -65)">
        <circle cx="0" cy="-30" r="24" fill="#D4AF37"/>
        <path d="M -30 35 L -25 -5 L 25 -5 L 30 35 Z" fill="#8B4513"/>
        <line x1="35" y1="-50" x2="35" y2="35" stroke="#D4AF37" stroke-width="4"/>
      </g>
      <!-- Esther / Queen Left -->
      <g transform="translate(-140, -50)">
        <circle cx="0" cy="-25" r="18" fill="#F0C27B"/>
        <path d="M -20 30 L -18 -5 L 18 -5 L 20 30 Z" fill="#B83280"/>
      </g>
      <!-- Paul / Apostle Right -->
      <g transform="translate(130, -50)">
        <circle cx="0" cy="-25" r="19" fill="#D2B48C"/>
        <path d="M -20 30 L -18 -5 L 18 -5 L 20 30 Z" fill="#2B6CB0"/>
      </g>
    </g>

    <!-- Large Open Glowing Bible in Foreground -->
    <g transform="translate(0, 30)" filter="url(#shadow7)">
      <path d="M -120 -20 Q 0 -45 120 -20 L 110 40 Q 0 15 -110 40 Z" fill="#FFFDF0" stroke="#D4AF37" stroke-width="3"/>
      <line x1="0" y1="-38" x2="0" y2="22" stroke="#D4AF37" stroke-width="2"/>
      <!-- Text lines in Bible -->
      <line x1="-90" y1="-10" x2="-15" y2="-18" stroke="#A87714" stroke-width="2.5"/>
      <line x1="-90" y1="5" x2="-15" y2="-3" stroke="#A87714" stroke-width="2.5"/>
      <line x1="15" y1="-18" x2="90" y2="-10" stroke="#A87714" stroke-width="2.5"/>
      <line x1="15" y1="-3" x2="90" y2="5" stroke="#A87714" stroke-width="2.5"/>
    </g>
  </g>

  <!-- Bottom 3 Feature Badges -->
  <g transform="translate(300, 690)">
    <!-- Badge 1 -->
    <g transform="translate(-160, 0)">
      <circle cx="0" cy="0" r="32" fill="#0B1A3A" stroke="#D4AF37" stroke-width="2" filter="url(#shadow7)"/>
      <text x="0" y="-4" font-family="'Georgia', serif" font-size="18" font-weight="900" fill="#D4AF37" text-anchor="middle">32</text>
      <text x="0" y="12" font-family="'Georgia', serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">PERSONAGENS</text>
    </g>
    <!-- Badge 2 -->
    <g transform="translate(0, 0)">
      <circle cx="0" cy="0" r="32" fill="#0B1A3A" stroke="#D4AF37" stroke-width="2" filter="url(#shadow7)"/>
      <text x="0" y="-6" font-family="'Georgia', serif" font-size="8" font-weight="bold" fill="#D4AF37" text-anchor="middle">PARA TODA</text>
      <text x="0" y="8" font-family="'Georgia', serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">A FAMÍLIA</text>
    </g>
    <!-- Badge 3 -->
    <g transform="translate(160, 0)">
      <circle cx="0" cy="0" r="32" fill="#0B1A3A" stroke="#D4AF37" stroke-width="2" filter="url(#shadow7)"/>
      <path d="M -12 -10 L 0 -18 L 12 -10 L 12 10 L 0 5 L -12 10 Z" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="0" y="14" font-family="'Georgia', serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">EDUCATIVO</text>
    </g>
  </g>
</svg>`;

// -------------------------------------------------------------
// COVER 08: O Professor de EBD Transformador
// -------------------------------------------------------------
const svg08 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bg08" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#08101D"/>
      <stop offset="40%" stop-color="#0F1E36"/>
      <stop offset="100%" stop-color="#050A12"/>
    </linearGradient>
    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE082"/>
      <stop offset="50%" stop-color="#C69214"/>
      <stop offset="100%" stop-color="#FCE082"/>
    </linearGradient>
    <filter id="shadow8" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="800" fill="url(#bg08)"/>

  <!-- Thin Gold Frame -->
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#C69214" stroke-width="1.5" rx="12"/>

  <!-- Top Crown Emblem -->
  <g transform="translate(300, 50)">
    <path d="M -15 0 L -22 -15 L -8 -5 L 0 -18 L 8 -5 L 22 -15 L 15 0 Z" fill="url(#goldMetallic)"/>
  </g>

  <!-- Header Titles -->
  <text x="300" y="95" font-family="'Georgia', serif" font-size="28" font-weight="normal" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">O PROFESSOR DE</text>
  
  <text x="300" y="185" font-family="'Georgia', serif" font-size="82" font-weight="900" fill="url(#goldMetallic)" text-anchor="middle" letter-spacing="6" filter="url(#shadow8)">EBD</text>
  
  <text x="300" y="235" font-family="'Georgia', serif" font-size="36" font-weight="bold" fill="url(#goldMetallic)" text-anchor="middle" letter-spacing="5">TRANSFORMADOR</text>

  <!-- Subtitle -->
  <text x="300" y="275" font-family="'Georgia', serif" font-size="12" fill="#D0D7E3" text-anchor="middle">Metodologias visuais e práticas para ensinar a Palavra</text>
  <text x="300" y="293" font-family="'Georgia', serif" font-size="12" fill="#D0D7E3" text-anchor="middle">com clareza, participação e propósito</text>

  <!-- Author Tag -->
  <g transform="translate(300, 330)">
    <rect x="-85" y="-14" width="170" height="28" rx="14" fill="#08101D" stroke="#C69214" stroke-width="1.5"/>
    <text x="0" y="4" font-family="'Georgia', serif" font-size="12" font-style="italic" fill="#FFFFFF" text-anchor="middle">Por <tspan font-weight="bold" fill="#FCE082">Eberth Ayala</tspan></text>
  </g>

  <!-- Center Classroom Illustration & Table Scene -->
  <g transform="translate(300, 520)">
    <!-- Classroom Background Frame -->
    <rect x="-240" y="-130" width="480" height="250" rx="14" fill="#152642" stroke="#C69214" stroke-width="1" filter="url(#shadow8)"/>

    <!-- Window with Sunlight Right -->
    <rect x="-220" y="-110" width="70" height="120" rx="4" fill="#FFF8E7" opacity="0.2"/>
    <line x1="-185" y1="-110" x2="-185" y2="10" stroke="#C69214" stroke-width="1"/>
    <line x1="-220" y1="-50" x2="-150" y2="-50" stroke="#C69214" stroke-width="1"/>

    <!-- Blackboard Left: Salmo 119:105 -->
    <rect x="-130" y="-110" width="90" height="60" rx="4" fill="#0A182E" stroke="#C69214" stroke-width="1"/>
    <text x="-85" y="-90" font-family="'Georgia', serif" font-size="7" fill="#FCE082" text-anchor="middle">TUA PALAVRA</text>
    <text x="-85" y="-80" font-family="'Georgia', serif" font-size="7" fill="#FFFFFF" text-anchor="middle">É LÂMPADA PARA</text>
    <text x="-85" y="-70" font-family="'Georgia', serif" font-size="7" fill="#FFFFFF" text-anchor="middle">OS MEUS PÉS</text>
    <text x="-85" y="-58" font-family="'Georgia', serif" font-size="6" fill="#FCE082" text-anchor="middle">SALMO 119:105</text>

    <!-- Teacher at Table Center -->
    <g transform="translate(0, -20)">
      <!-- Teacher Silhouette -->
      <circle cx="0" cy="-40" r="22" fill="#D2B48C"/>
      <path d="M -30 30 L -25 -15 L 25 -15 L 30 30 Z" fill="#1E3A8A"/>
      <!-- Open Bible on Table -->
      <path d="M -40 20 Q 0 5 40 20 L 35 45 Q 0 30 -35 45 Z" fill="#FFFDF0" stroke="#C69214" stroke-width="1.5"/>
    </g>

    <!-- Students Sitting Around Table -->
    <!-- Student 1 Left -->
    <circle cx="-160" cy="10" r="16" fill="#F5CBA7"/>
    <!-- Student 2 Left -->
    <circle cx="-90" cy="30" r="15" fill="#E59866"/>
    <!-- Student 3 Right -->
    <circle cx="90" cy="30" r="15" fill="#F5CBA7"/>
    <!-- Student 4 Right -->
    <circle cx="160" cy="10" r="16" fill="#CA6F1E"/>

    <!-- Table Surface -->
    <rect x="-210" y="50" width="420" height="50" rx="8" fill="#5D4037" stroke="#C69214" stroke-width="1"/>
  </g>

  <!-- Side Highlights Right -->
  <g transform="translate(480, 360)">
    <text x="0" y="0" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="#FCE082" text-anchor="middle">ENSINAR CON CLAREZA</text>
    <text x="0" y="18" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="#FCE082" text-anchor="middle">INSPIRAR COM PROPÓSITO</text>
    <text x="0" y="36" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="#FCE082" text-anchor="middle">TRANSFORMAR VIDAS</text>
  </g>

  <!-- Bottom Quote Banner -->
  <g transform="translate(300, 735)">
    <text x="0" y="0" font-family="'Georgia', serif" font-size="14" font-style="italic" fill="#FCE082" text-anchor="middle">Ensinar a Bíblia é cooperar para a transformação de vidas.</text>
  </g>
</svg>`;

// -------------------------------------------------------------
// COVER 09: Antes da Batalha
// -------------------------------------------------------------
const svg09 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bg09" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#14100B"/>
      <stop offset="50%" stop-color="#0A0806"/>
      <stop offset="100%" stop-color="#020202"/>
    </linearGradient>
    <linearGradient id="gold3dBattle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFEBB3"/>
      <stop offset="40%" stop-color="#D4A340"/>
      <stop offset="80%" stop-color="#8C6314"/>
      <stop offset="100%" stop-color="#E6B850"/>
    </linearGradient>
    <radialGradient id="sunRay" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#FFE8A3" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#D4A340" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow9" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <!-- Dark Atmospheric Background -->
  <rect width="600" height="800" fill="url(#bg09)"/>

  <!-- Divine Sun Rays from Top Cloud Burst -->
  <ellipse cx="300" cy="0" rx="350" ry="250" fill="url(#sunRay)"/>

  <!-- Outer Metallic Border -->
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#D4A340" stroke-width="2" rx="10"/>

  <!-- Large Central Dark Steel Shield -->
  <g transform="translate(300, 320)" filter="url(#shadow9)">
    <path d="M -180 -160 L 180 -160 C 180 60 0 200 0 200 C 0 200 -180 60 -180 -160 Z" fill="#12141A" stroke="#D4A340" stroke-width="3"/>
    <path d="M -170 -150 L 170 -150 C 170 50 0 185 0 185 C 0 185 -170 50 -170 -150 Z" fill="none" stroke="#4A5260" stroke-width="1.5"/>

    <!-- Cross on Top Shield -->
    <path d="M 0 -140 L 0 -90 M -20 -125 L 20 -125" stroke="url(#gold3dBattle)" stroke-width="5" stroke-linecap="square"/>

    <!-- Main Title Inside Shield -->
    <text x="0" y="-50" font-family="'Impact', 'Georgia', serif" font-size="44" font-weight="900" fill="#E2E8F0" text-anchor="middle" letter-spacing="4">ANTES DA</text>
    <text x="0" y="25" font-family="'Impact', 'Georgia', serif" font-size="62" font-weight="900" fill="url(#gold3dBattle)" text-anchor="middle" letter-spacing="4">BATALHA</text>
  </g>

  <!-- Subtitle Banner -->
  <g transform="translate(300, 520)">
    <rect x="-220" y="-16" width="440" height="32" rx="4" fill="#0A0806" stroke="#D4A340" stroke-width="1"/>
    <text x="0" y="5" font-family="'Georgia', serif" font-size="11" font-weight="bold" fill="#E2E8F0" text-anchor="middle" letter-spacing="2">JEJUM, ORAÇÃO E PALAVRA PARA UMA VIDA CRISTÃ FIRME</text>
  </g>

  <!-- Golden Sword & Radiant Open Bible Base -->
  <g transform="translate(300, 660)" filter="url(#shadow9)">
    <!-- Golden Glowing Sword Pointing Down -->
    <g transform="translate(0, -60)">
      <!-- Blade -->
      <polygon points="0,-70 -6,-10 0,20 6,-10" fill="url(#gold3dBattle)"/>
      <line x1="0" y1="-70" x2="0" y2="20" stroke="#FFF" stroke-width="1"/>
      <!-- Crossguard -->
      <rect x="-30" y="-12" width="60" height="6" rx="2" fill="url(#gold3dBattle)"/>
      <!-- Hilt -->
      <rect x="-4" y="-30" width="8" height="18" fill="url(#gold3dBattle)"/>
      <circle cx="0" cy="-33" r="5" fill="url(#gold3dBattle)"/>
    </g>

    <!-- Radiant Open Bible -->
    <path d="M -150 -10 Q 0 -40 150 -10 L 140 50 Q 0 20 -140 50 Z" fill="#FFFDF0" stroke="#D4A340" stroke-width="2.5"/>
    <line x1="0" y1="-30" x2="0" y2="30" stroke="#D4A340" stroke-width="2"/>
    <!-- Light Rays from Bible -->
    <path d="M 0 -35 L 0 -60 M -40 -35 L -70 -60 M 40 -35 L 70 -60" stroke="#FFE8A3" stroke-width="2"/>
  </g>
</svg>`;

createCover(svg05, '05-21-dias-familia.png');
createCover(svg06, '06-salmos-mapas-visuais.png');
createCover(svg07, '07-trunfo-biblico.png');
createCover(svg08, '08-professor-ebd-transformador.png');
createCover(svg09, '09-antes-da-batalha.png');

console.log('All 5 cover images generated successfully!');
