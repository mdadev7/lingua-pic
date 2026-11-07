/* generate-words.js — Génère les fichiers de mots par niveau */
const fs = require('fs');

// ⚠️ Structure par niveau : chaque mot a en/fr/theme
// Thèmes disponibles par niveau :
const THEMES = {
  A1: ["salutations","famille","nombres","couleurs","nourriture","boissons","animaux","corps","maison","vêtements","jours","mois","temps","verbes-base","adjectifs-base","école","sports","loisirs","transports","émotions-base"],
  A2: ["voyage","météo","restaurant","magasin","ville","santé","travail-base","hobbies","technologie-base","nature","cuisine","vêtements-details","sports-details","directions","argent-base"],
  B1: ["travail","études","société","environnement","santé","médias","culture","relations","opinions","sentiments","voyage-avancé","technologie","économie-base","politique-base","science-base"],
  B2: ["business","politique","économie","science","droit","philosophie","technologie-avancée","environnement-avancé","société-avancée","art","psychologie","médecine","médias-avancés","éducation-avancée","finance"],
  C1: ["académique","professionnel","littéraire","scientifique","journalistique","juridique","médical","technique","philosophique","rhétorique"],
  C2: ["littéraire-avancé","poétique","philosophique-avancé","scientifique-avancé","juridique-avancé","archaïque","technique-spécialisé"]
};

// Objectifs par niveau (total = 3000)
const TARGETS = { A1: 500, A2: 500, B1: 600, B2: 600, C1: 500, C2: 300 };

// 🚨 ICI vous mettez votre banque de mots (ou un fichier CSV/JSON)
// Format : { en, fr, theme, level }
const MASTER_WORDS = require('./master-words.json'); 
// ↑ Fichier JSON avec tous les mots. Structure : [{en, fr, theme, level}]

// Alternative : générer depuis une API publique ou un dataset Kaggle
// Ex: https://github.com/first20hours/google-10000-english
// Ex: https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/

for (const [level, target] of Object.entries(TARGETS)) {
  const words = MASTER_WORDS.filter(w => w.level === level).slice(0, target);
  const content = `/* ${level} — ${words.length} mots */\nwindow.WORDS_${level} = ${JSON.stringify(words, null, 2)};\n`;
  fs.writeFileSync(`js/data/words-${level.toLowerCase()}.js`, content);
  console.log(`✅ ${level}: ${words.length} mots générés`);
}