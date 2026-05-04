// ───────────────────────────────────────────────
// MarketQuest — app.js
// ───────────────────────────────────────────────

const { WORLDS, PREREQS, BADGES, QUOTES, QUESTS } = window.MARKETQUEST_CONTENT;

// ─── State management ───
const STATE_KEY = 'marketquest_v1';

const defaultState = {
  onboarded: false,
  name: '',
  level: 0,             // 0=beginner, 1=SIP, 2=trader
  pace: 5,              // minutes/day
  xp: 0,
  streakCount: 0,
  lastActiveDate: null,
  completedQuests: [],
  prereqsDone: [],
  earnedBadges: [],
  glossaryTerms: [],
  trades: [],
  theme: 'warm',
  reminderTime: '20:00',
  reminderNotificationsEnabled: false,
  lastReminderSentDate: null,
  lastDailyRewardDate: null,
  startedDate: null
};

let state = loadState();
let reminderTimer = null;
let reminderWatchersBound = false;

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (e) {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// ─── Streak logic ───
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function daysBetween(a, b) {
  const ms = 1000 * 60 * 60 * 24;
  return Math.round((new Date(b) - new Date(a)) / ms);
}
function updateStreak() {
  const today = todayISO();
  if (!state.lastActiveDate) {
    state.streakCount = 1;
  } else {
    const days = daysBetween(state.lastActiveDate, today);
    if (days === 0) {
      // already active today, no change
    } else if (days === 1) {
      state.streakCount += 1;
    } else {
      state.streakCount = 1;
    }
  }
  state.lastActiveDate = today;
  saveState();
}

function awardDailyLearningReward() {
  const today = todayLocalISO();
  if (state.lastDailyRewardDate === today) return;

  const reward = state.streakCount >= 14 ? 20 : state.streakCount >= 7 ? 15 : 10;
  state.lastDailyRewardDate = today;
  saveState();
  awardXP(reward);
  toast(`🎁 Daily learning reward +${reward} 🪙`);
}

// ─── XP & Levels ───
function getLevelFromXP(xp) {
  // Level up every 200 XP, capped at 20
  return Math.min(20, Math.floor(xp / 200) + 1);
}
function awardXP(amount) {
  const oldLevel = getLevelFromXP(state.xp);
  state.xp += amount;
  const newLevel = getLevelFromXP(state.xp);
  saveState();
  refreshTopBar();
  if (newLevel > oldLevel) {
    setTimeout(() => {
      toast(`✨ Level ${newLevel}! Keep going!`);
      confetti();
    }, 600);
  }
}

// ─── Badges ───
function checkBadges() {
  const newlyEarned = [];

  function tryEarn(id) {
    if (!state.earnedBadges.includes(id)) {
      state.earnedBadges.push(id);
      newlyEarned.push(id);
    }
  }

  if (state.completedQuests.length >= 1) tryEarn('first-step');
  if (state.streakCount >= 7) tryEarn('week-warrior');
  if (state.streakCount >= 14) tryEarn('fortnight');
  if (state.streakCount >= 30) tryEarn('monthly');

  // World completion badges
  const worldComplete = (worldId) => {
    const w = WORLDS.find(w => w.id === worldId);
    return w.questIds.every(qid => state.completedQuests.includes(qid));
  };
  if (worldComplete(1)) tryEarn('world-1');
  if (worldComplete(3)) tryEarn('risk-master');
  if (worldComplete(4)) tryEarn('psychology');
  if (worldComplete(5)) tryEarn('chart-reader');
  if (worldComplete(6)) tryEarn('fundamentalist');
  if (worldComplete(8)) tryEarn('strategist');

  if (state.trades.length >= 1) tryEarn('paper-trader');
  if (state.trades.length >= 10) tryEarn('ten-trades');
  if (state.trades.length >= 50) tryEarn('fifty-trades');

  if (state.prereqsDone.length === PREREQS.length) tryEarn('foundation');

  // Graduate (all worlds)
  if (WORLDS.every(w => w.questIds.every(qid => state.completedQuests.includes(qid)))) {
    tryEarn('graduate');
  }

  if (newlyEarned.length > 0) {
    saveState();
    newlyEarned.forEach((id, i) => {
      setTimeout(() => {
        const badge = BADGES.find(b => b.id === id);
        toast(`🏅 Badge earned: ${badge.name}`);
        confetti();
      }, 1000 + i * 1500);
    });
  }
}

// ─── Quest unlock logic ───
function isQuestUnlocked(questId) {
  if (questId === 1) return true;
  // Sequential unlock — must complete previous quest
  return state.completedQuests.includes(questId - 1);
}

function nextUnfinishedQuest() {
  for (const w of WORLDS) {
    for (const qid of w.questIds) {
      if (!state.completedQuests.includes(qid)) return qid;
    }
  }
  return null; // all done
}

function todayLocalISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseReminderTime(value = state.reminderTime) {
  const [h, m] = String(value || '').split(':').map(v => parseInt(v, 10));
  const hours = Number.isFinite(h) ? Math.min(Math.max(h, 0), 23) : 20;
  const minutes = Number.isFinite(m) ? Math.min(Math.max(m, 0), 59) : 0;
  return { hours, minutes };
}

function formatReminderTime(value = state.reminderTime) {
  const { hours, minutes } = parseReminderTime(value);
  const sample = new Date();
  sample.setHours(hours, minutes, 0, 0);
  return sample.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function notificationsSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function reminderPermissionState() {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

async function requestReminderPermission() {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    return await Notification.requestPermission();
  } catch (e) {
    return Notification.permission;
  }
}

function isReminderDue(now = new Date()) {
  const { hours, minutes } = parseReminderTime();
  const trigger = new Date(now);
  trigger.setHours(hours, minutes, 0, 0);
  return now >= trigger;
}

function getReminderMessage() {
  const nextId = nextUnfinishedQuest();
  if (nextId) {
    const quest = QUESTS[nextId];
    return `Today's quest: ${quest.title} (${quest.minutes} min). Keep your streak alive.`;
  }
  return 'You finished the curriculum. Review your journal and keep your edge sharp.';
}

function sendNativeNotification(title, body) {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;
  try {
    new Notification(title, {
      body,
      tag: 'marketquest-daily',
      renotify: false
    });
    return true;
  } catch (e) {
    return false;
  }
}

function deliverDailyReminder(source = 'timer') {
  const today = todayLocalISO();
  if (state.lastReminderSentDate === today && source !== 'test') return false;
  const message = getReminderMessage();
  const notified = sendNativeNotification('MarketQuest Daily Quest', message);
  if (!document.hidden || !notified) {
    toast(`⏰ ${message}`);
  }
  if (source !== 'test') {
    state.lastReminderSentDate = today;
    saveState();
  }
  return true;
}

function scheduleDailyReminder() {
  clearTimeout(reminderTimer);
  reminderTimer = null;
  if (!state.reminderNotificationsEnabled) return;
  if (reminderPermissionState() !== 'granted') return;

  const now = new Date();
  const { hours, minutes } = parseReminderTime();
  const next = new Date(now);
  next.setHours(hours, minutes, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const msUntilReminder = Math.max(1000, next.getTime() - now.getTime());
  reminderTimer = setTimeout(() => {
    deliverDailyReminder('timer');
    scheduleDailyReminder();
  }, msUntilReminder);
}

function syncReminderSettingsWithPermission() {
  const permission = reminderPermissionState();
  if (permission !== 'granted' && state.reminderNotificationsEnabled) {
    state.reminderNotificationsEnabled = false;
    saveState();
  }
}

function maybeSendCatchupReminder() {
  if (!state.reminderNotificationsEnabled) return;
  if (isReminderDue()) deliverDailyReminder('catchup');
}

function setupReminderWatchers() {
  if (reminderWatchersBound) return;
  reminderWatchersBound = true;

  window.addEventListener('focus', () => {
    maybeSendCatchupReminder();
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) maybeSendCatchupReminder();
  });
}

function renderReminderSettings() {
  const status = document.getElementById('reminderStatus');
  const hint = document.getElementById('reminderHint');
  const enableBtn = document.getElementById('enableReminders');
  const testBtn = document.getElementById('testReminder');
  if (!status || !hint || !enableBtn || !testBtn) return;

  const permission = reminderPermissionState();
  const isEnabled = state.reminderNotificationsEnabled && permission === 'granted';

  status.className = 'small reminder-status';
  if (permission === 'unsupported') {
    status.textContent = 'Not supported on this browser.';
    status.classList.add('error');
    hint.textContent = 'Use a modern mobile browser to enable daily reminders.';
    enableBtn.disabled = true;
    testBtn.disabled = true;
    enableBtn.textContent = 'Not supported';
    return;
  }

  if (permission === 'denied') {
    status.textContent = 'Notifications blocked in browser settings.';
    status.classList.add('error');
    hint.textContent = 'Allow notifications in browser/site settings, then enable reminders.';
    enableBtn.disabled = false;
    testBtn.disabled = true;
    enableBtn.textContent = 'Retry permission';
    return;
  }

  if (isEnabled) {
    status.textContent = `On · Daily at ${formatReminderTime()}`;
    status.classList.add('ok');
    hint.textContent = 'Best experience on mobile when the app is installed and opened regularly.';
    enableBtn.disabled = false;
    testBtn.disabled = false;
    enableBtn.textContent = 'Pause reminders';
    return;
  }

  if (permission === 'granted') {
    status.textContent = 'Permission granted · reminders currently paused.';
    status.classList.add('warn');
    hint.textContent = 'Turn reminders on to get your daily quest nudge.';
    enableBtn.disabled = false;
    testBtn.disabled = false;
    enableBtn.textContent = 'Enable reminders';
    return;
  }

  status.textContent = 'Permission not granted yet.';
  status.classList.add('warn');
  hint.textContent = 'Tap enable to allow notifications and set your daily reminder.';
  enableBtn.disabled = false;
  testBtn.disabled = true;
  enableBtn.textContent = 'Enable reminders';
}

function renderThemeSettings() {
  const options = document.querySelectorAll('#themePicker .theme-option');
  options.forEach((btn) => {
    const active = btn.dataset.theme === state.theme;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

// ─── ONBOARDING ───
function initOnboarding() {
  const ob = document.getElementById('onboarding');
  const app = document.getElementById('app');

  if (state.onboarded) {
    ob.classList.add('hidden');
    app.classList.remove('hidden');
    return;
  }
  ob.classList.remove('hidden');
  app.classList.add('hidden');

  let step = 1;
  const dots = ob.querySelectorAll('.onboarding-progress .dot');

  function showStep(n) {
    ob.querySelectorAll('.onboarding-step').forEach(s => {
      s.classList.toggle('hidden', parseInt(s.dataset.step) !== n);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === n - 1));
    step = n;
  }

  // Step 1: name
  const nameInput = document.getElementById('userName');
  const nameContinueBtn = document.getElementById('nameContinueBtn');
  const nameHelp = document.getElementById('nameHelp');

  function normalizedName(raw) {
    return raw.replace(/\s+/g, ' ').trim();
  }

  function updateNameStepState() {
    const value = normalizedName(nameInput.value);
    const valid = value.length > 0;
    nameContinueBtn.disabled = !valid;
    nameHelp.textContent = valid ? 'Looks good. Continue to customize your learning path.' : 'Type your name to continue.';
  }

  function proceedFromNameStep() {
    const value = normalizedName(nameInput.value);
    if (!value) return;
    state.name = value;
    showStep(2);
  }

  nameInput.value = state.name || '';
  updateNameStepState();

  nameInput.addEventListener('input', updateNameStepState);
  nameContinueBtn.addEventListener('click', proceedFromNameStep);
  nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') proceedFromNameStep();
  });

  // Step 2: level
  ob.querySelectorAll('[data-level]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.level = parseInt(btn.dataset.level);
      showStep(3);
    });
  });

  // Step 3: pace
  ob.querySelectorAll('[data-minutes]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.pace = parseInt(btn.dataset.minutes);
      showStep(4);
    });
  });

  // Step 4: start
  document.getElementById('startJourney').addEventListener('click', () => {
    if (!state.name) {
      showStep(1);
      nameInput.focus();
      updateNameStepState();
      return;
    }
    state.onboarded = true;
    state.startedDate = todayISO();
    saveState();
    ob.classList.add('hidden');
    app.classList.remove('hidden');
    initApp();
    confetti();
    toast(`Welcome, ${state.name}! 🌱`);
  });
}

