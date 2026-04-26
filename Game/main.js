const boxContainer = document.getElementById('box-container');
const boxes = Array.from(document.querySelectorAll('#box-container .box'));
const valueContainer = document.getElementById('value-container');
const modePanel = document.getElementById('mode-panel');
const duckCharacter = document.getElementById('duck-character');
const duckName = document.getElementById('duck-name');
const duckDialogue = document.getElementById('duck-dialogue');
const styleShop = document.getElementById('style-shop');

const chapterStrip = document.getElementById('chapter-strip');
const chapterTitle = document.getElementById('chapter-title');
const progressText = document.getElementById('progress-text');
const chapterChip = document.getElementById('chapter-chip');
const chapterStoryHook = document.getElementById('chapter-story-hook');
const chapterLearningGoal = document.getElementById('chapter-learning-goal');
const programmingTag = document.getElementById('programming-tag');
const hintToggleBtn = document.getElementById('hint-toggle-btn');
const hintStatus = document.getElementById('hint-status');
const challengeZone = document.getElementById('challenge-zone');
const effectsLayer = document.getElementById('effects-layer');

const coinsCount = document.getElementById('coins-count');
const bondLevel = document.getElementById('bond-level');
const bondFill = document.getElementById('bond-fill');
const livesTrack = document.getElementById('lives-track');
const coinHudItem = coinsCount ? coinsCount.closest('.hud-item') : null;

const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const journalToggle = document.getElementById('journal-toggle');
const journalPanel = document.getElementById('journal-panel');
const closeJournal = document.getElementById('close-journal');
const shopToggle = document.getElementById('shop-toggle');
const shopPanel = document.getElementById('shop-panel');
const closeShop = document.getElementById('close-shop');
const shopNotice = document.getElementById('shop-notice');
const homeButton = document.getElementById('home-button');

const chapterButtons = document.getElementById('chapter-buttons');
const bgVolumeSlider = document.getElementById('bg-volume');
const sfxVolumeSlider = document.getElementById('sfx-volume');
const gameBgm = document.getElementById('game-bgm');

const assessmentPanel = document.getElementById('assessment-panel');
const assessmentSummary = document.getElementById('assessment-summary');
const assessmentScore = document.getElementById('assessment-score');
const assessmentEarned = document.getElementById('assessment-earned');
const assessmentTotal = document.getElementById('assessment-total');
const continueBtn = document.getElementById('continue-btn');
const endingPanel = document.getElementById('ending-panel');
const endingTitle = document.getElementById('ending-title');
const endingSceneStep = document.getElementById('ending-scene-step');
const endingLine = document.getElementById('ending-line');
const endingSubline = document.getElementById('ending-subline');
const endingNextBtn = document.getElementById('ending-next-btn');
const endingHomeBtn = document.getElementById('ending-home-btn');
const endingCanvas = document.getElementById('ending-canvas');
const endingCanvasContext = endingCanvas ? endingCanvas.getContext('2d') : null;

const chapterCinematic = document.getElementById('chapter-cinematic');
const cinematicChapter = document.getElementById('cinematic-chapter');
const cinematicLine = document.getElementById('cinematic-line');
const cinematicLoading = document.getElementById('cinematic-loading');
const cinematicLoadingFill = document.querySelector('.cinematic-loading-fill');
const cinematicLoadingLabel = cinematicLoading ? cinematicLoading.querySelector('span') : null;
const skipCinematic = document.getElementById('skip-cinematic');
const sceneLayer = document.getElementById('scene-layer');
const sceneArt = document.getElementById('scene-art');
const sceneFx = document.getElementById('scene-fx');
const cinematicSceneArt = document.getElementById('cinematic-scene-art');

const feedbackIcons = {
  good: '../assets/check.png',
  bad: '../assets/x.png'
};

const wardrobeStyles = {
  idle: { label: 'starter-duck', cost: 0, group: 'starter', order: 1, sprite: '../assets/characters/duck-idle.png', icon: '../assets/characters/duck-idle.png' },
  bread_duck: { label: 'bread-duck', cost: 120, group: 'starter', order: 2, sprite: '../assets/characters/bread.png', icon: '../assets/characters/bread.png' },
  brainy_duck: { label: 'brainy-duck', cost: 180, group: 'school', order: 3, sprite: '../assets/characters/brainy-duck.png', icon: '../assets/characters/brainy-duck.png' },
  business_duck: { label: 'business-duck', cost: 240, group: 'school', order: 4, sprite: '../assets/characters/business.png', icon: '../assets/characters/business.png' },
  dj_duck: { label: 'dj-duck', cost: 300, group: 'school', order: 5, sprite: '../assets/characters/dj.png', icon: '../assets/characters/dj.png' },
  cook_duck: { label: 'cook-duck', cost: 360, group: 'school', order: 6, sprite: '../assets/characters/cook.png', icon: '../assets/characters/cook.png' },
  ninja_duck: { label: 'ninja-duck', cost: 440, group: 'battle', order: 7, sprite: '../assets/characters/ninja.png', icon: '../assets/characters/ninja.png' },
  knight_duck: { label: 'knight-duck', cost: 520, group: 'battle', order: 8, sprite: '../assets/characters/knight.png', icon: '../assets/characters/knight.png' },
  princess_duck: { label: 'princess-duck', cost: 620, group: 'battle', order: 9, sprite: '../assets/characters/princess.png', icon: '../assets/characters/princess.png' },
  hacker_duck: { label: 'hacker-duck', cost: 760, group: 'legend', order: 10, sprite: '../assets/characters/hacker.png', icon: '../assets/characters/hacker.png' },
  hero_duck: { label: 'hero-duck', cost: 900, group: 'legend', order: 11, sprite: '../assets/characters/hero-splash.png', icon: '../assets/characters/hero-splash.png' },
  toast_duck: { label: 'toast-duck', cost: 1050, group: 'legend', order: 12, sprite: '../assets/characters/duck-toast.png', icon: '../assets/characters/duck-toast.png' },
  alien_duck: { label: 'alien-duck', cost: 1250, group: 'legend', order: 13, sprite: '../assets/characters/alien.png', icon: '../assets/characters/alien.png' }
};

const characterShopGroups = [
  { key: 'starter', label: 'Starter Ducks' },
  { key: 'school', label: 'School Ducks' },
  { key: 'battle', label: 'Battle Ducks' },
  { key: 'legend', label: 'Legend Ducks' }
];

const duckReactions = {
  good: ['../assets/characters/duck-stretch.png', '../assets/characters/duck-toast.png'],
  bad: '../assets/characters/duck-splash.png',
  complete: '../assets/characters/duck-toast.png'
};

