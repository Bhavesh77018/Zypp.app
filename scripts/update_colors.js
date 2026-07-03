const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.html', '.css', '.svg', '.json', '.js', '.md'].includes(ext)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Replace colors
  // #00bc84 (Tailwind default emerald) -> #00bc84
  content = content.replace(/#00bc84/gi, '#00bc84');
  // #00bc84 / #00bc84 (Previous Zypp green) -> #00bc84
  content = content.replace(/#00bc84/gi, '#00bc84');
  
  // Replace RGB values used in rgba()
  // 0,188,132 (RGB for #00bc84) -> 0,188,132
  content = content.replace(/0\s*,\s*203\s*,\s*96/g, '0,188,132');
  
  // Replace hover emerald #00a373 -> #00a373 (slightly darker version of #00bc84)
  content = content.replace(/#00a373/gi, '#00a373');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated colors in:', filePath);
  }
}

const rootDir = 'c:\\Users\\Bhavesh.aggarwal\\Desktop\\Zypp.app';
walkDir(rootDir, processFile);