// ─── App init ───
function initApp() {
  syncReminderSettingsWithPermission();
  applyTheme(state.theme);
  refreshTopBar();
  updateStreak();
  awardDailyLearningReward();
  renderHome();
  renderQuestMap();
  renderPrereqs();
  renderJournal();
  renderBadges();
  renderGlossary();
  setupNavigation();
  setupModals();
  renderThemeSettings();
  setupReminderWatchers();
  renderReminderSettings();
  maybeSendCatchupReminder();
  scheduleDailyReminder();
  checkBadges();
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
}

function refreshTopBar() {
  document.getElementById('streakCount').textContent = state.streakCount;
  document.getElementById('xpCount').textContent = state.xp;
  document.getElementById('levelCount').textContent = getLevelFromXP(state.xp);
}

// ─── HOME view ───
function renderHome() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const displayName = (state.name || '').trim();
  const totalQuests = Object.keys(QUESTS).length;
  const doneQuests = state.completedQuests.length;
  const progressPct = Math.round((doneQuests / totalQuests) * 100);

  document.getElementById('greetingText').textContent = displayName ? `${greeting}, ${displayName}` : greeting;
  if (doneQuests === 0) {
    document.getElementById('greetingSub').textContent = 'Start with one 5-minute quest today. Momentum beats intensity.';
  } else if (doneQuests < totalQuests) {
    document.getElementById('greetingSub').textContent = `You're ${progressPct}% through the journey. Keep stacking small wins.`;
  } else {
    document.getElementById('greetingSub').textContent = 'Curriculum complete. Keep leveling up with journaling and review.';
  }

  // Streak banner
  const banner = document.getElementById('streakBanner');
  if (state.streakCount > 1) {
    banner.classList.add('visible');
    banner.innerHTML = `🔥 You're on a <strong>${state.streakCount}-day</strong> streak. Don't break the chain!`;
  } else {
    banner.classList.remove('visible');
    banner.innerHTML = '';
  }

  // Today's quest
  const next = nextUnfinishedQuest();
  if (next) {
    const q = QUESTS[next];
    document.getElementById('todayQuestTitle').textContent = q.title;
    document.getElementById('todayQuestDesc').textContent = WORLDS.find(w => w.id === q.world).description;
    document.getElementById('todayQuestTime').textContent = `⏱ ${q.minutes} min`;
    document.getElementById('todayQuestXP').textContent = `🪙 +${q.xp}`;
    document.getElementById('startQuestBtn').onclick = () => openLesson(next);
    document.getElementById('startQuestBtn').textContent = 'Start quest →';
  } else {
    document.getElementById('todayQuestTitle').textContent = '🎓 You finished the curriculum!';
    document.getElementById('todayQuestDesc').textContent = 'Now the real journey begins. Continue paper trading and journaling.';
    document.getElementById('startQuestBtn').textContent = 'View badges';
    document.getElementById('startQuestBtn').onclick = () => switchView('badges');
  }

  // Progress bars
  document.getElementById('questProgress').style.width = `${(doneQuests / totalQuests) * 100}%`;
  document.getElementById('questProgressText').textContent = `${doneQuests} of ${totalQuests} quests`;

  const donePrereqs = state.prereqsDone.length;
  document.getElementById('prereqProgress').style.width = `${(donePrereqs / PREREQS.length) * 100}%`;
  document.getElementById('prereqProgressText').textContent = `${donePrereqs} of ${PREREQS.length} done`;

  // Daily quote
  const quote = QUOTES[new Date().getDate() % QUOTES.length];
  document.getElementById('dailyQuote').textContent = quote;
}

