/* ============================================================
   RECONNAISSANCE IMAGE (MobileNet) + OCR (Tesseract)
============================================================ */
let model = null, stream = null, lastOCRText = "";

async function loadModel() {
  if (model) return model;
  document.getElementById('image-text').textContent = "⏳ Chargement IA...";
  try {
    model = await mobilenet.load();
    document.getElementById('image-text').textContent = "✅ Prêt !";
  } catch (err) {
    document.getElementById('image-text').textContent = "❌ Erreur modèle";
  }
  return model;
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 } }
    });
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.classList.add('active');
    document.getElementById('btn-start-cam').disabled = true;
    document.getElementById('btn-stop-cam').disabled = false;
    document.getElementById('btn-analyze').style.display = 'block';
    await loadModel();
  } catch (err) {
    App.toast("Caméra inaccessible : " + err.message);
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
    const video = document.getElementById('video');
    video.classList.remove('active');
    document.getElementById('btn-start-cam').disabled = false;
    document.getElementById('btn-stop-cam').disabled = true;
    document.getElementById('btn-analyze').style.display = 'none';
  }
}

async function analyzeFrame() {
  const video = document.getElementById('video');
  if (!video.srcObject) return;
  const m = await loadModel();
  if (!m) return;
  const result = await m.classify(video);
  displayImageResult(result);
}

async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = async () => {
    const m = await loadModel();
    if (!m) return;
    const result = await m.classify(img);
    displayImageResult(result);
  };
  img.src = URL.createObjectURL(file);
}

function displayImageResult(predictions) {
  if (!predictions?.length) {
    document.getElementById('image-text').textContent = "❌ Aucune reconnaissance.";
    return;
  }
  let html = predictions.map(p => 
    `• <b>${p.className}</b> (${(p.probability * 100).toFixed(1)}%)`
  ).join('<br>');
  document.getElementById('image-text').innerHTML = html;
  const word = predictions[0].className.split(',')[0].trim();
  speak(word);
  App.addPoints(3);
}

/* ===== OCR ===== */
async function handleOCR(e) {
  const file = e.target.files[0];
  if (!file) return;
  const ocrText = document.getElementById('ocr-text');
  ocrText.textContent = "⏳ Analyse en cours...";
  try {
    const { data: { text } } = await Tesseract.recognize(file, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          ocrText.textContent = `⏳ ${Math.round(m.progress * 100)}%`;
        }
      }
    });
    lastOCRText = text.trim();
    ocrText.textContent = lastOCRText || "❌ Aucun texte détecté.";
    if (lastOCRText) App.addPoints(5);
  } catch (err) {
    ocrText.textContent = "❌ Erreur : " + err.message;
  }
}

function speakText() {
  if (lastOCRText) speak(lastOCRText);
}

function copyOCR() {
  if (lastOCRText) {
    navigator.clipboard.writeText(lastOCRText);
    App.toast("📋 Copié !");
  }
}

function defineOCR() {
  if (!lastOCRText) return;
  const firstWord = lastOCRText.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  document.getElementById('dict-input').value = firstWord;
  App.goto('dictionary');
  Dict.search(firstWord);
}