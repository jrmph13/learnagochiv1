const boxes = Array.from(document.querySelectorAll('#box-container .box'));
const valueContainer = document.getElementById('value-container');
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

const coinsCount = document.getElementById('coins-count');
const bondLevel = document.getElementById('bond-level');
const bondFill = document.getElementById('bond-fill');

const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const journalToggle = document.getElementById('journal-toggle');
const journalPanel = document.getElementById('journal-panel');
const closeJournal = document.getElementById('close-journal');
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
  idle: { label: 'Calm Look', cost: 0, sprite: '../assets/characters/duck-idle.png' },
  stretch: { label: 'Stretch Charm', cost: 30, sprite: '../assets/characters/duck-stretch.png' },
  splash: { label: 'Splash Hero', cost: 60, sprite: '../assets/characters/duck-splash.png' },
  toast: { label: 'Toast Armor', cost: 90, sprite: '../assets/characters/duck-toast.png' }
};

const duckReactions = {
  good: '../assets/characters/duck-stretch.png',
  bad: '../assets/characters/duck-splash.png',
  complete: '../assets/characters/duck-toast.png'
};

const chapters = {
  1: {
    title: 'Chapter 1: Pond Basics',
    cue: 'Let us begin with core literals: string, bool, and int.',
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
      { value: '"duck"', type: 'string', hint: 'Quoted text is string.' },
      { value: '15', type: 'int', hint: 'Whole number is int.' },
      { value: 'true', type: 'bool', hint: 'Logical true is bool.' },
      { value: '"pond"', type: 'string', hint: 'Word in quotes is string.' },
      { value: '-3', type: 'int', hint: 'Negative whole number is int.' },
      { value: 'false', type: 'bool', hint: 'Logical false is bool.' },
      { value: '108', type: 'int', hint: 'Still int without quotes.' },
      { value: '"Eppy"', type: 'string', hint: 'Name in quotes is string.' },
      { value: '0', type: 'int', hint: 'Zero is int.' },
      { value: '"learn"', type: 'string', hint: 'Quoted verb is string.' }
    ]
  },
  2: {
    title: 'Chapter 2: Variable Values',
    cue: 'Variables hold values. Read the literal carefully each time.',
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
      { value: '"coins"', type: 'string', hint: 'Quoted label is string.' },
      { value: '256', type: 'int', hint: 'No quotes and whole number means int.' },
      { value: '"player_name"', type: 'string', hint: 'Symbols inside quotes remain string.' },
      { value: 'true', type: 'bool', hint: 'Boolean literal is bool.' },
      { value: '-120', type: 'int', hint: 'Negative whole value is int.' },
      { value: '"level_up"', type: 'string', hint: 'Snake-case text in quotes is string.' },
      { value: 'false', type: 'bool', hint: 'Boolean literal is bool.' },
      { value: '42', type: 'int', hint: 'No decimal and no quotes = int.' },
      { value: '"mission-2"', type: 'string', hint: 'Hyphen text in quotes is string.' },
      { value: '730', type: 'int', hint: 'Whole number literal is int.' }
    ]
  },
  3: {
    title: 'Chapter 3: Logic Practice',
    cue: 'Some values look similar. Focus on quotes and exact literal form.',
    storyHook: 'Story: At sunrise, Eppy starts a logic-check mission with tricky look-alikes.',
    learningGoal: 'Goal: Distinguish bool/int from string look-alikes.',
    sceneAsset: '../assets/scenes/scene-ch3-sunrise.svg',
    sceneFx: 'sunrise',
    cinematicLines: [
      'Sunlight reaches the pond. Logic mission starts.',
      'Your duck trusts you. Keep every type check accurate.'
    ],
    prepLabel: 'Preparing logic drills...',
    questions: [
      { value: '"true"', type: 'string', hint: 'Quoted value is string, even if word is true.' },
      { value: 'true', type: 'bool', hint: 'Unquoted true is bool.' },
      { value: '"0"', type: 'string', hint: 'Quoted zero is string.' },
      { value: '0', type: 'int', hint: 'Unquoted zero is int.' },
      { value: '"-12"', type: 'string', hint: 'Quoted negative number is string.' },
      { value: '-12', type: 'int', hint: 'Unquoted negative whole number is int.' },
      { value: '"false"', type: 'string', hint: 'Quoted false is string.' },
      { value: 'false', type: 'bool', hint: 'Unquoted false is bool.' },
      { value: '"100"', type: 'string', hint: 'Quoted number stays string.' },
      { value: '100', type: 'int', hint: 'Unquoted whole number is int.' }
    ]
  },
  4: {
    title: 'Chapter 4: Festival Showcase',
    cue: 'Festival day: apply everything with calm and accuracy.',
    storyHook: 'Story: The pond festival starts, and Eppy joins your coding showcase.',
    learningGoal: 'Goal: Solve a mixed set without relying on repeated patterns.',
    sceneAsset: '../assets/scenes/scene-ch4-festival.svg',
    sceneFx: 'festival',
    cinematicLines: [
      'Lantern lights glow over the pond as the showcase begins.',
      'Eppy greets the crowd while you solve mixed value checks.'
    ],
    prepLabel: 'Preparing festival showcase...',
    questions: [
      { value: '"festival_badge"', type: 'string', hint: 'Quoted text is string.' },
      { value: '2048', type: 'int', hint: 'Whole number is int.' },
      { value: 'true', type: 'bool', hint: 'Unquoted true is bool.' },
      { value: '"score:90"', type: 'string', hint: 'Colon inside quotes remains string.' },
      { value: '-1', type: 'int', hint: 'Negative whole number is int.' },
      { value: 'false', type: 'bool', hint: 'Unquoted false is bool.' },
      { value: '"duckWins"', type: 'string', hint: 'Variable-like text in quotes is string.' },
      { value: '315', type: 'int', hint: 'Still int without quotes.' },
      { value: '"chapter4"', type: 'string', hint: 'Quoted label is string.' },
      { value: '88', type: 'int', hint: 'Whole number is int.' },
      { value: '"logic_passed"', type: 'string', hint: 'Quoted underscored text is string.' },
      { value: '4096', type: 'int', hint: 'Large whole number is int.' }
    ]
  },
  5: {
    title: 'Chapter 5: Final Mastery',
    cue: 'Final chapter: prove you understand literals in real coding-like values.',
    storyHook: 'Story: Eppy now trusts your guidance. One last mastery run before The End.',
    learningGoal: 'Goal: Clear the final mastery set using careful reading and logic.',
    sceneAsset: '../assets/scenes/scene-ch4-festival.svg',
    sceneFx: 'sunrise',
    cinematicLines: [
      'Eppy opens the final notebook page marked: Mastery Check.',
      'This is your last chapter before The End.'
    ],
    prepLabel: 'Preparing final mastery...',
    questions: [
      { value: '"start_game"', type: 'string', hint: 'Quoted command-like text is string.' },
      { value: '512', type: 'int', hint: 'Whole number is int.' },
      { value: 'false', type: 'bool', hint: 'Unquoted false is bool.' },
      { value: '"512"', type: 'string', hint: 'Quoted number is string.' },
      { value: '-204', type: 'int', hint: 'Negative whole number is int.' },
      { value: 'true', type: 'bool', hint: 'Unquoted true is bool.' },
      { value: '"isReady"', type: 'string', hint: 'Name in quotes is string.' },
      { value: '73', type: 'int', hint: 'No quotes and whole number means int.' },
      { value: '"false"', type: 'string', hint: 'Quoted false is string.' },
      { value: '0', type: 'int', hint: 'Zero is int.' },
      { value: '"pond level 5"', type: 'string', hint: 'Sentence in quotes is string.' },
      { value: '9999', type: 'int', hint: 'Whole number is int.' },
      { value: '"true"', type: 'string', hint: 'Quoted true is string.' },
      { value: 'false', type: 'bool', hint: 'Literal false is bool.' }
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
const HINT_COIN_COST = 8;
const DEFAULT_HINT_TEXT = 'Hints are hidden. Use coins to unlock a clue for this challenge.';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  duckCharacter.src = duckReactions[kind];
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

function updateHud() {
  if (coinsCount) coinsCount.textContent = String(coins);

  const level = Math.floor(bondXp / 100) + 1;
  const progress = bondXp % 100;

  if (bondLevel) bondLevel.textContent = String(level);
  if (bondFill) bondFill.style.width = `${progress}%`;
  if (chapterChip) chapterChip.textContent = `Chapter ${currentChapter} / ${totalChapters}`;
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
    pill.textContent = `Ch ${i}`;

    if (i === currentChapter) pill.classList.add('active');
    if (i > unlockedChapter) pill.classList.add('locked');

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
    button.textContent = `Chapter ${i}`;

    if (i === currentChapter) button.classList.add('active');
    if (i > unlockedChapter) {
      button.classList.add('locked');
      button.textContent = `Chapter ${i} (Locked)`;
    }

    button.addEventListener('click', () => {
      if (i > unlockedChapter) {
        setDialogue('Complete earlier chapters first to unlock this one.', 2000);
        return;
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

function renderStyleShop() {
  if (!styleShop) return;

  styleShop.innerHTML = '';

  Object.entries(wardrobeStyles).forEach(([key, info]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'style-btn';

    const owned = ownedStyles.includes(key);
    const active = selectedStyle === key;
    const canBuy = coins >= info.cost;

    button.innerHTML = `<strong>${info.label}</strong><br /><span class="cost">${owned ? 'Owned' : `${info.cost} coins`}</span>`;

    if (active) button.classList.add('active');
    if (!owned) button.classList.add('locked');

    button.addEventListener('click', () => {
      if (owned) {
        applyStyle(key);
        renderStyleShop();
        setDialogue(`Now wearing ${info.label}.`, 1400);
        return;
      }

      if (!canBuy) {
        setDialogue(`Need ${info.cost - coins} more coins for ${info.label}.`, 1800);
        return;
      }

      coins -= info.cost;
      ownedStyles.push(key);
      applyStyle(key);
      updateHud();
      renderStyleShop();
      persistState();
      setDialogue(`Unlocked ${info.label}!`, 1800);
    });

    styleShop.appendChild(button);
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
      hintToggleBtn.textContent = `Unlock Hint (-${HINT_COIN_COST} coins)`;
    }
  }

  if (hintStatus) {
    if (unlocked) {
      hintStatus.textContent = hintVisible
        ? 'Hint unlocked for this challenge.'
        : 'Hint unlocked. Toggle to view it again.';
    } else if (canAfford) {
      hintStatus.textContent = `Hint locked. Spend ${HINT_COIN_COST} coins to unlock this clue.`;
    } else {
      hintStatus.textContent = `Need ${Math.max(0, HINT_COIN_COST - coins)} more coins to unlock hint.`;
    }
  }
}

function renderProgrammingHint(question) {
  if (!programmingTag) return;
  const unlocked = unlockedHintKeys.has(currentQuestionKey());

  if (hintVisible && unlocked && question) {
    programmingTag.textContent = `Hint: ${buildNonRevealingHint(question.value)}`;
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
  if (!valueContainer || chapterCompleted || cinematicPlaying) return;

  if (activeValue) activeValue.remove();

  const question = currentChapterData().questions[questionIndex];
  if (!question) return;

  syncHintStateForCurrentQuestion();
  renderProgrammingHint(question);

  const valueEl = document.createElement('div');
  valueEl.className = 'draggable-value';
  valueEl.textContent = question.value;

  valueContainer.appendChild(valueEl);

  const areaRect = valueContainer.getBoundingClientRect();
  const left = clamp(areaRect.width * 0.16, 20, Math.max(20, areaRect.width - 260));
  const top = clamp(areaRect.height * 0.16, 18, Math.max(18, areaRect.height - 110));
  valueEl.style.left = `${left}px`;
  valueEl.style.top = `${top}px`;

  valueEl.addEventListener('pointerdown', (event) => {
    if (chapterCompleted || cinematicPlaying) return;

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
  const isFinalChapter = currentChapter === totalChapters;

  if (activeValue) {
    activeValue.remove();
    activeValue = null;
  }

  const total = currentChapterData().questions.length;
  const score = roundAttempts > 0 ? Math.round((roundCorrect / roundAttempts) * 100) : 0;
  const masteryBonus = score === 100 ? 25 : score >= 90 ? 15 : 0;
  const chapterBonus = currentChapter * 8;
  const earned = Math.max(30, roundCorrect * 10 + masteryBonus + chapterBonus);

  coins += earned;
  bondXp += 25;

  if (currentChapter < totalChapters) {
    unlockedChapter = Math.max(unlockedChapter, currentChapter + 1);
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
  if (continueBtn) {
    continueBtn.textContent = isFinalChapter ? 'Show Ending Story' : 'Continue';
  }

  openOverlay(assessmentPanel);
  setDuckReaction('complete', 1200);
  setDialogue(isFinalChapter
    ? 'Final chapter complete. Ending story is ready.'
    : 'Post assessment complete. Coins added to your bag!', 2400);
}

function handleDrop(droppedBox) {
  const expectedType = currentChapterData().questions[questionIndex].type;
  const droppedType = droppedBox.dataset.type;

  roundAttempts += 1;

  if (expectedType === droppedType) {
    roundCorrect += 1;
    bondXp += 12;
    showFeedback('good', droppedBox);
    setDuckReaction('good', 900);
    setDialogue('Great match. That type is correct!', 1400);

    questionIndex += 1;

    if (questionIndex >= currentChapterData().questions.length) {
      finishChapter();
      return;
    }

    setTimeout(spawnValue, 480);
  } else {
    bondXp += 3;
    showFeedback('bad', droppedBox);
    setDuckReaction('bad', 850);
    setDialogue('Close. Read the literal carefully and try again.', 1300);
    spawnValue();
  }

  updateHud();
  persistState();
}

function handlePointerMove(event) {
  if (!dragState || event.pointerId !== dragState.pointerId || cinematicPlaying) return;

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
  if (!dragState || event.pointerId !== dragState.pointerId) return;

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
    endingTitle.textContent = endingSceneIndex === endingScenes.length - 1
      ? 'Final Story - The End'
      : 'Final Story';
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
    cinematicSkipRequested = true;
  });
}

if (settingsToggle) settingsToggle.addEventListener('click', () => openOverlay(settingsPanel));
if (closeSettings) closeSettings.addEventListener('click', () => closeOverlay(settingsPanel));
if (journalToggle) journalToggle.addEventListener('click', () => openOverlay(journalPanel));
if (closeJournal) closeJournal.addEventListener('click', () => closeOverlay(journalPanel));

[settingsPanel, journalPanel, assessmentPanel, endingPanel].forEach((panel) => {
  if (!panel) return;
  panel.addEventListener('click', (event) => {
    if (event.target === panel) closeOverlay(panel);
  });
});

if (hintToggleBtn) {
  hintToggleBtn.addEventListener('click', () => {
    if (cinematicPlaying || chapterCompleted) return;
    const question = currentChapterData().questions[questionIndex];
    if (!question) return;

    const key = currentQuestionKey();
    const unlocked = unlockedHintKeys.has(key);

    if (!unlocked) {
      if (coins < HINT_COIN_COST) {
        setDialogue(`Need ${HINT_COIN_COST - coins} more coins to unlock hint.`, 1400);
        renderHintUi();
        return;
      }

      coins -= HINT_COIN_COST;
      unlockedHintKeys.add(key);
      hintVisible = true;
      setDialogue('Hint unlocked for this challenge.', 1200);
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
    closeOverlay(assessmentPanel);
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
    replayEndingStory();
  });
}

if (endingHomeBtn) {
  endingHomeBtn.addEventListener('click', () => {
    finishEndingStory();
    window.location.href = '../index.html';
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay(settingsPanel);
    closeOverlay(journalPanel);
    closeOverlay(endingPanel);
    if (cinematicPlaying) cinematicSkipRequested = true;
  }
});

if (homeButton) {
  homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
}

async function loadChapter(chapterNumber, options = {}) {
  const { withCinematic = true } = options;
  const chapter = clamp(chapterNumber, 1, totalChapters);

  if (chapter > unlockedChapter) {
    setDialogue('Finish current chapter to unlock the next journey.', 1600);
    return;
  }

  chapterLoadToken += 1;
  const token = chapterLoadToken;

  currentChapter = chapter;
  questionIndex = 0;
  roundCorrect = 0;
  roundAttempts = 0;
  chapterCompleted = false;

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
}

function resumeAudio() {
  if (!gameBgm) return;
  gameBgm.play().catch(() => {});
  window.removeEventListener('pointerdown', resumeAudio);
}

if (gameBgm) {
  const savedBg = Number(localStorage.getItem('gameBgVolume') || '50');
  const savedSfx = Number(localStorage.getItem('gameSfxVolume') || '80');
  const bg = Number.isFinite(savedBg) ? clamp(savedBg, 0, 100) : 50;
  const sfx = Number.isFinite(savedSfx) ? clamp(savedSfx, 0, 100) : 80;

  gameBgm.volume = bg / 100;
  if (bgVolumeSlider) bgVolumeSlider.value = String(bg);
  if (sfxVolumeSlider) sfxVolumeSlider.value = String(sfx);

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
      localStorage.setItem('gameSfxVolume', String(value));
    });
  }
}

const playerName = localStorage.getItem('playerName');
if (duckName) {
  duckName.textContent = playerName ? `${playerName}'s Duck` : 'Bread Duck';
}

if (!ownedStyles.includes('idle')) ownedStyles.push('idle');
applyStyle(selectedStyle);
renderStyleShop();
loadChapter(currentChapter, { withCinematic: true });