// ─── QUEST MAP ───
function renderQuestMap() {
  const map = document.getElementById('questMap');
  map.innerHTML = '';
  WORLDS.forEach(w => {
    const worldEl = document.createElement('div');
    worldEl.className = 'world';
    const completedCount = w.questIds.filter(q => state.completedQuests.includes(q)).length;
    worldEl.innerHTML = `
      <div class="world-header">
        <span class="world-num">${w.icon}</span>
        <div>
          <div class="world-title">${w.title}</div>
          <div class="muted small">${w.description} · ${completedCount}/${w.questIds.length} done</div>
        </div>
      </div>
      <div class="world-quests"></div>
    `;
    const grid = worldEl.querySelector('.world-quests');
    w.questIds.forEach(qid => {
      const q = QUESTS[qid];
      const completed = state.completedQuests.includes(qid);
      const unlocked = isQuestUnlocked(qid);
      const tile = document.createElement('div');
      tile.className = `quest-tile ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`;
      tile.innerHTML = `
        <div class="quest-tile-num">QUEST ${qid}</div>
        <div class="quest-tile-title">${q.title}</div>
        <div class="quest-tile-meta">
          <span>⏱ ${q.minutes}m</span>
          <span>🪙 ${q.xp}</span>
        </div>
        <div class="quest-tile-status">${completed ? '✓' : (!unlocked ? '🔒' : '')}</div>
      `;
      if (unlocked && !completed) {
        tile.addEventListener('click', () => openLesson(qid));
      } else if (completed) {
        tile.addEventListener('click', () => openLesson(qid)); // allow review
      }
      grid.appendChild(tile);
    });
    map.appendChild(worldEl);
  });
}

