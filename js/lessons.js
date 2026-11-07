const Lessons = {
  render() {
    const container = document.getElementById('lessons-container');
    if (!container) return;

    const currentLevelId = Progression.state.levelId;
    const currentLevelCode = Progression.getCurrentLevelCode();
    const lvl = Data.levels.find(l => l.id === currentLevelId);
    const next = Progression.getNextLevel();

    let html = `
      <div class="progress-banner" style="background: linear-gradient(135deg, ${lvl.color}, ${lvl.color}dd);">
        <div class="pb-level">${lvl.code} — ${lvl.name}</div>
        <div class="pb-xp">${Progression.state.xp} XP</div>
        ${next ? `
          <div class="pb-bar"><div class="pb-fill" style="width:${Progression.getProgressToNext()}%"></div></div>
          <div class="pb-next">Prochain : ${next.code} à ${next.xpRequired} XP</div>
        ` : '<div class="pb-next">🏆 Niveau max !</div>'}
      </div>
    `;

    Data.levels.forEach(level => {
      const unlocked = level.id <= currentLevelId;
      const isCurrent = level.id === currentLevelId;
      
      html += `<div class="level-section ${unlocked ? '' : 'locked'}">
        <h3 class="level-title" style="color:${level.color}">
          ${unlocked ? '🔓' : '🔒'} ${level.code} — ${level.name}
          ${isCurrent ? '<span class="current-badge">ACTUEL</span>' : ''}
        </h3>`;

      if (!unlocked) {
        html += `<p class="hint">Atteignez ${level.xpRequired} XP pour débloquer.</p>`;
      } else {
        // Grammaire
        const grammar = Data.grammar.filter(g => g.level === level.code);
        grammar.forEach(g => {
          html += `
            <div class="lesson-card">
              <h4>${g.title}</h4>
              <div class="rule"><b>Règle :</b> ${g.rule}</div>
              <div class="examples">
                ${g.examples.map(ex => `
                  <div class="example-item" onclick="speak('${ex.replace(/'/g, "\\'")}')">🔊 ${ex}</div>
                `).join('')}
              </div>
            </div>`;
        });

        // Vocabulaire (10 mots du niveau)
        const vocab = Data.getWordsByLevel(level.code).slice(0, 12);
        if (vocab.length) {
          html += `<div class="lesson-card vocab-card">
            <h4>📖 Vocabulaire — ${Data.getWordsByLevel(level.code).length} mots</h4>
            <div class="vocab-grid">
              ${vocab.map(v => `
                <div class="vocab-chip" onclick="speak('${v.en.replace(/'/g, "\\'")}')">
                  <b>${v.en}</b><br><small>${v.fr}</small>
                </div>
              `).join('')}
            </div>
          </div>`;
        }
      }
      html += `</div>`;
    });

    container.innerHTML = html;
  }
};

// Rendu des idioms
function renderIdioms() {
  const container = document.getElementById('idioms-container');
  if (!container) return;
  
  const currentLevelCode = Progression.getCurrentLevelCode();
  const levelIdx = Data.levels.findIndex(l => l.code === currentLevelCode);

  let html = '';
  Data.levels.forEach(level => {
    if (level.id > Progression.state.levelId) return;
    const idioms = Data.idioms.filter(i => i.level === level.code);
    if (!idioms.length) return;
    
    html += `<h3 class="level-title" style="color:${level.color}">💬 ${level.code}</h3>`;
    idioms.forEach(i => {
      html += `
        <div class="lesson-card idiom-card">
          <h4 onclick="speak('${i.en.replace(/'/g, "\\'")}')" style="cursor:pointer">🔊 ${i.en}</h4>
          <div class="rule"><b>Signification :</b> ${i.fr}</div>
          <div class="rule" style="color:var(--text-muted);font-style:italic">Littéral : ${i.literal}</div>
        </div>`;
    });
  });
  
  container.innerHTML = html || '<p class="hint">Aucune expression disponible.</p>';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-goto="cours"]').forEach(b => 
    b.addEventListener('click', () => setTimeout(() => Lessons.render(), 50)));
  document.querySelectorAll('[data-goto="idioms"]').forEach(b => 
    b.addEventListener('click', () => setTimeout(() => renderIdioms(), 50)));
});