const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1920;
const height = 1080;
const count = 240;
const outputDir = path.join(__dirname, 'public', 'sequence');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

console.log(`Generating ${count} frames in ${outputDir}...`);

for (let i = 1; i <= count; i++) {
    // Fill background - MUST match website bg
    ctx.fillStyle = '#0a0a0a'; 
    ctx.fillRect(0, 0, width, height);

    // Draw some changing element to simulate animation
    ctx.fillStyle = '#d2b48c'; // Tan color
    ctx.font = 'bold 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Tuku Coffee - Frame ${i}`, width / 2, height / 2);
    
    // Draw a moving circle to visualize scroll
    ctx.beginPath();
    const progress = i / count;
    const angle = progress * Math.PI * 4; // 2 full circles
    const radius = 50 + progress * 100; // Growing
    const x = width / 2 + Math.cos(angle) * (300 + Math.sin(progress * 10) * 50);
    const y = height / 2 + Math.sin(angle) * (300 + Math.cos(progress * 10) * 50);
    
    ctx.fillStyle = `rgba(210, 180, 140, ${0.5 + Math.sin(progress * Math.PI) * 0.5})`;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const fileName = `ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(outputDir, fileName), buffer);
    
    if (i % 50 === 0) console.log(`Generated ${i}/${count}`);
}
console.log('Done!');