// ─── PREREQS ───
function renderPrereqs() {
  const list = document.getElementById('prereqList');
  list.innerHTML = '';
  PREREQS.forEach(p => {
    const done = state.prereqsDone.includes(p.id);
    const el = document.createElement('div');
    el.className = `prereq-item ${done ? 'checked' : ''}`;
    el.innerHTML = `
      <div class="prereq-checkbox">${done ? '✓' : ''}</div>
      <div class="prereq-text">
        <div class="prereq-title">${p.title}</div>
        <div class="prereq-desc">${p.desc}</div>
      </div>
    `;
    el.addEventListener('click', () => {
      if (done) {
        state.prereqsDone = state.prereqsDone.filter(id => id !== p.id);
      } else {
        state.prereqsDone.push(p.id);
        awardXP(p.xp);
        toast(`+${p.xp} 🪙 Foundation strengthened!`);
      }
      saveState();
      renderPrereqs();
      renderHome();
      checkBadges();
    });
    list.appendChild(el);
  });
}

// ─── BADGES ───
function renderBadges() {
  const grid = document.getElementById('badgeGrid');
  grid.innerHTML = '';
  BADGES.forEach(b => {
    const earned = state.earnedBadges.includes(b.id);
    const el = document.createElement('div');
    el.className = `badge ${earned ? 'earned' : 'locked'}`;
    el.innerHTML = `
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    `;
    grid.appendChild(el);
  });
}

