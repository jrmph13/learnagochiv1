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
    cue: 'Let us begin with literals: string, bool, and int.',
    storyHook: 'Story: You dry the duck beside the pond while writing your first values.',
    learningGoal: 'Goal: Classify each literal as string, bool, or int.',
    sceneAsset: '../assets/scenes/scene-ch1-rain.svg',
    sceneFx: 'rain',
    cinematicLines: [
      'Rain slows down. The duck watches your notebook.',
      'You write your first values together by the pond.'
    ],
    prepLabel: 'Preparing literal drills...',
    questions: [
      { value: '200', type: 'int', hint: 'Whole numbers with no quotes are int.' },
      { value: '"hello"', type: 'string', hint: 'Anything in quotes is string.' },
      { value: 'false', type: 'bool', hint: 'false is boolean.' },
      { value: '0', type: 'int', hint: 'Zero is still int.' },
      { value: '"Duck"', type: 'string', hint: 'Text in quotes is string.' },
      { value: 'true', type: 'bool', hint: 'true is boolean.' },
      { value: '-9', type: 'int', hint: 'Negative whole numbers are int.' },
      { value: '"rainy day"', type: 'string', hint: 'Sentence in quotes is string.' },
      { value: '77', type: 'int', hint: 'Whole number means int.' },
      { value: '"42"', type: 'string', hint: 'Quoted number becomes string.' }
    ]
  },
  2: {
    title: 'Chapter 2: Variable Values',
    cue: 'Variables hold values. Focus on the value type, not the name.',
    storyHook: 'Story: Your duck now follows your pen as you label notes and track progress.',
    learningGoal: 'Goal: Read each assigned value and sort it into the correct data type box.',
    sceneAsset: '../assets/scenes/scene-ch2-study.svg',
    sceneFx: 'breeze',
    cinematicLines: [
      'The duck is stronger now and peeks over your notes.',
      'You start tracking names, flags, and scores in variables.'
    ],
    prepLabel: 'Preparing variable drills...',
    questions: [
      { value: '"coins"', type: 'string', hint: 'Quoted labels are string.' },
      { value: '1', type: 'int', hint: 'Whole number is int.' },
      { value: '"playerName"', type: 'string', hint: 'Variable label in quotes is string.' },
      { value: 'false', type: 'bool', hint: 'false is bool.' },
      { value: '999', type: 'int', hint: 'Whole number remains int.' },
      { value: '"levelUp"', type: 'string', hint: 'Quoted word remains string.' },
      { value: 'true', type: 'bool', hint: 'true is bool.' },
      { value: '42', type: 'int', hint: 'Whole number remains int.' },
      { value: '"A"', type: 'string', hint: 'Character in quotes is string.' },
      { value: '-120', type: 'int', hint: 'Negative whole value is int.' }
    ]
  },
  3: {
    title: 'Chapter 3: Logic Practice',
    cue: 'Final stretch. Some values look tricky, so inspect carefully.',
    storyHook: 'Story: At sunrise, your duck is ready for the logic check mission.',
    learningGoal: 'Goal: Distinguish booleans from string look-alikes and clear the mission.',
    sceneAsset: '../assets/scenes/scene-ch3-sunrise.svg',
    sceneFx: 'sunrise',
    cinematicLines: [
      'Sunlight reaches the pond. Logic mission starts.',
      'Your duck trusts you. Keep every type check accurate.'
    ],
    prepLabel: 'Preparing logic drills...',
    questions: [
      { value: 'true', type: 'bool', hint: 'No quotes and logical value means bool.' },
      { value: '"true"', type: 'string', hint: 'Quoted true is string.' },
      { value: '100', type: 'int', hint: 'Whole number means int.' },
      { value: '"Done"', type: 'string', hint: 'Quoted text is string.' },
      { value: 'false', type: 'bool', hint: 'false is bool.' },
      { value: '-1000', type: 'int', hint: 'Negative whole number is int.' },
      { value: '"bool"', type: 'string', hint: 'Word bool in quotes is string.' },
      { value: '0', type: 'int', hint: '0 is int.' },
      { value: 'true', type: 'bool', hint: 'true is bool.' },
      { value: '"final"', type: 'string', hint: 'Quoted value is string.' }
    ]
  },
  4: {
    title: 'Chapter 4: Festival Assessment',
    cue: 'Festival day challenge: combine speed and accuracy.',
    storyHook: 'Story: The pond festival starts, and your duck joins the coding showcase.',
    learningGoal: 'Goal: Clear a mixed challenge set to earn bonus coins and full trust.',
    sceneAsset: '../assets/scenes/scene-ch4-festival.svg',
    sceneFx: 'festival',
    cinematicLines: [
      'Lantern lights glow over the pond as the final challenge begins.',
      'Your duck bows to the crowd and waits for your guidance.'
    ],
    prepLabel: 'Preparing festival finals...',
    questions: [
      { value: '"festival"', type: 'string', hint: 'Quoted words are string.' },
      { value: '2048', type: 'int', hint: 'Whole number is int.' },
      { value: 'false', type: 'bool', hint: 'Logical false is bool.' },
      { value: '"0"', type: 'string', hint: 'Quoted zero is string.' },
      { value: '-1', type: 'int', hint: 'Negative whole value is int.' },
      { value: 'true', type: 'bool', hint: 'Logical true is bool.' },
      { value: '"duckWins"', type: 'string', hint: 'Quoted variable-like text is string.' },
      { value: '77', type: 'int', hint: 'Whole number is int.' },
      { value: '"false"', type: 'string', hint: 'In quotes, false is string.' },
      { value: 'false', type: 'bool', hint: 'Without quotes, false is bool.' },
      { value: '315', type: 'int', hint: 'Whole number remains int.' },
      { value: '"pond medal"', type: 'string', hint: 'Quoted phrase is string.' }
    ]
  }
};

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