const chapters = {
  1: {
    mode: 'box',
    title: 'Chapter 1: Pond Basics',
    cue: 'Drag each literal into the correct type box.',
    storyHook: 'Story: You dry Eppy beside the pond while learning first coding values.',
    learningGoal: 'Goal: Classify each basic literal correctly.',
    sceneAsset: '../assets/scenes/scene-ch1-rain.svg',
    sceneFx: 'rain',
    cinematicLines: [
      'Rain slows down. The duck watches your notebook.',
      'You write your first values together by the pond.'
    ],
    prepLabel: 'Preparing literal drills...',
    questions: [
      { value: '"duck"', type: 'string' },
      { value: '15', type: 'int' },
      { value: 'true', type: 'bool' },
      { value: '"pond"', type: 'string' },
      { value: '-3', type: 'int' },
      { value: 'false', type: 'bool' },
      { value: '108', type: 'int' },
      { value: '"Eppy"', type: 'string' },
      { value: '0', type: 'int' },
      { value: '"learn"', type: 'string' }
    ]
  },
  2: {
    mode: 'box',
    title: 'Chapter 2: Variable Values',
    cue: 'Continue sorting variable-like literals by type.',
    storyHook: 'Story: Eppy follows your notes as you label progress and inventory values.',
    learningGoal: 'Goal: Sort variable-like values into the correct type.',
    sceneAsset: '../assets/scenes/scene-ch2-study.svg',
    sceneFx: 'breeze',
    cinematicLines: [
      'The duck is stronger now and peeks over your notes.',
      'You start tracking names, flags, and scores in variables.'
    ],
    prepLabel: 'Preparing variable drills...',
    questions: [
      { value: '"coins"', type: 'string' },
      { value: '256', type: 'int' },
      { value: '"player_name"', type: 'string' },
      { value: 'true', type: 'bool' },
      { value: '-120', type: 'int' },
      { value: '"level_up"', type: 'string' },
      { value: 'false', type: 'bool' },
      { value: '42', type: 'int' },
      { value: '"mission-2"', type: 'string' },
      { value: '730', type: 'int' }
    ]
  },
   3: {
     mode: 'find_error',
     title: 'Chapter 3: Find the Error [Java]',
     cue: 'Tap the line that contains the type error.',
     storyHook: 'Story: Eppy checks your Java code and asks you to find broken lines.',
     learningGoal: 'Goal: Detect incorrect value types inside small Java code snippets.',
     sceneAsset: '../assets/scenes/scene-ch3-sunrise.svg',
     sceneFx: 'sunrise',
     cinematicLines: [
       'Sunlight reaches the pond. Java debug mission starts.',
       'Find the wrong line before Eppy gets confused.'
     ],
     prepLabel: 'Preparing Java debug drills...',
     questions: [
       { prompt: 'Find the type error. Variable target: boolean.', lines: ['boolean isReady = "true";', 'int points = 25;', 'String mascot = "Eppy";'], answerIndex: 0, hintText: 'A boolean cannot hold a quoted string value.' },
       { prompt: 'Find the type error. Variable target: int.', lines: ['int lives = "3";', 'boolean passed = true;', 'String levelName = "Pond";'], answerIndex: 0, hintText: 'An int cannot hold a quoted string value.' },
       { prompt: 'Find the type error. Variable target: String.', lines: ['String chapterName = 4;', 'int accuracy = 98;', 'boolean enabled = false;'], answerIndex: 0, hintText: 'A String cannot hold a raw integer value.' },
       { prompt: 'Find the type error. Variable target: boolean.', lines: ['boolean hasBadge = "true";', 'String hasHint = "false";', 'int coins = 110;'], answerIndex: 0, hintText: 'Boolean values should not be quoted strings.' },
       { prompt: 'Find the type error. Variable target: int.', lines: ['int totalCoins = "540";', 'String bestScore = "100";', 'boolean isCalm = true;'], answerIndex: 0, hintText: 'An int cannot hold a quoted string value.' },
       { prompt: 'Find the type error. Variable target: String.', lines: ['String duckName = 42;', 'int chapterCode = 503;', 'boolean isComplete = false;'], answerIndex: 0, hintText: 'A String cannot hold a raw integer value.' }
     ]
   },
   4: {
     mode: 'fill_missing',
     title: 'Chapter 4: Fill the Blanks [JavaScript]',
     cue: 'Choose the best token to complete the code.',
     storyHook: 'Story: Festival coding booth opens and missing code must be completed fast.',
     learningGoal: 'Goal: Fill blanks with values that match the expected type in JavaScript.',
     sceneAsset: '../assets/scenes/scene-ch4-festival.svg',
     sceneFx: 'festival',
     cinematicLines: [
       'Lantern lights glow over the pond as the JavaScript showcase begins.',
       'Complete each missing value to keep the code running.'
     ],
     prepLabel: 'Preparing JavaScript fill-in drills...',
     questions: [
       { prompt: 'Fill the blank so coins is int.', snippet: 'let coins = ___;', choices: ['"120"', '120', 'false'], answerIndex: 1, hintText: 'int values are whole numbers without quotes.' },
       { prompt: 'Fill the blank so isReady is boolean.', snippet: 'const isReady = ___;', choices: ['"true"', 'true', '1'], answerIndex: 2, hintText: 'Boolean literals are true or false without quotes.' },
       { prompt: 'Fill the blank so playerName is string.', snippet: 'const playerName = ___;', choices: ['"Jham"', 'Jham', '0'], answerIndex: 0, hintText: 'String values must be wrapped in quotes.' },
       { prompt: 'Fill the blank so hasBread is boolean.', snippet: 'let hasBread = ___;', choices: ['false', '"false"', '"0"'], answerIndex: 0, hintText: 'Boolean uses unquoted true or false.' },
       { prompt: 'Fill the blank so chapterNumber is int.', snippet: 'const chapterNumber = ___;', choices: ['"4"', '4', 'true'], answerIndex: 1, hintText: 'int is a numeric value without quotes.' },
       { prompt: 'Fill the blank so missionTag is string.', snippet: 'let missionTag = ___;', choices: ['"pond_rescue"', 'pond_rescue', '25'], answerIndex: 0, hintText: 'Text labels require quote delimiters.' }
     ]
   },
   5: {
     mode: 'fill_missing',
     title: 'Chapter 5: Fill in the Blanks [JavaScript] 🔒',
     cue: 'Choose the best token to complete the code.',
     storyHook: 'Story: Final JavaScript review with Eppy before the ending story.',
     learningGoal: 'Goal: Fill blanks with values that match the expected type in JavaScript.',
     sceneAsset: '../assets/scenes/scene-ch4-festival.svg',
     sceneFx: 'sunrise',
     cinematicLines: [
       'Eppy opens the final JavaScript notebook page marked: Mastery Check.',
       'Complete each missing value to keep the code running.'
     ],
     prepLabel: 'Preparing JavaScript fill-in drills...',
     premium: true,
     questions: [
       { prompt: 'Fill the blank so coins is int.', snippet: 'let coins = ___;', choices: ['"120"', '120', 'false'], answerIndex: 1, hintText: 'int values are whole numbers without quotes.' },
       { prompt: 'Fill the blank so isReady is boolean.', snippet: 'const isReady = ___;', choices: ['"true"', 'true', '1'], answerIndex: 2, hintText: 'Boolean literals are true or false without quotes.' },
       { prompt: 'Fill the blank so playerName is string.', snippet: 'const playerName = ___;', choices: ['"Jham"', 'Jham', '0'], answerIndex: 0, hintText: 'String values must be wrapped in quotes.' },
       { prompt: 'Fill the blank so hasBread is boolean.', snippet: 'let hasBread = ___;', choices: ['false', '"false"', '"0"'], answerIndex: 0, hintText: 'Boolean uses unquoted true or false.' },
       { prompt: 'Fill the blank so chapterNumber is int.', snippet: 'const chapterNumber = ___;', choices: ['"4"', '4', 'true'], answerIndex: 1, hintText: 'int is a numeric value without quotes.' },
       { prompt: 'Fill the blank so missionTag is string.', snippet: 'let missionTag = ___;', choices: ['"pond_rescue"', 'pond_rescue', '25'], answerIndex: 0, hintText: 'Text labels require quote delimiters.' }
     ]
   }
};
const endingScenes = [
  {
    scene: 13,
    frameIndex: 12,
    line: 'Scene 13: Eppy returns to the pond with a calm, brave smile.',
    subline: 'You both remember how the rescue began.'
  },
  {
    scene: 14,
    frameIndex: 13,
    line: 'Scene 14: Eppy rests beside your notes after all coding lessons.',
    subline: 'Practice, patience, and care built real progress.'
  },
  {
    scene: 15,
    frameIndex: 14,
    line: 'Scene 15: Eppy stands proud as your learning companion.',
    subline: 'From injured duck to confident guide.'
  },
  {
    scene: 16,
    frameIndex: 15,
    line: 'Scene 16: The End.',
    subline: 'A story of rescue, recovery, and programming growth with Eppy.'
  }
];

const totalChapters = Object.keys(chapters).length;
let currentChapter = Number(localStorage.getItem('learnagochiCurrentChapter') || '1');
let unlockedChapter = Number(localStorage.getItem('learnagochiUnlockedChapter') || '1');
let coins = Number(localStorage.getItem('learnagochiCoins') || '0');
let bondXp = Number(localStorage.getItem('learnagochiBondXp') || '0');
let previousCoins = coins;
let unlockedPremiumChapters = new Set();
try {
  const stored = localStorage.getItem('learnagochiPremiumUnlocked');
  if (stored) unlockedPremiumChapters = new Set(JSON.parse(stored));
} catch {
  unlockedPremiumChapters = new Set();
}

let ownedStyles = [];
try {
  ownedStyles = JSON.parse(localStorage.getItem('learnagochiOwnedStyles') || '["idle"]');
} catch {
  ownedStyles = ['idle'];
}
if (!Array.isArray(ownedStyles) || ownedStyles.length === 0) ownedStyles = ['idle'];

let selectedStyle = localStorage.getItem('learnagochiSelectedStyle') || 'idle';
if (!wardrobeStyles[selectedStyle]) selectedStyle = 'idle';
if (!ownedStyles.includes(selectedStyle)) selectedStyle = 'idle';

currentChapter = clamp(currentChapter, 1, totalChapters);
unlockedChapter = clamp(unlockedChapter, 1, totalChapters);
if (currentChapter > unlockedChapter) currentChapter = unlockedChapter;

let questionIndex = 0;
let roundCorrect = 0;
let roundAttempts = 0;
let chapterCompleted = false;
let chapterFailed = false;
let lives = 3;
let answerLocked = false;
let activeValue = null;
let dragState = null;
let dialogueTimer = null;
let reactionTimer = null;
let hintVisible = false;
let activeHintKey = null;
const unlockedHintKeys = new Set();