// ─── GLOSSARY ───
function renderGlossary(filter = '') {
  const list = document.getElementById('glossaryList');
  list.innerHTML = '';
  const f = filter.toLowerCase();
  const terms = state.glossaryTerms.filter(t =>
    t.term.toLowerCase().includes(f) || t.def.toLowerCase().includes(f)
  );
  if (terms.length === 0) {
    list.innerHTML = `<p class="muted">${state.glossaryTerms.length === 0 ? 'Complete quests to unlock terms.' : 'No matches.'}</p>`;
    return;
  }
  terms.forEach(t => {
    const el = document.createElement('div');
    el.className = 'glossary-item';
    el.innerHTML = `
      <div class="glossary-term">${t.term}</div>
      <div class="glossary-def">${t.def}</div>
    `;
    list.appendChild(el);
  });
}

document.getElementById('glossarySearch').addEventListener('input', e => renderGlossary(e.target.value));

// ─── JOURNAL ───
function computeJournalStats() {
  const closed = state.trades.filter(t => t.exit && parseFloat(t.exit) > 0);
  const wins = closed.filter(t => pnlOf(t) > 0);
  const total = closed.length;
  const winRate = total > 0 ? (wins.length / total * 100).toFixed(0) + '%' : '—';

  let avgR = '—';
  if (closed.length > 0) {
    const rs = closed.map(t => {
      const risk = Math.abs(parseFloat(t.entry) - parseFloat(t.stop));
      const result = pnlOf(t) / parseFloat(t.qty);
      return result / risk;
    });
    const sum = rs.reduce((a, b) => a + b, 0);
    avgR = (sum / rs.length).toFixed(2) + 'R';
  }

  return { total: state.trades.length, winRate, avgR };
}

