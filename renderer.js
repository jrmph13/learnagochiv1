const video = document.getElementById('bg-video');
if (video) {
  video.playbackRate = 0.68;
}

const startScreen = document.getElementById('start-screen');
const cutsceneScreen = document.getElementById('cutscene-screen');
const introSequence = document.getElementById('intro-sequence');
const rainyScene = document.getElementById('rainy-scene');
const storyScene = document.getElementById('story-scene');
const loadingScene = document.getElementById('loading-scene');
const skipIntroButton = document.getElementById('skip-intro');
const fadeOverlay = document.getElementById('fade-overlay');
const loadingBarFill = document.querySelector('.loading-bar-fill');
const loadingText = document.querySelector('.loading-text');
const storyCanvas = document.getElementById('story-canvas');
const storyContext = storyCanvas ? storyCanvas.getContext('2d') : null;
const storyStep = document.getElementById('story-step');
const storyLine = document.getElementById('story-line');
const storySubline = document.getElementById('story-subline');

const nameForm = document.getElementById('name-form');
const playerNameInput = document.getElementById('player-name');
const enterNameButton = document.getElementById('enter-name-button');

const startButton = document.getElementById('start-button');
const exitButton = document.getElementById('exit-button');
const googleSignInButton = document.getElementById('google-signin');

const GAME_START_URL = 'Game/index.html?v=20260404j';
const EXIT_REDIRECT_URL = 'https://www.google.com/';
const INTRO_SEEN_KEY = 'learnagochiIntroSeen';

const DEFAULT_TIMINGS = {
  pollMs: 24,
  fadeIn: 460,
  fadeOut: 460,
  skipFade: 260,
  rainyHold: 700,
  loadingHold: 900,
  loadingMessageStep: 650,
  storyFrameStep: 4000,
  storyFrameFade: 560,
  storyLastHold: 520
};

const FAST_TIMINGS = {
  pollMs: 20,
  fadeIn: 460,
  fadeOut: 460,
  skipFade: 260,
  rainyHold: 700,
  loadingHold: 900,
  loadingMessageStep: 650,
  storyFrameStep: 4000,
  storyFrameFade: 560,
  storyLastHold: 520
};

let introRunning = false;
let skipRequested = false;
let nameSubmitLocked = false;
let hasNavigatedToGame = false;
let loadingMessageTimer = null;
let introTimings = DEFAULT_TIMINGS;
let storyImageReady = false;
let storyRenderFrame = 0;
let storyAnimationRunId = 0;

const STORY_SHEET_COLUMNS = 4;
const STORY_SHEET_ROWS = 4;
const STORY_TOTAL_FRAMES = STORY_SHEET_COLUMNS * STORY_SHEET_ROWS;
const INTRO_SCENE_LIMIT = 12;
const storyImage = new Image();
storyImage.src = 'assets/characters/spritesheet-story.png';

const storyNarrative = [
  { line: 'In a rainy pond, you spotted a tiny injured duck.', subline: 'Scene 1: Rescue begins.' },
  { line: 'You rushed closer and saw it struggling to float.', subline: 'Scene 2: You decided to help.' },
  { line: 'With steady hands, you lifted the duck to safety.', subline: 'Scene 3: Out of danger.' },
  { line: 'You carried it home and kept it warm and dry.', subline: 'Scene 4: First care.' },
  { line: 'You cleaned the wounds and changed its bandage.', subline: 'Scene 5: Recovery day.' },
  { line: 'Little by little, the duck regained its strength.', subline: 'Scene 6: Healing progress.' },
  { line: 'You wrapped a soft scarf and welcomed it home.', subline: 'Scene 7: Bond grows.' },
  { line: 'Now with bread on its head, Eppy smiles at you.', subline: 'Scene 8: A new companion.' },
  { line: 'Eppy invites you to explore and learn together.', subline: 'Scene 9: Learning journey starts.' },
  { line: 'You open coding lessons and practice every day.', subline: 'Scene 10: Skill building.' },
  { line: 'After each challenge, Eppy rests beside you.', subline: 'Scene 11: Trust and comfort.' },
  { line: 'You both care for the pond and grow new ideas.', subline: 'Scene 12: Consistent progress.' },
  { line: 'Returning to the pond, Eppy stands strong now.', subline: 'Scene 13: Full recovery.' },
  { line: 'Eppy reflects: "Grateful... learned so much."', subline: 'Scene 14: Milestone moment.' },
  { line: 'Your mascot guide is ready for every new chapter.', subline: 'Scene 15: Motivation unlocked.' },
  { line: 'A story of rescue, recovery, and learning with Eppy.', subline: 'Scene 16: Your coding companion.' }
];