let cinematicPlaying = false;
let cinematicSkipRequested = false;
let cinematicRunId = 0;
let chapterLoadToken = 0;
let endingSceneIndex = 0;
let endingFrameIndex = endingScenes[0]?.frameIndex ?? 12;
let endingTransitionToken = 0;
let endingAutoRunToken = 0;
let endingAutoPlaying = false;

const ENDING_SHEET_COLUMNS = 4;
const ENDING_SHEET_ROWS = 4;
const ENDING_TRANSITION_MS = 480;
const ENDING_AUTO_HOLD_MS = 2200;
const endingSpriteSheet = new Image();
endingSpriteSheet.src = '../assets/characters/spritesheet-story.png';
const COIN_PARTICLE_ASSET = '../assets/coin.svg';
const HINT_COIN_COST = 100;
const BASE_CHAPTER_COIN_REWARD = 100;
const CHAPTER_COIN_MULTIPLIER = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 4
};
const DEFAULT_HINT_TEXT = 'Hints are hidden. Spend 100 coins to buy one bread clue for this challenge.';
const EFFECT_COLORS = ['#f8d25b', '#ff8a78', '#8fd9ff', '#9fe39b', '#f4e9d1', '#ffc17e'];
const MAX_LIVES = 3;
const SFX_LIBRARY = {
  correct: '../assets/sound/mysfx_game_show_correct.mp3',
  wrong: '../assets/sound/mysfx_duolingo_wrong.mp3',
  hint: '../assets/sound/mysfx_google_meet_message_sound.mp3',
  click: '../assets/sound/mysfx_click.mp3',
  unlock: '../assets/sound/mysfx_top.mp3',
  complete: '../assets/sound/mysfx_winners.mp3'
};
const SFX_POOL_SIZE = 4;
let sfxMasterVolume = 0.8;
const sfxPools = new Map();

function normalizeGameUrl() {
  try {
    const { pathname, hash } = window.location;
    const isGameFilePath = /\/Game\/index\.html$/i.test(pathname);
    if (!isGameFilePath) return;
    const nextUrl = hash ? `/game${hash}` : '/game';
    window.history.replaceState(window.history.state, '', nextUrl);
  } catch (error) {
  }
}

normalizeGameUrl();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureSfxPool(name) {
  const source = SFX_LIBRARY[name];
  if (!source) return [];
  if (sfxPools.has(name)) return sfxPools.get(name);

  const pool = [];
  for (let i = 0; i < SFX_POOL_SIZE; i += 1) {
    const audio = new Audio(source);
    audio.preload = 'auto';
    audio.volume = sfxMasterVolume;
    pool.push(audio);
  }

  sfxPools.set(name, pool);
  return pool;
}

function setSfxVolume(normalizedValue) {
  sfxMasterVolume = clamp(Number(normalizedValue) || 0, 0, 1);
  sfxPools.forEach((pool) => {
    pool.forEach((audio) => {
      audio.volume = sfxMasterVolume;
    });
  });
}

function playSfx(name, options = {}) {
  if (sfxMasterVolume <= 0) return;
  const pool = ensureSfxPool(name);
  if (!pool.length) return;

  let track = pool.find((audio) => audio.paused || audio.ended);
  if (!track) {
    track = pool[0];
    track.pause();
  }

  const boost = clamp(Number(options.boost) || 1, 0, 1.8);
  const rate = clamp(Number(options.rate) || 1, 0.75, 1.35);
  track.currentTime = 0;
  track.playbackRate = rate;
  track.volume = clamp(sfxMasterVolume * boost, 0, 1);
  track.play().catch(() => {});
}

function playClickSfx(options = {}) {
  playSfx('click', { rate: options.rate ?? 1, boost: options.boost ?? 0.62 });
}

function warmupCharacterSprites() {
  const preloadSet = new Set();
  Object.values(wardrobeStyles).forEach((style) => {
    if (style.sprite) preloadSet.add(style.sprite);
    if (style.icon) preloadSet.add(style.icon);
  });
  Object.values(duckReactions).forEach((reaction) => {
    if (Array.isArray(reaction)) {
      reaction.forEach((src) => {
        if (src) preloadSet.add(src);
      });
      return;
    }
    if (reaction) preloadSet.add(reaction);
  });
  Object.values(feedbackIcons).forEach((iconSrc) => {
    if (iconSrc) preloadSet.add(iconSrc);
  });

  preloadSet.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function elementCenter(element) {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function pulseClass(element, className, duration = 420) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

document.addEventListener('pointerdown', (event) => {
  const target = event.target.closest('button, .box, .style-btn, .chapter-btn, .mode-option, .ui-btn, .close-btn');
  if (!target) return;
  pulseClass(target, 'btn-click-pop', 180);
}, { passive: true });

function flashChallengeZone(kind) {
  if (!challengeZone) return;
  const className = kind === 'good' ? 'zone-flash-good' : 'zone-flash-bad';
  challengeZone.classList.remove('zone-flash-good', 'zone-flash-bad');
  void challengeZone.offsetWidth;
  challengeZone.classList.add(className);
  setTimeout(() => {
    challengeZone.classList.remove(className);
  }, 520);
}

function spawnFloatingScore(text, x, y, kind = 'gain') {
  if (!effectsLayer) return;
  const node = document.createElement('div');
  node.className = `floating-score ${kind}`;
  node.textContent = text;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  effectsLayer.appendChild(node);
  setTimeout(() => node.remove(), 980);
}

function spawnConfettiBurst(x, y, count = 18, spread = 150, mode = 'celebrate') {
  if (!effectsLayer) return;
  for (let i = 0; i < count; i += 1) {
    const bit = document.createElement('span');
    bit.className = mode === 'splash' ? 'effect-bit splash' : 'effect-bit confetti';
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(spread * 0.38, spread);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = randomBetween(6, 14);
    bit.style.left = `${x}px`;
    bit.style.top = `${y}px`;
    bit.style.width = `${size}px`;
    bit.style.height = `${size * randomBetween(0.72, 1.22)}px`;
    bit.style.background = EFFECT_COLORS[Math.floor(Math.random() * EFFECT_COLORS.length)];
    bit.style.setProperty('--dx', `${dx}px`);
    bit.style.setProperty('--dy', `${dy}px`);
    bit.style.setProperty('--rot', `${randomBetween(-240, 240)}deg`);
    bit.style.setProperty('--dur', `${randomBetween(620, 980)}ms`);
    effectsLayer.appendChild(bit);
    setTimeout(() => bit.remove(), 1200);
  }
}

function spawnCoinBurst(x, y, count = 10, spread = 130) {
  if (!effectsLayer) return;
  for (let i = 0; i < count; i += 1) {
    const coin = document.createElement('img');
    const angle = randomBetween(-Math.PI * 0.95, -Math.PI * 0.05);
    const distance = randomBetween(spread * 0.32, spread);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = randomBetween(14, 24);
    coin.className = 'effect-coin';
    coin.src = COIN_PARTICLE_ASSET;
    coin.alt = '';
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
    coin.style.width = `${size}px`;
    coin.style.height = `${size}px`;
    coin.style.setProperty('--dx', `${dx}px`);
    coin.style.setProperty('--dy', `${dy}px`);
    coin.style.setProperty('--rot', `${randomBetween(-180, 220)}deg`);
    coin.style.setProperty('--dur', `${randomBetween(680, 1080)}ms`);
    effectsLayer.appendChild(coin);
    setTimeout(() => coin.remove(), 1300);
  }
}

function waitEndingAuto(ms, runToken) {
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (runToken !== endingAutoRunToken || Date.now() - started >= ms) {
        clearInterval(timer);
        resolve(runToken === endingAutoRunToken);
      }
    }, 30);
  });
}

function clampEndingFrame(value) {
  return clamp(value, 0, ENDING_SHEET_COLUMNS * ENDING_SHEET_ROWS - 1);
}

function ensureEndingCanvasResolution() {
  if (!endingCanvas || !endingCanvasContext) return false;
  const rect = endingCanvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return false;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const targetWidth = Math.round(rect.width * pixelRatio);
  const targetHeight = Math.round(rect.height * pixelRatio);

  if (endingCanvas.width !== targetWidth || endingCanvas.height !== targetHeight) {
    endingCanvas.width = targetWidth;
    endingCanvas.height = targetHeight;
    endingCanvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    endingCanvasContext.imageSmoothingEnabled = true;
    endingCanvasContext.imageSmoothingQuality = 'high';
  }

  return true;
}

