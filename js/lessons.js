const Lessons = {
  data: [
    {
      title: "Les salutations",
      words: ["Hello", "Good morning", "Good evening", "Goodbye", "Please", "Thank you"],
      rule: "👉 <b>Hello</b> : salutation informelle<br><b>Good morning</b> : avant 12h<br><b>Good evening</b> : après 18h"
    },
    {
      title: "Le présent simple",
      words: ["I play", "She plays", "They don't play"],
      rule: "Structure : <b>Sujet + verbe</b> (+s à la 3ème personne)<br>• I <b>play</b> football.<br>• She <b>plays</b> football.<br>• They <b>don't play</b> tennis."
    },
    {
      title: "Les couleurs",
      words: ["Red", "Blue", "Green", "Yellow", "Black", "White"],
      rule: "Cliquez sur un mot pour l'entendre prononcé."
    },
    {
      title: "Les articles a / an / the",
      words: ["a cat", "an apple", "the sun"],
      rule: "• <b>a</b> devant consonne<br>• <b>an</b> devant voyelle<br>• <b>the</b> = défini (le/la/les)"
    },
    {
      title: "Les nombres",
      words: ["One", "Two", "Three", "Four", "Five", "Ten", "Twenty"],
      rule: "De 1 à 20 : à mémoriser progressivement."
    },
    {
      title: "Le passé simple",
      words: ["I went", "She saw", "They ate"],
      rule: "Verbes irréguliers courants :<br>go → went, see → saw, eat → ate."
    },
    {
      title: "Les questions",
      words: ["What is your name?", "How old are you?", "Where do you live?"],
      rule: "Structure : <b>Mot interrogatif + auxiliaire + sujet + verbe</b>."
    }
  ],

  render() {
    const container = document.getElementById('lessons-container');
    if (!container) return;
    container.innerHTML = this.data.map(l => `
      <div class="lesson-card">
        <h3>${l.title}</h3>
        <div>${l.words.map(w => `<span class="word" onclick="speak('${w.replace(/'/g, "\\'")}')">${w}</span>`).join('')}</div>
        <div class="rule">${l.rule}</div>
      </div>
    `).join('');
  }
};