const STORY_FRAME_COUNT = Math.min(STORY_TOTAL_FRAMES, storyNarrative.length, INTRO_SCENE_LIMIT);

if (storyImage.complete && storyImage.naturalWidth > 0) {
  storyImageReady = true;
}

storyImage.addEventListener('load', () => {
  storyImageReady = true;
  paintStoryFrameBlend(null, storyRenderFrame, 1);
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitOrSkip(ms) {
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (skipRequested || Date.now() - started >= ms) {
        clearInterval(timer);
        resolve();
      }
    }, introTimings.pollMs);
  });
}

async function fadeTo(opacity, duration = 700) {
  if (!fadeOverlay) return;
  fadeOverlay.style.transition = `opacity ${duration}ms ease`;
  requestAnimationFrame(() => {
    fadeOverlay.style.opacity = String(opacity);
  });
  await wait(duration);
}

function setLoadingMessage(message) {
  if (!loadingText) return;
  loadingText.innerHTML = `${message}<span class="loading-dots"></span>`;
}

function startLoadingMessages() {
  const messages = ['Loading', 'Feeding duck', 'Preparing chapter', 'Syncing progress'];
  let index = 0;

  stopLoadingMessages();
  setLoadingMessage(messages[index]);

  loadingMessageTimer = setInterval(() => {
    index = (index + 1) % messages.length;
    setLoadingMessage(messages[index]);
  }, introTimings.loadingMessageStep);
}

function stopLoadingMessages() {
  if (!loadingMessageTimer) return;
  clearInterval(loadingMessageTimer);
  loadingMessageTimer = null;
}

function restartLoadingBar() {
  if (!loadingBarFill) return;
  loadingBarFill.classList.remove('run');
  void loadingBarFill.offsetWidth;
  loadingBarFill.classList.add('run');
}

function stopStoryAnimation() {
  storyAnimationRunId += 1;
}