let cinematicPlaying = false;
let cinematicSkipRequested = false;
let cinematicRunId = 0;
let chapterLoadToken = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function spawnValue() {
  if (!valueContainer || chapterCompleted || cinematicPlaying) return;

  if (activeValue) activeValue.remove();

  const question = currentChapterData().questions[questionIndex];
  if (!question) return;

  if (programmingTag) {
    programmingTag.textContent = question.hint ? `Hint: ${question.hint}` : 'Drag into the correct box.';
  }

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
    const text = score >= 80
      ? `Great chapter clear. ${roundCorrect}/${total} correct, your duck trusts your logic.`
      : `You got ${roundCorrect}/${total}. Review tricky values, then try again for better rewards.`;
    assessmentSummary.textContent = text;
  }
  if (assessmentScore) assessmentScore.textContent = `${score}%`;
  if (assessmentEarned) assessmentEarned.textContent = String(earned);
  if (assessmentTotal) assessmentTotal.textContent = String(coins);

  openOverlay(assessmentPanel);
  setDuckReaction('complete', 1200);
  setDialogue('Post assessment complete. Coins added to your bag!', 2400);
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
    // Ignore capture release failures.
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

[settingsPanel, journalPanel, assessmentPanel].forEach((panel) => {
  if (!panel) return;
  panel.addEventListener('click', (event) => {
    if (event.target === panel) closeOverlay(panel);
  });
});

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    closeOverlay(assessmentPanel);
    if (currentChapter < totalChapters && unlockedChapter >= currentChapter + 1) {
      loadChapter(currentChapter + 1, { withCinematic: true });
    } else {
      loadChapter(currentChapter, { withCinematic: false });
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay(settingsPanel);
    closeOverlay(journalPanel);
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
  updateChapterMeta();
  updateSceneTheme(currentChapterData(), true);
  setDialogue(currentChapterData().cue);
  if (programmingTag) {
    programmingTag.textContent = 'Drag the value into the correct programming data type box.';
  }

  renderChapterStrip();
  renderChapterButtons();
  updateHud();
  updateProgress();
  persistState();

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
