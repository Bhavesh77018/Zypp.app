const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\Bhavesh.aggarwal\\.gemini\\antigravity-ide\\brain\\57c61c83-8692-4810-bc3a-80e166ee9b97\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('export function LogoMark') && line.includes('<svg')) {
      const obj = JSON.parse(line);
      console.log('FOUND IT!');
      // print just the Logo.tsx content or the whole line nicely
      if (obj.content) {
         const match = obj.content.match(/export function LogoMark[\s\S]*?<\/svg>[\s\S]*?\)/);
         if (match) console.log(match[0]);
      }
    }
  }
}

processLineByLine();