function drawEndingFrame(frameIndex, alpha = 1) {
  if (!endingCanvas || !endingCanvasContext) return;
  if (!ensureEndingCanvasResolution()) return;
  if (!endingSpriteSheet.complete || endingSpriteSheet.naturalWidth === 0) return;

  const safeFrame = clampEndingFrame(frameIndex);
  const frameWidth = endingSpriteSheet.naturalWidth / ENDING_SHEET_COLUMNS;
  const frameHeight = endingSpriteSheet.naturalHeight / ENDING_SHEET_ROWS;
  const column = safeFrame % ENDING_SHEET_COLUMNS;
  const row = Math.floor(safeFrame / ENDING_SHEET_COLUMNS);
  const sx = Math.round(column * frameWidth);
  const sy = Math.round(row * frameHeight);

  endingCanvasContext.save();
  endingCanvasContext.globalAlpha = clamp(alpha, 0, 1);
  endingCanvasContext.drawImage(
    endingSpriteSheet,
    sx,
    sy,
    Math.round(frameWidth),
    Math.round(frameHeight),
    0,
    0,
    endingCanvas.clientWidth,
    endingCanvas.clientHeight
  );
  endingCanvasContext.restore();
}

function renderEndingFrame(frameIndex) {
  if (!endingCanvas || !endingCanvasContext) return;
  if (!ensureEndingCanvasResolution()) return;

  endingFrameIndex = clampEndingFrame(frameIndex);
  endingCanvasContext.clearRect(0, 0, endingCanvas.clientWidth, endingCanvas.clientHeight);
  drawEndingFrame(endingFrameIndex, 1);
}

function animateEndingFrameTransition(nextFrame, duration = ENDING_TRANSITION_MS) {
  if (!endingCanvas || !endingCanvasContext) {
    endingFrameIndex = clampEndingFrame(nextFrame);
    return Promise.resolve();
  }

  const targetFrame = clampEndingFrame(nextFrame);
  const fromFrame = clampEndingFrame(endingFrameIndex);

  if (fromFrame === targetFrame || duration <= 0 || !endingSpriteSheet.complete || endingSpriteSheet.naturalWidth === 0) {
    renderEndingFrame(targetFrame);
    return Promise.resolve();
  }

  endingTransitionToken += 1;
  const token = endingTransitionToken;

  return new Promise((resolve) => {
    const startAt = performance.now();

    const step = (timestamp) => {
      if (token !== endingTransitionToken) {
        resolve();
        return;
      }

      const elapsed = timestamp - startAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (ensureEndingCanvasResolution()) {
        endingCanvasContext.clearRect(0, 0, endingCanvas.clientWidth, endingCanvas.clientHeight);
        drawEndingFrame(fromFrame, 1 - eased);
        drawEndingFrame(targetFrame, eased);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      endingFrameIndex = targetFrame;
      resolve();
    };

    requestAnimationFrame(step);
  });
}

endingSpriteSheet.addEventListener('load', () => {
  renderEndingFrame(endingFrameIndex);
});

window.addEventListener('resize', () => {
  renderEndingFrame(endingFrameIndex);
});

function persistState() {
  localStorage.setItem('learnagochiCurrentChapter', String(currentChapter));
  localStorage.setItem('learnagochiUnlockedChapter', String(unlockedChapter));
  localStorage.setItem('learnagochiCoins', String(coins));
  localStorage.setItem('learnagochiBondXp', String(bondXp));
  localStorage.setItem('learnagochiOwnedStyles', JSON.stringify(ownedStyles));
  localStorage.setItem('learnagochiSelectedStyle', selectedStyle);
  localStorage.setItem('learnagochiPremiumUnlocked', JSON.stringify([...unlockedPremiumChapters]));
}

function isPremiumChapter(chapterNum) {
  const chapter = chapters[chapterNum];
  return chapter ? chapter.premium === true : false;
}

function unlockPremiumChapter(chapterNum) {
  unlockedPremiumChapters.add(chapterNum);
  persistState();
}

function canAccessChapter(chapterNum) {
  if (chapterNum > unlockedChapter) return false;
  if (isPremiumChapter(chapterNum) && !unlockedPremiumChapters.has(chapterNum)) return false;
  return true;
}

function currentChapterData() {
  return chapters[currentChapter];
}

function selectedDuckSprite() {
  return wardrobeStyles[selectedStyle]?.sprite || wardrobeStyles.idle.sprite;
}

function restoreDuckSprite() {
  if (!duckCharacter) return;
  duckCharacter.src = selectedDuckSprite();
  duckCharacter.classList.remove('react-good', 'react-bad', 'react-complete');
}

function setDuckReaction(kind, duration = 900) {
  if (!duckCharacter || !duckReactions[kind]) return;

  if (reactionTimer) {
    clearTimeout(reactionTimer);
    reactionTimer = null;
  }

  duckCharacter.classList.remove('react-good', 'react-bad', 'react-complete');
  let reactionSprite = duckReactions[kind];
  if (Array.isArray(reactionSprite)) {
    const currentSrc = duckCharacter.src || '';
    const nextSprite = reactionSprite.find((candidate) => {
      const fileName = candidate.split('/').pop();
      return fileName && !currentSrc.includes(fileName);
    });
    reactionSprite = nextSprite || reactionSprite[0];
  }
  duckCharacter.src = reactionSprite;
  duckCharacter.classList.add(`react-${kind}`);

  reactionTimer = setTimeout(() => {
    restoreDuckSprite();
    reactionTimer = null;
  }, duration);
}

function setDialogue(message, ms = 0) {
  if (!duckDialogue) return;
  duckDialogue.textContent = message;

  if (dialogueTimer) {
    clearTimeout(dialogueTimer);
    dialogueTimer = null;
  }

  if (ms > 0) {
    dialogueTimer = setTimeout(() => {
      duckDialogue.textContent = currentChapterData().cue;
      dialogueTimer = null;
    }, ms);
  }
}

function renderLives() {
  if (!livesTrack) return;
  livesTrack.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i += 1) {
    const heart = document.createElement('img');
    heart.src = '../assets/heart.png';
    heart.alt = i < lives ? 'Life remaining' : 'Life lost';
    heart.className = `heart-icon ${i < lives ? 'full' : 'lost'}`;
    livesTrack.appendChild(heart);
  }
}

function getQuestionMode() {
  return currentChapterData().mode || 'box';
}

function getQuestionHint(question) {
  if (!question) return '';
  if (question.hintText) return question.hintText;
  if (Object.prototype.hasOwnProperty.call(question, 'value')) {
    return buildNonRevealingHint(question.value);
  }
  return 'Focus on exact notation, delimiters, and expected type.';
}

function clearActiveQuestionViews() {
  if (activeValue) {
    activeValue.remove();
    activeValue = null;
  }
  if (modePanel) {
    modePanel.innerHTML = '';
  }
}

function setInteractionMode(mode) {
  const isBox = mode === 'box';
  if (modePanel) {
    modePanel.hidden = isBox;
  }
  if (valueContainer) {
    valueContainer.style.display = isBox ? 'block' : 'none';
  }
  if (boxContainer) {
    boxContainer.style.display = isBox ? 'flex' : 'none';
  }
}

function loseLife() {
  lives = Math.max(0, lives - 1);
  if (lives <= 0) {
    return true;
  }
  return false;
}

function failChapter() {
  chapterCompleted = true;
  chapterFailed = true;
  answerLocked = true;
  clearActiveQuestionViews();
  updateHud();
  persistState();

  const total = currentChapterData().questions.length;
  if (assessmentSummary) {
    assessmentSummary.textContent = `No lives left. You solved ${roundCorrect}/${total}. Retry this chapter to improve motivation and mastery.`;
  }
  if (assessmentScore) {
    assessmentScore.textContent = `${Math.round((roundCorrect / Math.max(roundAttempts, 1)) * 100)}%`;
  }
  if (assessmentEarned) assessmentEarned.textContent = '0';
  if (assessmentTotal) assessmentTotal.textContent = String(coins);
  if (continueBtn) continueBtn.textContent = 'Retry Chapter';

  openOverlay(assessmentPanel);
  playSfx('wrong', { rate: 0.9, boost: 1 });
  setDuckReaction('bad', 1100);
  setDialogue('Eppy needs a reset. Retry this chapter with focus.', 2200);
}

