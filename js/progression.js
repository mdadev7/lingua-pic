/* ============================================================
   PROGRESSION : XP + suivi individuel de chaque mot
   Compatible avec Data (data.js) et Progression (3000 mots)
============================================================ */
const Progression = {
  state: {
    xp: 0,
    levelId: 1,
    wordsMastered: [],       // mots réussis 3 fois de suite
    wordsToReview: [],       // mots ratés à réviser
    wordStats: {},           // { en: { correct, wrong, lastSeen } }
    sessionsCompleted: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    dailyStreak: 0,
    lastVisit: null,
    achievements: []         // badges débloqués
  },

  /* ============================================================
     CHARGEMENT / SAUVEGARDE
  ============================================================ */
  load() {
    const saved = localStorage.getItem('progression_v2');
    if (saved) {
      try {
        Object.assign(this.state, JSON.parse(saved));
      } catch (e) {
        console.warn("Erreur chargement progression:", e);
      }
    }
    this.checkDailyStreak();
    this.updateUI();
  },

  save() {
    try {
      localStorage.setItem('progression_v2', JSON.stringify(this.state));
    } catch (e) {
      console.warn("Erreur sauvegarde progression:", e);
    }
  },

  /* ============================================================
     SÉRIE QUOTIDIENNE (STREAK)
  ============================================================ */
  checkDailyStreak() {
    const today = new Date().toDateString();
    const last = this.state.lastVisit;

    if (last === today) return; // déjà visité aujourd'hui

    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (last === yesterday) {
      this.state.dailyStreak++;
    } else if (last !== today) {
      // Premier jour ou série cassée
      this.state.dailyStreak = last ? 1 : 1;
    }

    this.state.lastVisit = today;
    this.save();

    // Afficher la série dans le header si présent
    const streakEl = document.getElementById('streak-display');
    if (streakEl) streakEl.textContent = this.state.dailyStreak;
  },

  /* ============================================================
     XP & NIVEAUX
  ============================================================ */
  addXP(amount) {
    this.state.xp += amount;
    const newLevel = this.getLevelFromXP(this.state.xp);
    const leveledUp = newLevel.id > this.state.levelId;

    if (leveledUp) {
      this.state.levelId = newLevel.id;
      this.onLevelUp(newLevel);
    }

    this.checkAchievements();
    this.save();
    this.updateUI();
    return leveledUp;
  },

  onLevelUp(newLevel) {
    if (typeof App !== 'undefined' && App.toast) {
      App.toast(`🎉 Niveau ${newLevel.code} — ${newLevel.name} débloqué !`, 4000);
    }
    // Re-render lessons pour débloquer le nouveau contenu
    if (typeof Lessons !== 'undefined' && Lessons.render) {
      setTimeout(() => Lessons.render(), 100);
    }
  },

  getLevelFromXP(xp) {
    let current = Data.levels[0];
    for (const lvl of Data.levels) {
      if (xp >= lvl.xpRequired) current = lvl;
    }
    return current;
  },

  getNextLevel() {
    const idx = Data.levels.findIndex(l => l.id === this.state.levelId);
    return Data.levels[idx + 1] || null;
  },

  getProgressToNext() {
    const next = this.getNextLevel();
    if (!next) return 100;
    const current = Data.levels.find(l => l.id === this.state.levelId);
    const range = next.xpRequired - current.xpRequired;
    const progress = this.state.xp - current.xpRequired;
    return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  },

  getCurrentLevelCode() {
    const lvl = Data.levels.find(l => l.id === this.state.levelId);
    return lvl ? lvl.code : 'A1';
  },

  /* ============================================================
     SUIVI DES MOTS
  ============================================================ */
  recordAnswer(correct, wordKey) {
    if (!wordKey) return;

    this.state.totalAnswers++;

    if (!this.state.wordStats[wordKey]) {
      this.state.wordStats[wordKey] = { correct: 0, wrong: 0, lastSeen: Date.now() };
    }
    const stats = this.state.wordStats[wordKey];
    stats.lastSeen = Date.now();

    if (correct) {
      this.state.correctAnswers++;
      stats.correct++;

      // Mot maîtrisé = 3 bonnes réponses nettes
      if (stats.correct - stats.wrong >= 3) {
        if (!this.state.wordsMastered.includes(wordKey)) {
          this.state.wordsMastered.push(wordKey);
        }
        this.state.wordsToReview = this.state.wordsToReview.filter(w => w !== wordKey);
      }
    } else {
      stats.wrong++;
      if (!this.state.wordsToReview.includes(wordKey)) {
        this.state.wordsToReview.push(wordKey);
      }
    }

    this.save();
  },

  /* Mots à réviser en priorité (les plus ratés) */
  getReviewWords(limit = 10) {
    return [...this.state.wordsToReview]
      .filter(w => {
        const s = this.state.wordStats[w];
        return s && s.correct - s.wrong < 3;
      })
      .sort((a, b) => {
        const sa = this.state.wordStats[a];
        const sb = this.state.wordStats[b];
        return (sb.wrong - sa.wrong);
      })
      .slice(0, limit);
  },

  /* ============================================================
     STATISTIQUES
  ============================================================ */
  getGlobalStats() {
    const total = Data.getTotalWordCount ? Data.getTotalWordCount() : 0;
    const learned = this.state.wordsMastered.length;
    const inProgress = Math.max(0, Object.keys(this.state.wordStats).length - learned);

    return {
      totalWords: total,
      learned: learned,
      inProgress: inProgress,
      notStarted: Math.max(0, total - learned - inProgress),
      percentLearned: total > 0 ? Math.round((learned / total) * 100) : 0,
      accuracy: this.state.totalAnswers > 0
        ? Math.round((this.state.correctAnswers / this.state.totalAnswers) * 100)
        : 0
    };
  },

  getStatsByTheme() {
    if (!Data.getAllThemes) return {};
    const themes = Data.getAllThemes();
    const result = {};

    themes.forEach(theme => {
      const themeWords = Data.getWordsByTheme(theme);
      const learnedCount = themeWords.filter(w =>
        this.state.wordsMastered.includes(w.en)
      ).length;
      result[theme] = {
        total: themeWords.length,
        learned: learnedCount,
        percent: themeWords.length > 0
          ? Math.round((learnedCount / themeWords.length) * 100)
          : 0
      };
    });

    return result;
  },

  /* ============================================================
     BADGES / ACHIEVEMENTS
  ============================================================ */
  checkAchievements() {
    const stats = this.getGlobalStats();
    const badges = [
      { id: "first_10",     label: "🥉 10 mots",         check: () => stats.learned >= 10 },
      { id: "first_50",     label: "🥈 50 mots",         check: () => stats.learned >= 50 },
      { id: "first_100",    label: "🥇 100 mots",        check: () => stats.learned >= 100 },
      { id: "first_500",    label: "💎 500 mots",        check: () => stats.learned >= 500 },
      { id: "first_1000",   label: "🏆 1000 mots !",     check: () => stats.learned >= 1000 },
      { id: "first_2000",   label: "👑 2000 mots !",     check: () => stats.learned >= 2000 },
      { id: "all_3000",     label: "🌟 3000 MOTS !",     check: () => stats.learned >= 3000 },
      { id: "perfect_quiz", label: "🎯 Quiz parfait",    check: () => this.state.sessionsCompleted >= 1 },
      { id: "accuracy_80",  label: "🎪 Précision 80%+",  check: () => stats.accuracy >= 80 && stats.learned >= 20 },
      { id: "streak_3",     label: "🔥 3 jours de suite", check: () => this.state.dailyStreak >= 3 },
      { id: "streak_7",     label: "🔥 7 jours de suite", check: () => this.state.dailyStreak >= 7 },
      { id: "level_a2",     label: "📈 Niveau A2",       check: () => this.state.levelId >= 2 },
      { id: "level_b1",     label: "📈 Niveau B1",       check: () => this.state.levelId >= 3 },
      { id: "level_b2",     label: "📈 Niveau B2",       check: () => this.state.levelId >= 4 },
      { id: "level_c1",     label: "📈 Niveau C1",       check: () => this.state.levelId >= 5 },
      { id: "level_c2",     label: "📈 Niveau C2",       check: () => this.state.levelId >= 6 }
    ];

    badges.forEach(b => {
      if (!this.state.achievements.includes(b.id) && b.check()) {
        this.state.achievements.push(b.id);
        if (typeof App !== 'undefined' && App.toast) {
          App.toast(`🏅 Badge : ${b.label}`, 3000);
        }
      }
    });
  },

  /* ============================================================
     MISE À JOUR DE L'INTERFACE
  ============================================================ */
  updateUI() {
    const lvl = Data.levels.find(l => l.id === this.state.levelId) || Data.levels[0];

    // Badge niveau dans le header
    const levelBadge = document.getElementById('level-display');
    if (levelBadge) {
      levelBadge.textContent = lvl.code;
      levelBadge.style.background = lvl.color;
    }

    // XP dans le header
    const xpEl = document.getElementById('points-display');
    if (xpEl) xpEl.textContent = this.state.xp;

    // Streak dans le header
    const streakEl = document.getElementById('streak-display');
    if (streakEl) streakEl.textContent = this.state.dailyStreak;

    // Barre de progression XP
    const progressBar = document.getElementById('xp-progress');
    if (progressBar) progressBar.style.width = this.getProgressToNext() + '%';

    // Texte de progression
    const progressText = document.getElementById('xp-text');
    if (progressText) {
      const next = this.getNextLevel();
      if (next) {
        progressText.textContent = `${this.state.xp} XP / ${next.xpRequired} XP — ${next.code} dans ${next.xpRequired - this.state.xp} XP`;
      } else {
        progressText.textContent = `${this.state.xp} XP — Niveau maximum ! 🏆`;
      }
    }

    // Page stats si visible
    const statsEl = document.getElementById('stats-content');
    if (statsEl) this.renderStats(statsEl);
  },

  /* ============================================================
     RENDU DE LA PAGE STATS
  ============================================================ */
  renderStats(container) {
    const lvl = Data.levels.find(l => l.id === this.state.levelId) || Data.levels[0];
    const stats = this.getGlobalStats();
    const next = this.getNextLevel();
    const themeStats = this.getStatsByTheme();

    container.innerHTML = `
      <!-- Progression globale -->
      <div class="stats-hero" style="background: linear-gradient(135deg, ${lvl.color}, ${lvl.color}cc); color:white; padding:20px; border-radius:16px; margin-bottom:15px;">
        <div style="font-size:1.3em;font-weight:700;">${lvl.code} — ${lvl.name}</div>
        <div style="font-size:0.95em;opacity:0.9;margin:5px 0 12px;">${this.state.xp} XP</div>
        ${next ? `
          <div style="height:8px;background:rgba(255,255,255,0.3);border-radius:4px;overflow:hidden;margin-bottom:8px;">
            <div style="height:100%;background:white;border-radius:4px;width:${this.getProgressToNext()}%;transition:width 0.5s;"></div>
          </div>
          <div style="font-size:0.85em;opacity:0.9;">→ ${next.code} à ${next.xpRequired} XP</div>
        ` : '<div style="font-size:0.85em;opacity:0.9;">🏆 Niveau maximum !</div>'}
      </div>

      <!-- Objectif 3000 mots -->
      <div style="background:var(--card-bg);padding:20px;border-radius:16px;margin-bottom:15px;box-shadow:var(--shadow);">
        <div style="font-size:1.1em;font-weight:700;margin-bottom:12px;">🎯 Objectif : ${stats.totalWords} mots</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
          <span style="font-size:2em;font-weight:800;color:var(--primary);">${stats.learned}</span>
          <span style="color:var(--text-muted);font-size:0.9em;">/ ${stats.totalWords}</span>
        </div>
        <div style="height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;background:var(--gradient-accent);border-radius:5px;width:${stats.percentLearned}%;transition:width 0.5s;"></div>
        </div>
        <div style="font-size:0.85em;color:var(--text-muted);text-align:center;">${stats.percentLearned}% maîtrisés</div>
        <div style="display:flex;justify-content:space-around;margin-top:12px;font-size:0.85em;">
          <span style="color:var(--success);">✅ ${stats.learned} maîtrisés</span>
          <span style="color:var(--warning);">🔄 ${stats.inProgress} en cours</span>
          <span style="color:var(--text-muted);">⚪ ${stats.notStarted} à découvrir</span>
        </div>
      </div>

      <!-- Stats rapides -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
        <div style="background:var(--card-bg);padding:15px;border-radius:12px;text-align:center;box-shadow:var(--shadow);">
          <div style="font-size:1.8em;">🎯</div>
          <div style="font-size:1.2em;font-weight:700;color:var(--text);">${stats.accuracy}%</div>
          <div style="font-size:0.75em;color:var(--text-muted);">Précision</div>
        </div>
        <div style="background:var(--card-bg);padding:15px;border-radius:12px;text-align:center;box-shadow:var(--shadow);">
          <div style="font-size:1.8em;">🔥</div>
          <div style="font-size:1.2em;font-weight:700;color:var(--text);">${this.state.dailyStreak}</div>
          <div style="font-size:0.75em;color:var(--text-muted);">Jours de suite</div>
        </div>
        <div style="background:var(--card-bg);padding:15px;border-radius:12px;text-align:center;box-shadow:var(--shadow);">
          <div style="font-size:1.8em;">📝</div>
          <div style="font-size:1.2em;font-weight:700;color:var(--text);">${this.state.totalAnswers}</div>
          <div style="font-size:0.75em;color:var(--text-muted);">Réponses</div>
        </div>
      </div>

      <!-- Progression par thème -->
      <h3 style="margin:20px 0 10px;color:var(--text);">📚 Progression par thème</h3>
      <div style="background:var(--card-bg);padding:15px;border-radius:12px;box-shadow:var(--shadow);">
        ${Object.entries(themeStats)
          .filter(([_, s]) => s.total >= 5)
          .sort((a, b) => b[1].total - a[1].total)
          .slice(0, 20)
          .map(([theme, s]) => `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div style="flex:0 0 110px;font-size:0.8em;font-weight:600;color:var(--text);">${theme}</div>
              <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;">
                <div style="height:100%;background:var(--primary);border-radius:3px;width:${s.percent}%;"></div>
              </div>
              <div style="flex:0 0 60px;text-align:right;font-size:0.75em;color:var(--text-muted);">${s.learned}/${s.total}</div>
            </div>
          `).join('')}
      </div>

      <!-- Badges -->
      <h3 style="margin:20px 0 10px;color:var(--text);">🏅 Badges débloqués</h3>
      <div style="background:var(--card-bg);padding:15px;border-radius:12px;box-shadow:var(--shadow);display:flex;flex-wrap:wrap;gap:8px;">
        ${this.state.achievements.length === 0
          ? '<p style="color:var(--text-muted);font-size:0.9em;">Aucun badge encore. Continuez à apprendre !</p>'
          : this.state.achievements.map(a => {
              const badge = {
                first_10: "🥉 10 mots", first_50: "🥈 50 mots",
                first_100: "🥇 100 mots", first_500: "💎 500 mots",
                first_1000: "🏆 1000 mots", first_2000: "👑 2000 mots",
                all_3000: "🌟 3000 mots", perfect_quiz: "🎯 Quiz parfait",
                accuracy_80: "🎪 Précision 80%+", streak_3: "🔥 3 jours",
                streak_7: "🔥 7 jours", level_a2: "📈 A2",
                level_b1: "📈 B1", level_b2: "📈 B2",
                level_c1: "📈 C1", level_c2: "📈 C2"
              }[a] || a;
              return `<span style="background:var(--primary);color:white;padding:6px 12px;border-radius:15px;font-size:0.85em;font-weight:600;">${badge}</span>`;
            }).join('')}
      </div>

      <button class="btn secondary full-width" onclick="Progression.reset()" style="margin-top:20px;">
        🗑️ Réinitialiser la progression
      </button>
    `;
  },

  /* ============================================================
     RÉINITIALISATION
  ============================================================ */
  reset() {
    if (!confirm("Réinitialiser toute la progression ? Cette action est irréversible.")) return;
    localStorage.removeItem('progression_v2');
    this.state = {
      xp: 0, levelId: 1, wordsMastered: [], wordsToReview: [],
      wordStats: {}, sessionsCompleted: 0, correctAnswers: 0,
      totalAnswers: 0, dailyStreak: 0, lastVisit: null, achievements: []
    };
    this.save();
    this.updateUI();
    if (typeof App !== 'undefined' && App.toast) {
      App.toast("✅ Progression réinitialisée");
    }
    // Re-render pages si visibles
    if (typeof Lessons !== 'undefined' && Lessons.render) Lessons.render();
    if (typeof Quiz !== 'undefined' && Quiz.start) Quiz.start();
  }
};

/* Chargement automatique au démarrage */
document.addEventListener('DOMContentLoaded', () => Progression.load());