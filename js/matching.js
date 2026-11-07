const matchPairs = [
  { en: "Apple", fr: "Pomme" }, { en: "House", fr: "Maison" },
  { en: "Book", fr: "Livre" }, { en: "Water", fr: "Eau" },
  { en: "Dog", fr: "Chien" }, { en: "Sun", fr: "Soleil" },
  { en: "Car", fr: "Voiture" }, { en: "Tree", fr: "Arbre" },
  { en: "Bird", fr: "Oiseau" }, { en: "Flower", fr: "Fleur" }
];

let selectedEn = null, selectedFr = null, matchedCount = 0;

function initMatching() {
  const colEn = document.getElementById('col-en');
  const colFr = document.getElementById('col-fr');
  if (!colEn || !colFr) return;
  colEn.innerHTML = colFr.innerHTML = '';
  selectedEn = selectedFr = null;
  matchedCount = 0;
  document.getElementById('match-score').textContent = '';

  const pairs = [...matchPairs].sort(() => Math.random() - 0.5).slice(0, 5);
  const enList = pairs.map(p => p.en).sort(() => Math.random() - 0.5);
  const frList = pairs.map(p => p.fr).sort(() => Math.random() - 0.5);

  enList.forEach(w => {
    const d = document.createElement('div');
    d.className = 'match-item';
    d.textContent = w;
    d.dataset.word = w;
    d.onclick = () => selectEn(d);
    colEn.appendChild(d);
  });
  frList.forEach(w => {
    const d = document.createElement('div');
    d.className = 'match-item';
    d.textContent = w;
    d.dataset.word = w;
    d.onclick = () => selectFr(d);
    colFr.appendChild(d);
  });
}

function selectEn(el) {
  if (el.classList.contains('matched')) return;
  document.querySelectorAll('#col-en .match-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  selectedEn = el;
  tryMatch();
}
function selectFr(el) {
  if (el.classList.contains('matched')) return;
  document.querySelectorAll('#col-fr .match-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  selectedFr = el;
  tryMatch();
}
function tryMatch() {
  if (!selectedEn || !selectedFr) return;
  const pair = matchPairs.find(p => p.en === selectedEn.dataset.word);
  if (pair && pair.fr === selectedFr.dataset.word) {
    selectedEn.classList.remove('selected');
    selectedFr.classList.remove('selected');
    selectedEn.classList.add('matched');
    selectedFr.classList.add('matched');
    speak(selectedEn.dataset.word);
    matchedCount++;
    App.addPoints(5);
    const total = document.querySelectorAll('#col-en .match-item').length;
    document.getElementById('match-score').textContent = `✅ ${matchedCount} / ${total} paires`;
    if (matchedCount === total) {
      document.getElementById('match-score').textContent = '🎉 Bravo ! Toutes les paires trouvées !';
      App.addPoints(20);
    }
  } else {
    setTimeout(() => {
      selectedEn.classList.remove('selected');
      selectedFr.classList.remove('selected');
    }, 400);
  }
  selectedEn = selectedFr = null;
}

document.addEventListener('DOMContentLoaded', initMatching);