function pnlOf(t) {
  const entry = parseFloat(t.entry), exit = parseFloat(t.exit), qty = parseFloat(t.qty);
  if (!exit || isNaN(exit)) return 0;
  return (exit - entry) * qty;
}

function renderJournal() {
  const stats = computeJournalStats();
  document.getElementById('jsTotalTrades').textContent = stats.total;
  document.getElementById('jsWinRate').textContent = stats.winRate;
  document.getElementById('jsAvgR').textContent = stats.avgR;

  const list = document.getElementById('journalList');
  list.innerHTML = '';
  if (state.trades.length === 0) {
    list.innerHTML = `<p class="muted" style="padding: 2rem; text-align: center;">No trades yet. After Quest 25, log your first paper trade here.</p>`;
    return;
  }
  state.trades.slice().reverse().forEach((t, idx) => {
    const pnl = pnlOf(t);
    const isOpen = !t.exit;
    const cls = isOpen ? 'open' : (pnl >= 0 ? '' : 'loss');
    const el = document.createElement('div');
    el.className = `trade-row ${cls}`;
    el.innerHTML = `
      <div>
        <div class="trade-symbol">${t.symbol}</div>
        <div class="trade-meta">${t.date} · ${t.mode}</div>
      </div>
      <div>
        <div class="trade-meta">Entry ₹${t.entry} · Stop ₹${t.stop}${t.target ? ' · Target ₹' + t.target : ''}</div>
        <div class="trade-meta">${t.setup || '—'} · Qty ${t.qty}</div>
      </div>
      <div class="trade-pnl ${isOpen ? '' : (pnl >= 0 ? 'win' : 'loss')}">
        ${isOpen ? 'open' : (pnl >= 0 ? '+' : '') + '₹' + Math.round(pnl)}
      </div>
    `;
    list.appendChild(el);
  });
}

document.getElementById('addTradeBtn').addEventListener('click', () => {
  document.getElementById('tradeModal').classList.remove('hidden');
  document.querySelector('input[name="date"]').value = todayISO();
});
document.getElementById('closeTrade').addEventListener('click', () => {
  document.getElementById('tradeModal').classList.add('hidden');
});
document.querySelector('input[name="emotion"]').addEventListener('input', e => {
  document.getElementById('emotionVal').textContent = e.target.value;
});
document.getElementById('tradeForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const trade = {};
  fd.forEach((v, k) => trade[k] = v);
  state.trades.push(trade);
  saveState();
  document.getElementById('tradeModal').classList.add('hidden');
  e.target.reset();
  renderJournal();
  renderHome();
  checkBadges();
  awardXP(15);
  toast('+15 🪙 Trade logged');
});

