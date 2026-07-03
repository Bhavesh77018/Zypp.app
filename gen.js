const fs = require('fs');

function processFile(inputFile, outputFile, componentName) {
  let html = fs.readFileSync(inputFile, 'utf-8');
  
  // Extract styles
  let styles = '';
  const styleRegex = /<style>([\s\S]*?)<\/style>/g;
  let match;
  while ((match = styleRegex.exec(html)) !== null) {
    styles += match[1] + '\n';
  }

  // Extract body content (between <body> and <script> or <footer>)
  let bodyContent = html.match(/<body>([\s\S]*?)(?:<script>|<footer>|<\/body>)/i);
  let content = bodyContent ? bodyContent[1] : '';

  // Remove skip link
  content = content.replace(/<a href="#main-content".*?Skip to main content<\/a>/ig, '');
  
  // Clean up any stray </main>
  content = content.replace(/<\/main>/g, '');
  
  // We should also replace class with className so React doesn't complain in console
  // Wait, if we use dangerouslySetInnerHTML, class is perfectly fine! The DOM handles it natively.

  const finalCode = `"use client";
import { useEffect } from "react";

const HTML_CONTENT = \`
<style>
${styles}
</style>
${content}
\`;

export default function ${componentName}() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'up');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML_CONTENT }} />;
}
`;

  fs.writeFileSync(outputFile, finalCode);
  console.log('Created ' + outputFile);
}

processFile('zw-by-akash/investor-relations.html', 'src/components/investors/InvestorsContent.tsx', 'InvestorsContent');
processFile('zw-by-akash/impact.html', 'src/app/esg-impact/page.tsx', 'ESGImpactPage');