function renderModeQuestion(question) {
  if (!modePanel || !question) return;
  const mode = getQuestionMode();
  modePanel.innerHTML = '';

  const title = document.createElement('p');
  title.className = 'mode-title';
  title.textContent = question.prompt || 'Solve this coding challenge.';
  modePanel.appendChild(title);

  if (mode === 'find_error') {
    const list = document.createElement('div');
    list.className = 'mode-code-list';
    question.lines.forEach((line, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'mode-option mode-code-line';
      button.textContent = line;
      button.addEventListener('click', () => {
        if (answerLocked || chapterCompleted || cinematicPlaying) return;
        answerLocked = true;
        const ok = index === question.answerIndex;
        resolveAnswer(ok, button);
      });
      list.appendChild(button);
    });
    modePanel.appendChild(list);
    return;
  }

  if (mode === 'fill_missing') {
    const snippet = document.createElement('pre');
    snippet.className = 'mode-snippet';
    snippet.textContent = question.snippet;
    modePanel.appendChild(snippet);
  }

  const options = document.createElement('div');
  options.className = 'mode-options-grid';
  question.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mode-option mode-choice';
    button.textContent = choice;
    button.addEventListener('click', () => {
      if (answerLocked || chapterCompleted || cinematicPlaying) return;
      answerLocked = true;
      const ok = index === question.answerIndex;
      resolveAnswer(ok, button);
    });
    options.appendChild(button);
  });
  modePanel.appendChild(options);
}

function resolveAnswer(isCorrect, feedbackTarget) {
  roundAttempts += 1;

  const modeOptions = document.querySelectorAll('.mode-option');
  modeOptions.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    roundCorrect += 1;
    bondXp += 12;
    playSfx('correct', { rate: 1.04, boost: 0.9 });
    if (feedbackTarget) showFeedback('good', feedbackTarget);
    setDuckReaction('good', 900);
    setDialogue('Great match. That is correct.', 1300);
    flashChallengeZone('good');

    const center = elementCenter(feedbackTarget || challengeZone);
    if (center) {
      spawnConfettiBurst(center.x, center.y, 18, 140, 'celebrate');
      spawnCoinBurst(center.x, center.y, 6, 96);
    }

    if (activeValue) pulseClass(activeValue, 'value-win', 460);
    questionIndex += 1;

    if (questionIndex >= currentChapterData().questions.length) {
      finishChapter();
      return;
    }

    updateHud();
    persistState();
    setTimeout(() => {
      answerLocked = false;
      spawnValue();
    }, 420);
    return;
  }

  bondXp += 3;
  playSfx('wrong', { rate: 0.97, boost: 0.95 });
  if (feedbackTarget) showFeedback('bad', feedbackTarget);
  setDuckReaction('bad', 850);
  setDialogue('Wrong answer. Check notation and expected type.', 1300);
  flashChallengeZone('bad');

  const center = elementCenter(feedbackTarget || challengeZone);
  if (center) {
    spawnConfettiBurst(center.x, center.y, 14, 120, 'splash');
  }

  if (activeValue) pulseClass(activeValue, 'value-shake', 500);

  const noLives = loseLife();
  updateHud();
  persistState();

  if (noLives) {
    failChapter();
    return;
  }

  setTimeout(() => {
    answerLocked = false;
    spawnValue();
  }, 380);
}
function updateHud() {
  const deltaCoins = coins - previousCoins;
  if (coinsCount) coinsCount.textContent = String(coins);

  const level = Math.floor(bondXp / 100) + 1;
  const progress = bondXp % 100;

  if (bondLevel) bondLevel.textContent = String(level);
  if (bondFill) bondFill.style.width = `${progress}%`;
  if (chapterChip) chapterChip.textContent = `Chapter ${currentChapter} / ${totalChapters}`;
  renderLives();

  if (deltaCoins !== 0) {
    const center = elementCenter(coinHudItem || coinsCount);
    if (deltaCoins > 0) {
      pulseClass(coinHudItem || coinsCount, 'coins-up', 520);
      if (center) {
        spawnCoinBurst(center.x, center.y, Math.min(14, 7 + Math.floor(deltaCoins / 20)));
        spawnFloatingScore(`+${deltaCoins}`, center.x, center.y - 6, 'gain');
      }
    } else {
      pulseClass(coinHudItem || coinsCount, 'coins-down', 520);
      if (center) {
        spawnFloatingScore(String(deltaCoins), center.x, center.y - 6, 'spent');
      }
    }
  }

  previousCoins = coins;
  renderHintUi();
}
function updateProgress() {
  const total = currentChapterData().questions.length;
  const shown = Math.min(questionIndex + 1, total);
  if (progressText) progressText.textContent = `${shown} / ${total}`;
}

function updateChapterMeta() {
  const chapter = currentChapterData();
  if (chapterTitle) chapterTitle.textContent = chapter.title;
  if (chapterStoryHook) chapterStoryHook.textContent = chapter.storyHook;
  if (chapterLearningGoal) chapterLearningGoal.textContent = chapter.learningGoal;
}

function updateSceneTheme(chapter, animated = true) {
  if (!chapter) return;

  if (sceneArt && chapter.sceneAsset) {
    sceneArt.src = chapter.sceneAsset;
  }

  if (sceneFx) {
    sceneFx.className = 'scene-fx';
    if (chapter.sceneFx) {
      sceneFx.classList.add(`fx-${chapter.sceneFx}`);
    }
  }

  if (sceneLayer && animated) {
    sceneLayer.classList.remove('scene-shift');
    void sceneLayer.offsetWidth;
    sceneLayer.classList.add('scene-shift');
  }
}

function renderChapterStrip() {
  if (!chapterStrip) return;

  chapterStrip.innerHTML = '';
  for (let i = 1; i <= totalChapters; i += 1) {
    const pill = document.createElement('div');
    pill.className = 'chapter-pill';
    const isPremium = isPremiumChapter(i);
    const isUnlockedPremium = unlockedPremiumChapters.has(i);
    pill.textContent = `Ch ${i}${isPremium && !isUnlockedPremium ? ' 🔒' : ''}`;

    if (i === currentChapter) pill.classList.add('active');
    if (i > unlockedChapter) pill.classList.add('locked');
    if (isPremium && !isUnlockedPremium && i <= unlockedChapter) {
      pill.classList.add('locked');
    }

    chapterStrip.appendChild(pill);
  }
}

function renderChapterButtons() {
  if (!chapterButtons) return;

  chapterButtons.innerHTML = '';
  for (let i = 1; i <= totalChapters; i += 1) {
    const button = document.createElement('button');
    button.className = 'chapter-btn';
    button.type = 'button';
    const isPremium = isPremiumChapter(i);
    const isUnlockedPremium = unlockedPremiumChapters.has(i);
    button.textContent = `Chapter ${i}${isPremium ? ' 🔒' : ''}`;

    if (i === currentChapter) button.classList.add('active');
    if (i > unlockedChapter) {
      button.classList.add('locked');
      button.textContent = `Chapter ${i} (Locked)`;
    } else if (isPremium && !isUnlockedPremium) {
      button.classList.add('locked');
      button.textContent = `Chapter ${i} 🔒 (Premium)`;
    }

    button.addEventListener('click', () => {
      playClickSfx();
      if (i > unlockedChapter) {
        setDialogue('Complete earlier chapters first to unlock this one.', 2000);
        return;
      }
      if (isPremium && !isUnlockedPremium) {
        setDialogue('Premium chapter! You can try it, but consider unlocking for full access!', 2000);
      }
      closeOverlay(settingsPanel);
      loadChapter(i, { withCinematic: true });
    });

    chapterButtons.appendChild(button);
  }
}

function applyStyle(styleKey) {
  const style = wardrobeStyles[styleKey];
  if (!style) return;

  selectedStyle = styleKey;
  restoreDuckSprite();
  persistState();
}

let shopNoticeTimer = null;
function showShopNotice(message, type = 'error', duration = 2000) {
  if (!shopNotice) return;
  shopNotice.textContent = message;
  shopNotice.classList.remove('error', 'success');
  shopNotice.classList.add('show', type);

  if (shopNoticeTimer) {
    clearTimeout(shopNoticeTimer);
    shopNoticeTimer = null;
  }

  if (duration > 0) {
    shopNoticeTimer = setTimeout(() => {
      shopNotice.classList.remove('show', 'error', 'success');
      shopNotice.textContent = '';
      shopNoticeTimer = null;
    }, duration);
  }
}