// ─── NAVIGATION ───
function switchView(name) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.dataset.view === name));
  // re-render relevant view in case data changed
  if (name === 'home') renderHome();
  if (name === 'map') renderQuestMap();
  if (name === 'prereqs') renderPrereqs();
  if (name === 'journal') renderJournal();
  if (name === 'badges') renderBadges();
  if (name === 'glossary') renderGlossary();
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
}

// ─── LESSON FLOW ───
let currentLesson = null;
let currentStepIdx = 0;
let quizAnswered = false;

function openLesson(questId) {
  const q = QUESTS[questId];
  if (!q) return;
  currentLesson = { id: questId, ...q };
  currentStepIdx = 0;
  quizAnswered = false;
  document.getElementById('lessonModal').classList.remove('hidden');
  renderLessonStep();
}

function renderLessonStep() {
  const total = currentLesson.steps.length;
  const idx = currentStepIdx;
  const step = currentLesson.steps[idx];
  const body = document.getElementById('lessonBody');

  document.getElementById('lessonProgressFill').style.width = `${((idx + 1) / total) * 100}%`;

  if (step.type === 'info') {
    body.innerHTML = `<div class="lesson-step">${step.body}</div>`;
    document.getElementById('lessonNext').textContent = idx === total - 1 ? 'Complete quest ✓' : 'Continue →';
  } else if (step.type === 'quiz') {
    quizAnswered = false;
    body.innerHTML = `
      <div class="lesson-step">
        <h3>Quick check</h3>
        <p>${step.question}</p>
        <div class="quiz-options">
          ${step.options.map((o, i) => `<button class="quiz-option" data-idx="${i}">${o}</button>`).join('')}
        </div>
        <div id="quizFeedback"></div>
      </div>
    `;
    document.getElementById('lessonNext').textContent = 'Continue →';
    document.getElementById('lessonNext').style.opacity = '0.4';
    document.getElementById('lessonNext').style.pointerEvents = 'none';

    body.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const userIdx = parseInt(btn.dataset.idx);
        const isCorrect = userIdx === step.correct;
        body.querySelectorAll('.quiz-option').forEach((b, i) => {
          if (i === step.correct) b.classList.add('correct');
          else if (i === userIdx) b.classList.add('incorrect');
        });
        const feedback = document.getElementById('quizFeedback');
        feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = `${isCorrect ? '✓ Correct!' : '✗ Not quite.'} ${step.explanation}`;
        document.getElementById('lessonNext').style.opacity = '1';
        document.getElementById('lessonNext').style.pointerEvents = 'auto';
      });
    });
  }

  document.getElementById('lessonBack').classList.toggle('hidden', idx === 0);
}

document.getElementById('lessonNext').addEventListener('click', () => {
  if (currentStepIdx < currentLesson.steps.length - 1) {
    currentStepIdx++;
    renderLessonStep();
  } else {
    completeQuest();
  }
});
document.getElementById('lessonBack').addEventListener('click', () => {
  if (currentStepIdx > 0) {
    currentStepIdx--;
    renderLessonStep();
  }
});
document.getElementById('closeLesson').addEventListener('click', () => {
  document.getElementById('lessonModal').classList.add('hidden');
});