function easeInOutQuad(value) {
  if (value < 0.5) return 2 * value * value;
  return 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function clampStoryFrame(frameIndex) {
  return Math.min(Math.max(frameIndex, 0), STORY_FRAME_COUNT - 1);
}

function ensureStoryCanvasResolution() {
  if (!storyCanvas || !storyContext) return false;

  const rect = storyCanvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return false;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const targetWidth = Math.round(rect.width * pixelRatio);
  const targetHeight = Math.round(rect.height * pixelRatio);

  if (storyCanvas.width !== targetWidth || storyCanvas.height !== targetHeight) {
    storyCanvas.width = targetWidth;
    storyCanvas.height = targetHeight;
    storyContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    storyContext.imageSmoothingEnabled = true;
    storyContext.imageSmoothingQuality = 'high';
  }

  return true;
}

function clearStoryCanvas() {
  if (!storyCanvas || !storyContext) return;
  if (!ensureStoryCanvasResolution()) return;
  storyContext.clearRect(0, 0, storyCanvas.clientWidth, storyCanvas.clientHeight);
}

function drawStoryFrame(frameIndex, alpha = 1) {
  if (!storyCanvas || !storyContext || !storyImageReady) return;
  if (!ensureStoryCanvasResolution()) return;

  const safeFrame = clampStoryFrame(frameIndex);
  const frameWidth = storyImage.naturalWidth / STORY_SHEET_COLUMNS;
  const frameHeight = storyImage.naturalHeight / STORY_SHEET_ROWS;
  const column = safeFrame % STORY_SHEET_COLUMNS;
  const row = Math.floor(safeFrame / STORY_SHEET_COLUMNS);
  const sx = Math.round(column * frameWidth);
  const sy = Math.round(row * frameHeight);

  storyContext.save();
  storyContext.globalAlpha = Math.min(Math.max(alpha, 0), 1);
  storyContext.drawImage(
    storyImage,
    sx,
    sy,
    Math.round(frameWidth),
    Math.round(frameHeight),
    0,
    0,
    storyCanvas.clientWidth,
    storyCanvas.clientHeight
  );
  storyContext.restore();
}

function paintStoryFrameBlend(previousFrame, nextFrame, blendProgress) {
  if (!storyCanvas || !storyContext || !storyImageReady) return;

  const safeBlend = Math.min(Math.max(blendProgress, 0), 1);
  clearStoryCanvas();

  if (typeof previousFrame === 'number' && safeBlend < 1) {
    drawStoryFrame(previousFrame, 1 - safeBlend);
  }

  drawStoryFrame(nextFrame, safeBlend);
  storyRenderFrame = clampStoryFrame(nextFrame);
}

async function waitForStoryImageReady(timeoutMs = 6000) {
  if (storyImageReady) return true;

  return new Promise((resolve) => {
    let settled = false;

    const finish = (isReady) => {
      if (settled) return;
      settled = true;
      resolve(isReady);
    };

    const onLoad = () => {
      storyImageReady = true;
      finish(true);
    };

    const onError = () => finish(false);

    storyImage.addEventListener('load', onLoad, { once: true });
    storyImage.addEventListener('error', onError, { once: true });

    setTimeout(() => finish(false), timeoutMs);
  });
}

function setStoryNarrativeByFrame(frameIndex) {
  if (!storyLine || !storySubline) return;
  const safeIndex = clampStoryFrame(frameIndex);
  if (storyStep) storyStep.textContent = `Scene ${safeIndex + 1} / ${STORY_FRAME_COUNT}`;
  storyLine.textContent = storyNarrative[safeIndex].line;
  storySubline.textContent = storyNarrative[safeIndex].subline;
}

async function animateStoryTransition(previousFrame, nextFrame, runId) {
  const duration = Math.max(0, introTimings.storyFrameFade);

  if (duration <= 0) {
    paintStoryFrameBlend(previousFrame, nextFrame, 1);
    return true;
  }

  return new Promise((resolve) => {
    const startedAt = performance.now();

    const step = (now) => {
      if (skipRequested || runId !== storyAnimationRunId) {
        resolve(false);
        return;
      }

      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      paintStoryFrameBlend(previousFrame, nextFrame, easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      resolve(true);
    };

    requestAnimationFrame(step);
  });
}

async function playStorySequenceOnce() {
  if (!storyCanvas || !storyContext) return;
  if (!storyImageReady) {
    const ready = await waitForStoryImageReady();
    if (!ready) return;
  }

  const runId = ++storyAnimationRunId;
  paintStoryFrameBlend(null, 0, 0);

  for (let frameIndex = 0; frameIndex < STORY_FRAME_COUNT; frameIndex += 1) {
    if (skipRequested || runId !== storyAnimationRunId) return;

    const previousFrame = frameIndex > 0 ? frameIndex - 1 : null;
    setStoryNarrativeByFrame(frameIndex);
    const didAnimate = await animateStoryTransition(previousFrame, frameIndex, runId);
    if (!didAnimate) return;

    const frameHold = frameIndex === STORY_FRAME_COUNT - 1
      ? introTimings.storyLastHold
      : Math.max(0, introTimings.storyFrameStep - introTimings.storyFrameFade);

    if (frameHold > 0) {
      await waitOrSkip(frameHold);
    }
  }
}

window.addEventListener('resize', () => {
  if (!storyCanvas || !storyImageReady) return;
  paintStoryFrameBlend(null, storyRenderFrame, 1);
});

function goToGame() {
  if (hasNavigatedToGame) return;
  hasNavigatedToGame = true;
  stopLoadingMessages();
  stopStoryAnimation();
  window.location.assign(GAME_START_URL);
}

async function playIntroSequence() {
  if (introRunning || !introSequence || !rainyScene || !storyScene || !loadingScene) return false;

  introRunning = true;
  skipRequested = false;
  introTimings = localStorage.getItem(INTRO_SEEN_KEY) === 'true' ? FAST_TIMINGS : DEFAULT_TIMINGS;
  setLoadingMessage('Loading');

  document.body.classList.add('intro-active');
  if (cutsceneScreen) cutsceneScreen.style.display = 'none';
  introSequence.style.display = 'block';
  rainyScene.style.display = 'block';
  storyScene.style.display = 'none';
  loadingScene.style.display = 'none';

  if (fadeOverlay) {
    fadeOverlay.style.transition = 'none';
    fadeOverlay.style.opacity = '1';
    void fadeOverlay.offsetWidth;
  }

  await fadeTo(0, introTimings.fadeOut);
  await waitOrSkip(introTimings.rainyHold);

  if (skipRequested) {
    await fadeTo(1, introTimings.skipFade);
    goToGame();
    return true;
  }

  await fadeTo(1, introTimings.fadeIn);
  rainyScene.style.display = 'none';
  storyScene.style.display = 'flex';
  await fadeTo(0, introTimings.fadeOut);

  await playStorySequenceOnce();

  if (skipRequested) {
    await fadeTo(1, introTimings.skipFade);
    goToGame();
    return true;
  }

  await fadeTo(1, introTimings.fadeIn);
  storyScene.style.display = 'none';
  stopStoryAnimation();

  loadingScene.style.display = 'block';
  restartLoadingBar();
  startLoadingMessages();
  await fadeTo(0, introTimings.fadeOut);

  await waitOrSkip(introTimings.loadingHold);
  await fadeTo(1, introTimings.fadeIn);
  localStorage.setItem(INTRO_SEEN_KEY, 'true');
  goToGame();
  return true;
}

async function startFromName() {
  if (nameSubmitLocked || introRunning) return;
  if (!cutsceneScreen || cutsceneScreen.style.display === 'none') return;

  const typedName = playerNameInput ? playerNameInput.value.trim() : '';
  if (!typedName) {
    if (playerNameInput) {
      playerNameInput.setCustomValidity('Please enter your name first.');
      playerNameInput.reportValidity();
      playerNameInput.focus();
      playerNameInput.setCustomValidity('');
    }
    return;
  }

  const finalName = typedName;
  nameSubmitLocked = true;

  if (playerNameInput) {
    playerNameInput.value = finalName;
    playerNameInput.blur();
    playerNameInput.disabled = true;
  }

  if (enterNameButton) {
    enterNameButton.disabled = true;
    enterNameButton.classList.add('is-starting');
  }

  try {
    localStorage.setItem('playerName', finalName);
  } catch (error) {
    console.warn('Unable to save playerName', error);
  }

  const didStart = await playIntroSequence();
  if (!didStart) {
    nameSubmitLocked = false;
    if (playerNameInput) playerNameInput.disabled = false;
    if (enterNameButton) {
      enterNameButton.disabled = false;
      enterNameButton.classList.remove('is-starting');
    }
  }
}

if (startButton) {
  startButton.addEventListener('click', () => {
    if (startScreen) startScreen.style.display = 'none';
    if (cutsceneScreen) cutsceneScreen.style.display = 'flex';

    nameSubmitLocked = false;
    introRunning = false;
    skipRequested = false;
    hasNavigatedToGame = false;

    if (playerNameInput) {
      playerNameInput.disabled = false;
      playerNameInput.focus();
    }

    if (enterNameButton) {
      enterNameButton.disabled = false;
      enterNameButton.classList.remove('is-starting');
    }
  });
}

if (nameForm) {
  nameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!nameForm.reportValidity()) return;
    await startFromName();
  });
}

