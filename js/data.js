/* ============================================================
   DATA - Agrégateur + générateur de quiz
============================================================ */
window.Data = {
  levels: [
    { id: 1, code: "A1", name: "Débutant",      xpRequired: 0,     color: "#38a169" },
    { id: 2, code: "A2", name: "Élémentaire",   xpRequired: 500,   color: "#3182ce" },
    { id: 3, code: "B1", name: "Intermédiaire", xpRequired: 1500,  color: "#805ad5" },
    { id: 4, code: "B2", name: "Avancé",        xpRequired: 3500,  color: "#d69e2e" },
    { id: 5, code: "C1", name: "Autonome",      xpRequired: 7000,  color: "#e53e3e" },
    { id: 6, code: "C2", name: "Maîtrise",      xpRequired: 12000, color: "#1a202c" }
  ],

  allWords: {
    A1: window.WORDS_A1 || [],
    A2: window.WORDS_A2 || [],
    B1: window.WORDS_B1 || [],
    B2: window.WORDS_B2 || [],
    C1: window.WORDS_C1 || [],
    C2: window.WORDS_C2 || []
  },

  getAllWords() {
    return Object.values(this.allWords).flat();
  },

  getTotalWordCount() {
    return this.getAllWords().length;
  },

  getWordsByLevel(code) {
    return this.allWords[code] || [];
  },

  getWordsUpToLevel(code) {
    const idx = this.levels.findIndex(l => l.code === code);
    let words = [];
    for (let i = 0; i <= idx; i++) {
      words = words.concat(this.allWords[this.levels[i].code] || []);
    }
    return words;
  },

  getWordsByTheme(theme) {
    return this.getAllWords().filter(w => w.theme === theme);
  },

  getAllThemes() {
    return [...new Set(this.getAllWords().map(w => w.theme))].sort();
  },

  findWord(en) {
    return this.getAllWords().find(w => w.en === en);
  },

  sentences: window.SENTENCES || [],
  grammar: window.GRAMMAR || [],
  idioms: window.IDIOMS || [],

  /* ===== Générateur de quiz ===== */
  generateQuiz(levelCode, count = 10, theme = null) {
    let vocab = this.getWordsUpToLevel(levelCode);
    if (theme) vocab = vocab.filter(w => w.theme === theme);
    if (vocab.length < 4) return [];

    const pool = [];
    
    // Questions vocabulaire EN → FR
    vocab.forEach(v => {
      const others = vocab.filter(x => x.fr !== v.fr);
      const distractors = this.shuffle(others).slice(0, 3).map(x => x.fr);
      pool.push({
        type: "vocab",
        theme: v.theme,
        q: `Que signifie « ${v.en} » ?`,
        options: this.shuffle([v.fr, ...distractors]),
        answer: v.fr,
        listen: v.en
      });
    });

    // Questions FR → EN (une sur deux)
    this.shuffle(vocab).slice(0, Math.floor(vocab.length / 2)).forEach(v => {
      const others = vocab.filter(x => x.en !== v.en);
      const distractors = this.shuffle(others).slice(0, 3).map(x => x.en);
      pool.push({
        type: "translate",
        theme: v.theme,
        q: `Comment dit-on « ${v.fr} » en anglais ?`,
        options: this.shuffle([v.en, ...distractors]),
        answer: v.en
      });
    });

    // Ajouter quelques phrases du niveau
    const sents = this.sentences.filter(s => s.level === levelCode);
    this.shuffle(sents).slice(0, 5).forEach(s => {
      const others = sents.filter(x => x.en !== s.en);
      const distractors = this.shuffle(others).slice(0, 3).map(x => x.en);
      if (distractors.length === 3) {
        pool.push({
          type: "sentence",
          q: `Traduisez : « ${s.fr} »`,
          options: this.shuffle([s.en, ...distractors]),
          answer: s.en
        });
      }
    });

    return this.shuffle(pool).slice(0, count);
  },

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
};

console.log("📚 Total mots:", Data.getTotalWordCount(), "| Thèmes:", Data.getAllThemes().length);