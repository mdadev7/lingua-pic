/* generate-words.js — Génère un fichier unique data-words.js */
const fs = require('fs');

const MASTER_WORDS = require('./master-words.json');
const TARGETS = { A1: 500, A2: 500, B1: 600, B2: 600, C1: 500, C2: 300 };

let output = `/* ============================================================
   3000 MOTS ANGLAIS — Généré automatiquement
   Total : ${MASTER_WORDS.length} mots
============================================================ */
(function () {
`;

for (const [level, target] of Object.entries(TARGETS)) {
  const words = MASTER_WORDS
    .filter(w => w.level === level)
    .slice(0, target)
    .map(({ en, fr, theme }) => ({ en, fr, theme }));
  
  output += `  // ========== ${level} — ${words.length} mots ==========\n`;
  output += `  const ${level} = ${JSON.stringify(words, null, 2)};\n\n`;
  console.log(`✅ ${level}: ${words.length} mots`);
}

output += `  window.WORDS_A1 = A1;
  window.WORDS_A2 = A2;
  window.WORDS_B1 = B1;
  window.WORDS_B2 = B2;
  window.WORDS_C1 = C1;
  window.WORDS_C2 = C2;

  console.log('📚 Mots chargés :', 
    A1.length + A2.length + B1.length + B2.length + C1.length + C2.length);
})();
`;

fs.writeFileSync('./js/data-words.js', output);
console.log(`\n✅ js/data-words.js régénéré avec ${MASTER_WORDS.length} mots`);