function renderStyleButton(key, info) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'style-btn';

  const owned = ownedStyles.includes(key);
  const active = selectedStyle === key;

  button.innerHTML = `<span class="style-row"><img class="style-icon" src="${info.icon || info.sprite}" alt="${info.label}" /><span class="style-meta"><strong>${info.label}</strong><span class="cost">${owned ? 'Owned' : `${info.cost} coins`}</span></span></span>`;

  if (active) button.classList.add('active');
  if (!owned) button.classList.add('locked');

  button.addEventListener('click', () => {
    playClickSfx({ boost: 0.58 });
    if (owned) {
      applyStyle(key);
      renderStyleShop();
      setDialogue(`Now wearing ${info.label}.`, 1400);
      return;
    }

    const enoughCoins = coins >= info.cost;
    if (!enoughCoins) {
      const lacking = info.cost - coins;
      showShopNotice(`Insufficient coins: need ${lacking} more for ${info.label}.`, 'error', 2200);
      setDialogue(`Need ${lacking} more coins for ${info.label}.`, 1800);
      playSfx('wrong', { rate: 0.95, boost: 0.75 });
      return;
    }

    coins -= info.cost;
    const styleCenter = elementCenter(button);
    if (styleCenter) {
      spawnCoinBurst(styleCenter.x, styleCenter.y, 8, 96);
      spawnFloatingScore(`-${info.cost}`, styleCenter.x, styleCenter.y - 10, 'spent');
    }
    playSfx('unlock', { rate: 1.03, boost: 0.95 });
    ownedStyles.push(key);
    applyStyle(key);
    updateHud();
    renderStyleShop();
    persistState();
    showShopNotice(`Unlocked ${info.label}!`, 'success', 1400);
    setDialogue(`Unlocked ${info.label}!`, 1800);
  });

  return button;
}

function renderStyleShop() {
  if (!styleShop) return;

  styleShop.innerHTML = '';

  const groupedStyles = new Map(characterShopGroups.map((group) => [group.key, []]));
  const sortedStyles = Object.entries(wardrobeStyles)
    .sort(([, a], [, b]) => (a.order || 999) - (b.order || 999));

  sortedStyles.forEach(([key, info]) => {
    const groupKey = groupedStyles.has(info.group) ? info.group : 'starter';
    groupedStyles.get(groupKey).push([key, info]);
  });

  characterShopGroups.forEach((group) => {
    const styles = groupedStyles.get(group.key);
    if (!styles || styles.length === 0) return;

    const section = document.createElement('section');
    section.className = 'shop-group';

    const title = document.createElement('p');
    title.className = 'shop-group-title';
    title.textContent = group.label;
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'shop-grid';
    styles.forEach(([key, info]) => {
      grid.appendChild(renderStyleButton(key, info));
    });

    section.appendChild(grid);
    styleShop.appendChild(section);
  });
}
function showFeedback(kind, box) {
  if (!box || !feedbackIcons[kind]) return;

  const rect = box.getBoundingClientRect();
  const icon = document.createElement('img');
  icon.src = feedbackIcons[kind];
  icon.className = 'feedback-icon';
  icon.style.left = `${rect.left + rect.width / 2}px`;
  icon.style.top = `${rect.top + rect.height / 2}px`;

  document.body.appendChild(icon);
  setTimeout(() => icon.remove(), 850);
}

function clearHighlights() {
  boxes.forEach((box) => box.classList.remove('highlight'));
}

function getBoxFromPoint(x, y) {
  for (const box of boxes) {
    const rect = box.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return box;
    }
  }
  return null;
}

function currentQuestionKey() {
  return `${currentChapter}:${questionIndex}`;
}

function buildNonRevealingHint(value) {
  const literal = String(value ?? '').trim();
  const hasWrappingQuotes = literal.length >= 2 && literal.startsWith('"') && literal.endsWith('"');
  const inner = hasWrappingQuotes ? literal.slice(1, -1) : literal;
  const looksKeyword = /^(true|false)$/i.test(inner);
  const looksSignedInteger = /^-?\d+$/.test(inner);
  const hasSymbols = /[_:\- ]/.test(inner);
  const clauses = [];

  clauses.push('Clue protocol: classify by notation first, meaning second.');
  clauses.push(hasWrappingQuotes
    ? 'Delimiter check: token is enclosed by paired quote delimiters.'
    : 'Delimiter check: token is exposed, with no quote enclosure.');

  if (looksKeyword) {
    clauses.push('Keyword warning: this lexeme can shift class when wrapped versus unwrapped.');
  } else if (looksSignedInteger) {
    clauses.push('Numeric warning: digit-only lexemes still depend on delimiter context.');
  } else if (hasSymbols) {
    clauses.push('Symbol signal: punctuation/spacing belongs to the token, not to its container.');
  } else {
    clauses.push('Fallback: inspect literal form exactly, including casing and boundaries.');
  }

  clauses.push('Decision rule: prioritize raw surface form over interpretation.');
  return clauses.join(' ');
}

function renderHintUi() {
  const unlocked = unlockedHintKeys.has(currentQuestionKey());
  const canAfford = coins >= HINT_COIN_COST;

  if (hintToggleBtn) {
    if (unlocked) {
      hintToggleBtn.disabled = false;
      hintToggleBtn.textContent = hintVisible ? 'Hide Hint' : 'Show Hint';
    } else {
      hintToggleBtn.disabled = !canAfford;
      hintToggleBtn.textContent = `Buy Bread Hint (-${HINT_COIN_COST} coins)`;
    }
  }

  if (hintStatus) {
    if (unlocked) {
      hintStatus.textContent = hintVisible
        ? 'Bread clue unlocked for this challenge.'
        : 'Bread clue unlocked. Toggle to view it again.';
    } else if (canAfford) {
      hintStatus.textContent = `Hint locked. Spend ${HINT_COIN_COST} coins for one bread clue.`;
    } else {
      hintStatus.textContent = `Need ${Math.max(0, HINT_COIN_COST - coins)} more coins to buy a bread clue.`;
    }
  }
}

function renderProgrammingHint(question) {
  if (!programmingTag) return;
  const unlocked = unlockedHintKeys.has(currentQuestionKey());

  if (hintVisible && unlocked) {
    const hintText = getQuestionHint(question);
    programmingTag.textContent = `Hint: ${hintText}`;
    return;
  }

  programmingTag.textContent = DEFAULT_HINT_TEXT;
}
function syncHintStateForCurrentQuestion() {
  const key = currentQuestionKey();
  if (activeHintKey !== key) {
    activeHintKey = key;
    hintVisible = false;
  }
  renderHintUi();
}

function spawnValue() {
  if (chapterCompleted || cinematicPlaying) return;

  const question = currentChapterData().questions[questionIndex];
  if (!question) return;

  answerLocked = false;
  syncHintStateForCurrentQuestion();
  renderProgrammingHint(question);
  clearActiveQuestionViews();
  clearHighlights();

  const mode = getQuestionMode();
  setInteractionMode(mode);

  if (mode !== 'box') {
    renderModeQuestion(question);
    updateProgress();
    return;
  }

  if (!valueContainer) return;

  const valueEl = document.createElement('div');
  valueEl.className = 'draggable-value';
  valueEl.textContent = question.value;

  valueContainer.appendChild(valueEl);
  requestAnimationFrame(() => {
    valueEl.classList.add('is-ready');
  });

  const areaRect = valueContainer.getBoundingClientRect();
  const left = clamp(areaRect.width * 0.16, 20, Math.max(20, areaRect.width - 260));
  const top = clamp(areaRect.height * 0.16, 18, Math.max(18, areaRect.height - 110));
  valueEl.style.left = `${left}px`;
  valueEl.style.top = `${top}px`;

  valueEl.addEventListener('pointerdown', (event) => {
    if (chapterCompleted || cinematicPlaying || answerLocked) return;

    event.preventDefault();
    valueEl.setPointerCapture(event.pointerId);

    dragState = {
      pointerId: event.pointerId,
      element: valueEl,
      originalLeft: parseFloat(valueEl.style.left) || 0,
      originalTop: parseFloat(valueEl.style.top) || 0,
      offsetX: event.clientX - valueEl.getBoundingClientRect().left,
      offsetY: event.clientY - valueEl.getBoundingClientRect().top
    };

    valueEl.style.cursor = 'grabbing';
  });

  activeValue = valueEl;
  updateProgress();
}