function completeQuest() {
  const id = currentLesson.id;
  const wasNew = !state.completedQuests.includes(id);
  if (wasNew) {
    state.completedQuests.push(id);
    awardXP(currentLesson.xp);
    // add glossary terms
    if (currentLesson.glossary) {
      currentLesson.glossary.forEach(g => {
        if (!state.glossaryTerms.find(t => t.term === g.term)) {
          state.glossaryTerms.push(g);
        }
      });
    }
    saveState();
  }
  document.getElementById('lessonModal').classList.add('hidden');
  renderHome();
  renderQuestMap();
  renderGlossary();
  checkBadges();
  if (wasNew) {
    confetti();
    toast(`✓ Quest complete! +${currentLesson.xp} 🪙`);
  }
}

// ─── MODALS / MENU ───
function setupModals() {
  const menuDrawer = document.getElementById('menuDrawer');
  const reminderTime = document.getElementById('reminderTime');
  const themeOptions = document.querySelectorAll('#themePicker .theme-option');

  document.getElementById('menuBtn').addEventListener('click', () => {
    menuDrawer.classList.remove('hidden');
    reminderTime.value = state.reminderTime;
    renderThemeSettings();
    renderReminderSettings();
  });
  document.getElementById('closeMenu').addEventListener('click', () => {
    menuDrawer.classList.add('hidden');
  });
  themeOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTheme = btn.dataset.theme;
      if (!nextTheme || nextTheme === state.theme) return;
      state.theme = nextTheme;
      applyTheme(state.theme);
      saveState();
      renderThemeSettings();
      toast(`Theme changed to ${btn.textContent.trim()}.`);
    });
  });
  reminderTime.addEventListener('change', (e) => {
    state.reminderTime = e.target.value;
    saveState();
    scheduleDailyReminder();
    renderReminderSettings();
    toast(`Reminder time set for ${formatReminderTime()}.`);
  });

  document.getElementById('enableReminders').addEventListener('click', async () => {
    const permission = reminderPermissionState();
    if (permission === 'unsupported') {
      toast('Notifications are not supported on this browser.');
      renderReminderSettings();
      return;
    }

    if (permission === 'granted' && state.reminderNotificationsEnabled) {
      state.reminderNotificationsEnabled = false;
      saveState();
      scheduleDailyReminder();
      renderReminderSettings();
      toast('Daily reminders paused.');
      return;
    }

    const result = await requestReminderPermission();
    if (result === 'granted') {
      state.reminderNotificationsEnabled = true;
      saveState();
      scheduleDailyReminder();
      renderReminderSettings();
      sendNativeNotification('MarketQuest reminders enabled', `Next learning nudge is set for ${formatReminderTime()}.`);
      toast(`Daily reminders enabled for ${formatReminderTime()}.`);
      return;
    }

    state.reminderNotificationsEnabled = false;
    saveState();
    scheduleDailyReminder();
    renderReminderSettings();
    if (result === 'denied') {
      toast('Notification permission denied. Enable it in browser settings anytime.');
    } else {
      toast('Notification permission not granted yet.');
    }
  });

  document.getElementById('testReminder').addEventListener('click', () => {
    if (reminderPermissionState() !== 'granted') {
      toast('Enable notifications first to send a test reminder.');
      return;
    }
    const sent = sendNativeNotification('MarketQuest test reminder', getReminderMessage());
    toast(sent ? '🔔 Test reminder sent.' : `⏰ ${getReminderMessage()}`);
  });

  document.getElementById('exportData').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketquest-data-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  document.getElementById('resetData').addEventListener('click', () => {
    if (confirm('This will erase all your progress. Are you absolutely sure?')) {
      localStorage.removeItem(STATE_KEY);
      location.reload();
    }
  });
}

// ─── TOAST ───
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

// ─── CONFETTI ───
function confetti() {
  const container = document.getElementById('confetti');
  const colors = ['#5A8A6F', '#D9986B', '#D4A93A', '#3D6B52', '#F2DDC9'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.3 + 's';
    piece.style.animationDuration = (1.5 + Math.random()) + 's';
    if (Math.random() > 0.5) piece.style.borderRadius = '50%';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 2500);
  }
}

// ─── BOOT ───
initOnboarding();
if (state.onboarded) {
  initApp();
}