if (playerNameInput) {
  playerNameInput.addEventListener('input', () => {
    playerNameInput.setCustomValidity('');
  });
}

if (skipIntroButton) {
  skipIntroButton.addEventListener('click', () => {
    if (!introRunning) return;
    skipRequested = true;
    skipIntroButton.textContent = 'Skipping...';
    setTimeout(() => {
      skipIntroButton.textContent = 'Skip intro...>';
    }, 420);
  });
}

if (exitButton) {
  exitButton.addEventListener('click', () => {
    if (!confirm('Close this tab?')) return;
    window.location.replace(EXIT_REDIRECT_URL);
  });
}

const bgAudio = document.getElementById('bg-music');
const volumeButton = document.getElementById('volume-button');

if (bgAudio) {
  bgAudio.loop = true;
}

const TARGET_VOLUME = 0.5;
if (bgAudio) {
  bgAudio.volume = TARGET_VOLUME;
}

function tryPlayAudio() {
  if (!bgAudio) return Promise.reject(new Error('No bg audio element found'));

  const playPromise = bgAudio.play();
  if (!playPromise) return Promise.reject(new Error('play() returned falsy'));
  return playPromise;
}

function fadeInAudio(target = TARGET_VOLUME, step = 0.05, interval = 80) {
  if (!bgAudio) return;

  bgAudio.volume = 0;
  const id = setInterval(() => {
    bgAudio.volume = Math.min(bgAudio.volume + step, target);
    if (bgAudio.volume >= target) clearInterval(id);
  }, interval);
}

