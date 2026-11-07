/* Speech synthesis + Speech recognition */
function speak(text, lang = 'en-US') {
  if (!text || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

let recognition = null;
function startListening(callback) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    App.toast("Reconnaissance vocale non supportée");
    return;
  }
  recognition = new SR();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    callback(text);
  };
  recognition.onerror = () => App.toast("Erreur micro");
  recognition.start();
}