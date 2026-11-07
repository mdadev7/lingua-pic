/* build-master.js — Extrait tous les mots de data-words.js vers master-words.json */
const fs = require('fs');

// Simuler un navigateur pour charger les fichiers
global.window = {};

// Charger data-words.js
const dataWordsCode = fs.readFileSync('./js/data-words.js', 'utf8');
eval(dataWordsCode); // exécute et remplit window.WORDS_A1 etc.

// Construire master-words.json
const all = [];
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

levels.forEach(level => {
  const words = global.window[`WORDS_${level}`] || [];
  words.forEach(w => {
    all.push({
      en: w.en,
      fr: w.fr,
      theme: w.theme,
      level: level
    });
  });
});

fs.writeFileSync('./master-words.json', JSON.stringify(all, null, 2));
console.log(`✅ master-words.json créé avec ${all.length} mots`);

levels.forEach(l => {
  const count = (global.window[`WORDS_${l}`] || []).length;
  console.log(`   ${l}: ${count} mots`);
});