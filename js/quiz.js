/* ============================================================
   QUIZ avec niveaux et progression
============================================================ */
const quizData = [
  { level: "beginner", q: "Comment dit-on « Bonjour » ?", options: ["Goodbye", "Hello", "Thanks", "Please"], answer: 1 },
  { level: "beginner", q: "Traduisez : « Je mange une pomme »", options: ["I eat a apple", "I eat an apple", "I eating apple", "I eats an apple"], answer: 1 },
  { level: "beginner", q: "« I have ___ orange. »", options: ["a", "an", "the", "some"], answer: 1 },
  { level: "beginner", q: "Quel est le pluriel de « child » ?", options: ["childs", "childrens", "children", "childes"], answer: 2 },
  { level: "intermediate", q: "« She ___ to school every day. »", options: ["go", "goes", "going", "gone"], answer: 1 },
  { level: "intermediate", q: "Quel est le passé de « go » ?", options: ["goed", "gone", "went", "going"], answer: 2 },
  { level: "intermediate", q: "Traduisez : « Le chat est sur la table »", options: ["The cat is in the table", "The cat is on the table", "A cat is under table", "Cat on table"], answer: 1 },
  { level: "intermediate", q: "« If I ___ rich, I would travel. »", options: ["am", "was", "were", "be"], answer: 2 },
  { level: "advanced", q: "« He suggested that she ___ earlier. »", options: ["comes", "come", "came", "will come"], answer: 1 },
  { level: "advanced", q: "« By next year, I ___ here for 5 years. »", options: ["will work", "will be working", "will have worked", "work"], answer: 2 },
  { level: "advanced", q: "« Hardly ___ the door when the phone rang. »", options: ["I had closed", "had I closed", "I closed", "did I close"], answer: 1 },
];

let quizScore = 0, quizTotal = 0, currentQ = null, currentLevel = "all", questionCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.dataset.level;
      quizScore = quizTotal = questionCount = 0;
      updateQuizScore();
      nextQuestion();
    });
  });
});

function getFilteredQuestions() {
  return currentLevel === 'all' ? quizData : quizData.filter(q => q.level === currentLevel);
}

function nextQuestion() {
  const pool = getFilteredQuestions();
  if (!pool.length) return;
  currentQ = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('quiz-question').textContent = currentQ.q;
  
  const opts = document.getElementById('quiz-options');
  opts.innerHTML = '';
  const indices = [...Array(4).keys()].sort(() => Math.random() - 0.5);
  indices.forEach(i => {
    const b = document.createElement('button');
    b.textContent = currentQ.options[i];
    b.onclick = () => checkAnswer(b, i === currentQ.answer);
    opts.appendChild(b);
  });

  questionCount++;
  updateQuizProgress();
}

function checkAnswer(btn, isCorrect) {
  document.querySelectorAll('#quiz-options button').forEach(b => b.disabled = true);
  if (isCorrect) {
    btn.classList.add('correct');
    quizScore++;
    App.addPoints(10);
    App.toast("✅ Bravo ! +10 points");
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('#quiz-options button').forEach(b => {
      if (b.textContent === currentQ.options[currentQ.answer]) b.classList.add('correct');
    });
    App.toast("❌ Faux, réessayez !");
  }
  quizTotal++;
  updateQuizScore();
}

function updateQuizScore() {
  document.getElementById('quiz-score').textContent = `Score : ${quizScore} / ${quizTotal}`;
}

function updateQuizProgress() {
  const bar = document.getElementById('quiz-progress');
  if (bar) bar.style.width = Math.min(questionCount * 10, 100) + '%';
}

nextQuestion();