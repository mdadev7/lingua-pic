/* ============================================================
   APP - Navigation, thème, PWA, toast, stats
============================================================ */
const App = {
  state: {
    points: parseInt(localStorage.getItem('points') || '0'),
    streak: parseInt(localStorage.getItem('streak') || '0'),
    lastVisit: localStorage.getItem('lastVisit') || null,
    theme: localStorage.getItem('theme') || 'light'
  },

  init() {
    this.initTheme();
    this.initNavigation();
    this.initStats();
    this.initPWA();
    Lessons.render();
  },

  initTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const btn = document.getElementById('theme-toggle');
    btn.textContent = this.state.theme === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.state.theme);
      btn.textContent = this.state.theme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', this.state.theme);
    });
  },

  initNavigation() {
    document.querySelectorAll('[data-goto]').forEach(el => {
      el.addEventListener('click', () => this.goto(el.dataset.goto));
    });
  },

  goto(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const page = document.getElementById('page-' + pageName);
    if (page) page.classList.add('active');
    
    const navBtn = document.querySelector(`.nav-item[data-goto="${pageName}"]`);
    if (navBtn) navBtn.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  initStats() {
    // Streak logic
    const today = new Date().toDateString();
    if (this.state.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      this.state.streak = (this.state.lastVisit === yesterday) ? this.state.streak + 1 : 1;
      this.state.lastVisit = today;
      localStorage.setItem('streak', this.state.streak);
      localStorage.setItem('lastVisit', today);
    }
    this.updateStats();
  },

  addPoints(n) {
    this.state.points += n;
    localStorage.setItem('points', this.state.points);
    this.updateStats();
  },

  updateStats() {
    document.getElementById('points-display').textContent = this.state.points;
    document.getElementById('streak-display').textContent = this.state.streak;
  },

  toast(msg, duration = 2000) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), duration);
  },

  initPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());