window.addEventListener('load', () => {
  if (!bgAudio) return;

  const savedTime = localStorage.getItem('bgMusicTime');
  const savedMuted = localStorage.getItem('bgMusicMuted');

  if (savedMuted !== null) {
    bgAudio.muted = savedMuted === 'true';
    if (volumeButton) {
      volumeButton.src = bgAudio.muted ? 'assets/Volume-off.png' : 'assets/Volume-on.png';
    }
  }

  const onLoadedMetadata = () => {
    if (savedTime !== null && !isNaN(savedTime)) {
      try {
        const t = Math.min(parseFloat(savedTime), bgAudio.duration || parseFloat(savedTime));
        if (isFinite(t)) bgAudio.currentTime = t;
      } catch (error) {
      }
    }

    tryPlayAudio()
      .then(() => {
        if (!bgAudio.muted) fadeInAudio();
      })
      .catch(() => {
        const resumeOnce = () => {
          tryPlayAudio()
            .then(() => {
              if (!bgAudio.muted) fadeInAudio();
            })
            .catch(() => {});

          window.removeEventListener('click', resumeOnce);
          if (startButton) startButton.removeEventListener('click', resumeOnce);
        };

        window.addEventListener('click', resumeOnce, { once: true });
        if (startButton) startButton.addEventListener('click', resumeOnce, { once: true });
      });
  };

  if (bgAudio.readyState >= 1) {
    onLoadedMetadata();
  } else {
    bgAudio.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
  }
});

window.addEventListener('beforeunload', () => {
  if (!bgAudio) return;
  stopStoryAnimation();

  try {
    localStorage.setItem('bgMusicTime', bgAudio.currentTime);
    localStorage.setItem('bgMusicMuted', bgAudio.muted);
  } catch (error) {
  }
});

if (volumeButton && bgAudio) {
  volumeButton.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;
    volumeButton.src = bgAudio.muted ? 'assets/Volume-off.png' : 'assets/Volume-on.png';

    try {
      localStorage.setItem('bgMusicMuted', bgAudio.muted);
    } catch (error) {
    }
  });
}

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCEsQGftz10XTJWSObhayCc4CIk0GgWRnY',
  authDomain: 'storied-storm-418509.firebaseapp.com',
  projectId: 'storied-storm-418509',
  storageBucket: 'storied-storm-418509.firebasestorage.app',
  messagingSenderId: '597008183375',
  appId: '1:597008183375:web:328ef3019dd80d603b3a3a',
  measurementId: 'G-87Q1HHZ8XP'
};

let firebaseAuthInitPromise = null;
let firebaseAuth = null;
let firebaseProvider = null;
let firebaseSignInWithPopup = null;

function initFirebaseAuth() {
  if (firebaseAuthInitPromise) return firebaseAuthInitPromise;

  firebaseAuthInitPromise = Promise.all([
    import('https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js')
  ])
    .then(async ([firebaseAppModule, firebaseAuthModule]) => {
      const app = firebaseAppModule.initializeApp(FIREBASE_CONFIG);
      firebaseAuth = firebaseAuthModule.getAuth(app);
      firebaseProvider = new firebaseAuthModule.GoogleAuthProvider();
      firebaseProvider.setCustomParameters({ prompt: 'select_account' });
      firebaseSignInWithPopup = firebaseAuthModule.signInWithPopup;
      await firebaseAuthModule.setPersistence(firebaseAuth, firebaseAuthModule.browserLocalPersistence);
      return {
        auth: firebaseAuth,
        provider: firebaseProvider,
        signInWithPopup: firebaseSignInWithPopup
      };
    })
    .catch((error) => {
      firebaseAuthInitPromise = null;
      throw error;
    });

  return firebaseAuthInitPromise;
}

async function handleGoogleSignIn() {
  try {
    const authBundle = await initFirebaseAuth();
    const result = await authBundle.signInWithPopup(authBundle.auth, authBundle.provider);
    const user = result.user;

    if (playerNameInput) {
      const preferredName = user.displayName || user.email || '';
      playerNameInput.value = preferredName.split(' ')[0] || preferredName;
    }

    try {
      localStorage.setItem(
        'googleProfile',
        JSON.stringify({
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || ''
        })
      );
    } catch (error) {
    }

    alert(`Signed in as ${user.email || user.displayName || 'Google user'}`);
  } catch (error) {
    console.error('Google sign-in error', error);
    alert('Google sign-in failed. Please check Firebase authorized domains and try again.');
  }
}

if (googleSignInButton) {
  googleSignInButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleGoogleSignIn();
  });
}