function finishChapter() {
  chapterCompleted = true;
  chapterFailed = false;
  answerLocked = true;
  const isFinalChapter = currentChapter === totalChapters;

  clearActiveQuestionViews();

  const total = currentChapterData().questions.length;
  const score = roundAttempts > 0 ? Math.round((roundCorrect / roundAttempts) * 100) : 0;
  const masteryBonus = score === 100 ? 25 : score >= 90 ? 15 : 0;
  const chapterBonus = currentChapter * 8;
  const performanceEarned = roundCorrect * 10 + masteryBonus + chapterBonus;
  const chapterMultiplier = CHAPTER_COIN_MULTIPLIER[currentChapter] || 1;
  const guaranteedChapterReward = BASE_CHAPTER_COIN_REWARD * chapterMultiplier;
  const earned = Math.max(guaranteedChapterReward, performanceEarned);

  coins += earned;
  bondXp += 25;

  if (currentChapter < totalChapters) {
    unlockedChapter = Math.max(unlockedChapter, currentChapter + 1);
  }

  if (currentChapter === 4) {
    unlockPremiumChapter(5);
  }

  updateHud();
  renderChapterButtons();
  renderChapterStrip();
  renderStyleShop();
  persistState();

  if (assessmentSummary) {
    let text;
    if (isFinalChapter) {
      text = score >= 80
        ? `Final chapter cleared. ${roundCorrect}/${total} correct. Ending story is now unlocked.`
        : `Final chapter finished with ${roundCorrect}/${total}. Ending story unlocked, then replay for higher rewards.`;
    } else {
      text = score >= 80
        ? `Great chapter clear. ${roundCorrect}/${total} correct, your duck trusts your logic.`
        : `You got ${roundCorrect}/${total}. Review tricky values, then try again for better rewards.`;
    }
    assessmentSummary.textContent = text;
  }

  if (assessmentScore) assessmentScore.textContent = `${score}%`;
  if (assessmentEarned) assessmentEarned.textContent = String(earned);
  if (assessmentTotal) assessmentTotal.textContent = String(coins);
  if (continueBtn) continueBtn.textContent = isFinalChapter ? 'Show Ending Story' : 'Continue';

  openOverlay(assessmentPanel);
  playSfx('complete', { boost: 1, rate: 1 });
  setDuckReaction('complete', 1200);
  const chapterCenter = elementCenter(challengeZone || valueContainer);
  if (chapterCenter) {
    spawnConfettiBurst(chapterCenter.x, chapterCenter.y, 34, 220, 'celebrate');
    spawnCoinBurst(chapterCenter.x, chapterCenter.y, 16, 170);
    spawnFloatingScore(`+${earned}`, chapterCenter.x, chapterCenter.y - 18, 'gain');
  }
  setDialogue(isFinalChapter ? 'Final chapter complete. Ending story is ready.' : 'Post assessment complete. Coins added to your bag!', 2400);
}

function handleDrop(droppedBox) {
  if (answerLocked || chapterCompleted || cinematicPlaying) return;
  const expectedType = currentChapterData().questions[questionIndex].type;
  const droppedType = droppedBox.dataset.type;
  answerLocked = true;
  resolveAnswer(expectedType === droppedType, droppedBox);
}

function handlePointerMove(event) {
  if (!dragState || event.pointerId !== dragState.pointerId || cinematicPlaying || getQuestionMode() !== 'box') return;

  const areaRect = valueContainer.getBoundingClientRect();
  const width = dragState.element.offsetWidth;
  const height = dragState.element.offsetHeight;

  const nextLeft = clamp(event.clientX - areaRect.left - dragState.offsetX, 0, areaRect.width - width);
  const nextTop = clamp(event.clientY - areaRect.top - dragState.offsetY, 0, areaRect.height - height);

  dragState.element.style.left = `${nextLeft}px`;
  dragState.element.style.top = `${nextTop}px`;

  clearHighlights();
  const overBox = getBoxFromPoint(event.clientX, event.clientY);
  if (overBox) overBox.classList.add('highlight');
}

function resetDragToOrigin() {
  if (!dragState) return;
  dragState.element.style.left = `${dragState.originalLeft}px`;
  dragState.element.style.top = `${dragState.originalTop}px`;
  dragState.element.style.cursor = 'grab';
}

function clearDragState() {
  if (!dragState) return;

  try {
    if (dragState.element.hasPointerCapture(dragState.pointerId)) {
      dragState.element.releasePointerCapture(dragState.pointerId);
    }
  } catch {
  }

  dragState = null;
}

function handlePointerUp(event) {
  if (!dragState || event.pointerId !== dragState.pointerId || getQuestionMode() !== 'box') return;

  const droppedBox = getBoxFromPoint(event.clientX, event.clientY);
  clearHighlights();

  if (!droppedBox) {
    resetDragToOrigin();
    clearDragState();
    return;
  }

  handleDrop(droppedBox);
  clearDragState();
}

document.addEventListener('pointermove', handlePointerMove);
document.addEventListener('pointerup', handlePointerUp);
document.addEventListener('pointercancel', () => {
  if (!dragState) return;
  resetDragToOrigin();
  clearHighlights();
  clearDragState();
});

function openOverlay(overlay) {
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeOverlay(overlay) {
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if (overlay === endingPanel) {
    endingTransitionToken += 1;
    endingAutoRunToken += 1;
    endingAutoPlaying = false;
  }
}

async function renderEndingScene({ animateFrame = true } = {}) {
  const current = endingScenes[endingSceneIndex] || endingScenes[endingScenes.length - 1];
  if (!current) return;

  if (animateFrame) {
    await animateEndingFrameTransition(current.frameIndex);
  } else {
    renderEndingFrame(current.frameIndex);
  }

  if (endingTitle) {
    endingTitle.textContent = endingSceneIndex === endingScenes.length - 1 ? 'Final Story - The End' : 'Final Story';
  }
  if (endingSceneStep) endingSceneStep.textContent = `Scene ${current.scene} / 16`;
  if (endingLine) endingLine.textContent = current.line;
  if (endingSubline) endingSubline.textContent = current.subline;
}

async function playEndingAutoSequence() {
  endingAutoRunToken += 1;
  const runToken = endingAutoRunToken;
  endingAutoPlaying = true;

  if (endingNextBtn) {
    endingNextBtn.disabled = true;
    endingNextBtn.textContent = 'Auto Playing...';
  }

  for (let index = 0; index < endingScenes.length; index += 1) {
    if (runToken !== endingAutoRunToken) return;

    endingSceneIndex = index;
    await renderEndingScene({ animateFrame: index !== 0 });
    const stillActive = await waitEndingAuto(ENDING_AUTO_HOLD_MS, runToken);
    if (!stillActive) return;
  }

  if (runToken !== endingAutoRunToken) return;
  endingAutoPlaying = false;
  if (endingNextBtn) {
    endingNextBtn.disabled = false;
    endingNextBtn.textContent = 'Replay Ending';
  }
}

function openEndingStory() {
  endingSceneIndex = 0;
  openOverlay(endingPanel);
  renderEndingScene({ animateFrame: false });
  playEndingAutoSequence();
  setDialogue('Final story unlocked. You finished all chapters!', 2600);
  setDuckReaction('complete', 1100);
}

function replayEndingStory() {
  if (endingAutoPlaying) return;
  endingSceneIndex = 0;
  renderEndingScene({ animateFrame: false });
  playEndingAutoSequence();
}

function finishEndingStory() {
  if (endingAutoPlaying) {
    endingAutoRunToken += 1;
    endingAutoPlaying = false;
  }

  closeOverlay(endingPanel);
  setDialogue('The End. Start again anytime to earn more coins.', 2400);
}

function confirmExitToHome(mode = 'game') {
  const message = mode === 'ending'
    ? 'Exit ending and return to the home screen?'
    : 'Exit game and return to the home screen?';
  return window.confirm(message);
}

function navigateToHome() {
  const tryFallbackHome = () => {
    const onHomePath = /\/home\/?$/i.test(window.location.pathname) || /\/index\.html$/i.test(window.location.pathname);
    if (!onHomePath) {
      window.location.replace('/home');
    }
  };

  if (window.history.length > 1) {
    window.history.back();
    setTimeout(tryFallbackHome, 260);
    return;
  }

  window.location.replace('/home');
}

function openCinematic() {
  if (!chapterCinematic) return;
  chapterCinematic.classList.add('open');
  chapterCinematic.setAttribute('aria-hidden', 'false');
}

function closeCinematic() {
  if (!chapterCinematic) return;
  chapterCinematic.classList.remove('open');
  chapterCinematic.setAttribute('aria-hidden', 'true');
}

function resetCinematicView(chapter) {
  if (cinematicChapter) cinematicChapter.textContent = chapter.title;
  if (cinematicSceneArt && chapter.sceneAsset) cinematicSceneArt.src = chapter.sceneAsset;
  if (cinematicLine) {
    cinematicLine.textContent = '';
    cinematicLine.classList.remove('show');
  }
  if (cinematicLoading) cinematicLoading.classList.remove('show');
  if (cinematicLoadingFill) {
    cinematicLoadingFill.classList.remove('run');
    void cinematicLoadingFill.offsetWidth;
  }
  if (cinematicLoadingLabel) cinematicLoadingLabel.textContent = chapter.prepLabel;
}

function waitOrSkip(ms, runId) {
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (cinematicSkipRequested || runId !== cinematicRunId || Date.now() - started >= ms) {
        clearInterval(timer);
        resolve();
      }
    }, 35);
  });
}

