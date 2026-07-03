const fs = require('fs');
const path = require('path');

const srcAppDir = path.join('c:', 'Users', 'Bhavesh.aggarwal', 'Desktop', 'Zypp.app', 'src', 'app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcAppDir, function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    const heroRegex = /<section className="([^"]*?)min-h-\[(?:60|65|70)vh\]([^"]*?)pt-20([^"]*?)"/g;
    
    if (heroRegex.test(content)) {
      content = content.replace(heroRegex, '<section className="$1min-h-[75vh] md:min-h-[85vh]$2pt-32 pb-16 md:pt-40 md:pb-24$3"');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated:', filePath);
    }
  }
});
