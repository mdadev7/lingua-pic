/* ============================================================
   DICTIONNAIRE - API gratuite + historique
============================================================ */
const Dict = {
  history: JSON.parse(localStorage.getItem('dictHistory') || '[]'),

  async search(word) {
    if (!word) return;
    word = word.trim().toLowerCase();
    const container = document.getElementById('dict-result');
    container.innerHTML = '<div style="text-align:center;padding:20px">⏳ Recherche...</div>';
    
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) throw new Error("Mot non trouvé");
      const data = await res.json();
      this.render(data[0], word);
      this.addToHistory(word);
    } catch (err) {
      // Fallback : traduction via MyMemory
      try {
        const t = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|fr`);
        const td = await t.json();
        container.innerHTML = `
          <div class="dict-word">${word}</div>
          <div class="dict-def">
            <div class="type">Traduction</div>
            <div class="meaning">${td.responseData.translatedText}</div>
          </div>
        `;
        this.addToHistory(word);
      } catch (e) {
        container.innerHTML = `<div style="text-align:center;color:var(--text-muted)">❌ Mot introuvable</div>`;
      }
    }
  },

  render(entry, word) {
    const container = document.getElementById('dict-result');
    const phonetic = entry.phonetic || (entry.phonetics?.find(p => p.text)?.text) || '';
    const meanings = entry.meanings || [];
    
    let html = `<div class="dict-word">${entry.word || word}</div>`;
    if (phonetic) html += `<div class="dict-phonetic">${phonetic}</div>`;
    html += `<button class="btn primary" onclick="speak('${word.replace(/'/g, "\\'")}')">🔊 Écouter</button>`;
    
    meanings.slice(0, 3).forEach(m => {
      m.definitions.slice(0, 2).forEach(d => {
        html += `
          <div class="dict-def">
            <div class="type">${m.partOfSpeech || ''}</div>
            <div class="meaning">${d.definition}</div>
            ${d.example ? `<div class="example">"${d.example}"</div>` : ''}
          </div>
        `;
      });
    });
    container.innerHTML = html;
  },

  addToHistory(word) {
    this.history = [word, ...this.history.filter(w => w !== word)].slice(0, 10);
    localStorage.setItem('dictHistory', JSON.stringify(this.history));
    this.renderHistory();
  },

  renderHistory() {
    const container = document.getElementById('dict-history');
    if (!container) return;
    container.innerHTML = this.history.map(w => 
      `<span class="history-tag" onclick="Dict.search('${w}')">${w}</span>`
    ).join('') || '<span style="color:var(--text-muted);font-size:.85em">Aucune recherche</span>';
  },

  init() {
    this.renderHistory();
    const input = document.getElementById('dict-input');
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.search(input.value);
    });
  }
};

function searchWord() {
  Dict.search(document.getElementById('dict-input').value);
}

document.addEventListener('DOMContentLoaded', () => Dict.init());