async function playChapterCinematic(chapter) {
  if (!chapterCinematic || !cinematicLine) return;

  cinematicPlaying = true;
  cinematicSkipRequested = false;
  cinematicRunId += 1;
  const runId = cinematicRunId;

  resetCinematicView(chapter);
  openCinematic();

  await wait(120);

  for (const line of chapter.cinematicLines) {
    if (cinematicSkipRequested || runId !== cinematicRunId) break;

    cinematicLine.classList.remove('show');
    await wait(140);
    cinematicLine.textContent = line;
    cinematicLine.classList.add('show');
    await waitOrSkip(1300, runId);
  }

  if (cinematicLoading && runId === cinematicRunId) {
    cinematicLoading.classList.add('show');
  }

  if (cinematicLoadingFill && runId === cinematicRunId) {
    cinematicLoadingFill.classList.remove('run');
    void cinematicLoadingFill.offsetWidth;
    cinematicLoadingFill.classList.add('run');
  }

  await waitOrSkip(1850, runId);

  closeCinematic();
  cinematicPlaying = false;
}

if (skipCinematic) {
  skipCinematic.addEventListener('click', () => {
    if (!cinematicPlaying) return;
    playClickSfx();
    cinematicSkipRequested = true;
  });
}

if (settingsToggle) {
  settingsToggle.addEventListener('click', () => {
    playClickSfx();
    openOverlay(settingsPanel);
  });
}
if (closeSettings) {
  closeSettings.addEventListener('click', () => {
    playClickSfx({ boost: 0.55 });
    closeOverlay(settingsPanel);
  });
}
if (journalToggle) {
  journalToggle.addEventListener('click', () => {
    playClickSfx();
    openOverlay(journalPanel);
  });
}
if (closeJournal) {
  closeJournal.addEventListener('click', () => {
    playClickSfx({ boost: 0.55 });
    closeOverlay(journalPanel);
  });
}
if (shopToggle) {
  shopToggle.addEventListener('click', () => {
    playClickSfx();
    openOverlay(shopPanel);
  });
}
if (closeShop) {
  closeShop.addEventListener('click', () => {
    playClickSfx({ boost: 0.55 });
    closeOverlay(shopPanel);
  });
}

[settingsPanel, journalPanel, shopPanel, endingPanel].forEach((panel) => {
  if (!panel) return;
  panel.addEventListener('click', (event) => {
    if (event.target === panel) {
      playClickSfx({ boost: 0.5 });
      closeOverlay(panel);
    }
  });
});

// Assessment panel should not close when clicking outside (to prevent accidental close on fail/retry)
if (assessmentPanel) {
  assessmentPanel.addEventListener('click', (event) => {
    if (event.target === assessmentPanel) {
      playClickSfx({ boost: 0.5 });
      // Don't close assessment panel when clicking outside - user must click Retry or Continue
    }
  });
}

if (hintToggleBtn) {
  hintToggleBtn.addEventListener('click', () => {
    if (cinematicPlaying || chapterCompleted) return;
    playClickSfx({ boost: 0.55 });
    const question = currentChapterData().questions[questionIndex];
    if (!question) return;

    const key = currentQuestionKey();
    const unlocked = unlockedHintKeys.has(key);

    if (!unlocked) {
      if (coins < HINT_COIN_COST) {
        playSfx('wrong', { rate: 0.92, boost: 0.72 });
        setDialogue(`Need ${HINT_COIN_COST - coins} more coins to buy bread hint.`, 1400);
        renderHintUi();
        return;
      }

      coins -= HINT_COIN_COST;
      unlockedHintKeys.add(key);
      hintVisible = true;
      const hintCenter = elementCenter(hintToggleBtn);
      if (hintCenter) {
        spawnCoinBurst(hintCenter.x, hintCenter.y, 8, 95);
        spawnFloatingScore(`-${HINT_COIN_COST}`, hintCenter.x, hintCenter.y - 10, 'spent');
      }
      playSfx('hint', { rate: 1.06, boost: 1 });
      setDialogue('Bread clue unlocked for this challenge.', 1200);
      updateHud();
      persistState();
    } else {
      hintVisible = !hintVisible;
    }

    renderHintUi();
    renderProgrammingHint(question);
  });
}

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    playClickSfx();
    closeOverlay(assessmentPanel);

    if (chapterFailed) {
      loadChapter(currentChapter, { withCinematic: false });
      return;
    }

    if (currentChapter === totalChapters && chapterCompleted) {
      openEndingStory();
      return;
    }

    if (currentChapter < totalChapters && unlockedChapter >= currentChapter + 1) {
      loadChapter(currentChapter + 1, { withCinematic: true });
    } else {
      loadChapter(currentChapter, { withCinematic: false });
    }
  });
}

if (endingNextBtn) {
  endingNextBtn.addEventListener('click', () => {
    playClickSfx();
    replayEndingStory();
  });
}

if (endingHomeBtn) {
  endingHomeBtn.addEventListener('click', () => {
    playClickSfx();
    if (!confirmExitToHome('ending')) return;
    finishEndingStory();
    navigateToHome();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay(settingsPanel);
    closeOverlay(journalPanel);
    closeOverlay(shopPanel);
    closeOverlay(endingPanel);
    if (cinematicPlaying) cinematicSkipRequested = true;
  }
});

if (homeButton) {
  homeButton.addEventListener('click', () => {
    playClickSfx();
    if (!confirmExitToHome('game')) return;
    navigateToHome();
  });
}

async function loadChapter(chapterNumber, options = {}) {
  const { withCinematic = true } = options;
  const chapter = clamp(chapterNumber, 1, totalChapters);

  if (chapter > unlockedChapter) {
    setDialogue('Finish current chapter to unlock the next journey.', 1600);
    return;
  }

  if (!canAccessChapter(chapter)) {
    setDialogue('This is premium content. You can try it, but consider unlocking for full access!', 2000);
  }

  chapterLoadToken += 1;
  const token = chapterLoadToken;

  currentChapter = chapter;
  questionIndex = 0;
  roundCorrect = 0;
  roundAttempts = 0;
  chapterCompleted = false;
  chapterFailed = false;
  lives = MAX_LIVES;
  answerLocked = false;

  if (activeValue) {
    activeValue.remove();
    activeValue = null;
  }

  clearHighlights();
  clearDragState();
  activeHintKey = null;
  hintVisible = false;
  updateChapterMeta();
  updateSceneTheme(currentChapterData(), true);
  setDialogue(currentChapterData().cue);
  renderProgrammingHint();

  renderChapterStrip();
  renderChapterButtons();
  updateHud();
  updateProgress();
  persistState();
  if (continueBtn) continueBtn.textContent = 'Continue';

  if (withCinematic) {
    await playChapterCinematic(currentChapterData());
  }

  if (token !== chapterLoadToken) return;
  spawnValue();
  
  // Ensure mode panel is properly rendered for non-box modes
  const mode = getQuestionMode();
  if (mode !== 'box' && modePanel) {
    modePanel.hidden = false;
  }
}

function resumeAudio() {
  if (!gameBgm) return;
  gameBgm.play().catch(() => {});
  Object.keys(SFX_LIBRARY).forEach((name) => {
    ensureSfxPool(name);
  });
  window.removeEventListener('pointerdown', resumeAudio);
}

if (gameBgm) {
  const savedBg = Number(localStorage.getItem('gameBgVolume') || '50');
  const savedSfx = Number(localStorage.getItem('gameSfxVolume') || '80');
  const bg = Number.isFinite(savedBg) ? clamp(savedBg, 0, 100) : 50;
  const sfx = Number.isFinite(savedSfx) ? clamp(savedSfx, 0, 100) : 80;

  gameBgm.volume = bg / 100;
  setSfxVolume(sfx / 100);
  if (bgVolumeSlider) bgVolumeSlider.value = String(bg);
  if (sfxVolumeSlider) sfxVolumeSlider.value = String(sfx);
  Object.keys(SFX_LIBRARY).forEach((name) => {
    ensureSfxPool(name);
  });

  gameBgm.play().catch(() => {
    window.addEventListener('pointerdown', resumeAudio, { once: true });
  });

  if (bgVolumeSlider) {
    bgVolumeSlider.addEventListener('input', () => {
      const value = clamp(Number(bgVolumeSlider.value), 0, 100);
      gameBgm.volume = value / 100;
      localStorage.setItem('gameBgVolume', String(value));
    });
  }

  if (sfxVolumeSlider) {
    sfxVolumeSlider.addEventListener('input', () => {
      const value = clamp(Number(sfxVolumeSlider.value), 0, 100);
      setSfxVolume(value / 100);
      localStorage.setItem('gameSfxVolume', String(value));
    });
  }
}

const playerName = localStorage.getItem('playerName');
if (duckName) {
  duckName.textContent = playerName ? `${playerName}'s Duck` : 'Bread Duck';
}

if (!ownedStyles.includes('idle')) ownedStyles.push('idle');
warmupCharacterSprites();
applyStyle(selectedStyle);
renderStyleShop();
loadChapter(currentChapter, { withCinematic: true });
