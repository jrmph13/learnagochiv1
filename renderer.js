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
const storySprite = document.getElementById('story-sprite');
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
  storyLastHold: 520
};

let introRunning = false;
let skipRequested = false;
let nameSubmitLocked = false;
let hasNavigatedToGame = false;
let loadingMessageTimer = null;
let introTimings = DEFAULT_TIMINGS;

const storyFramePositions = [
  '0% 0%',
  '33.333% 0%',
  '66.666% 0%',
  '100% 0%',
  '0% 100%',
  '33.333% 100%',
  '66.666% 100%',
  '100% 100%'
];

const storyNarrative = [
  { line: 'You found a small injured duck in a rainy pond.', subline: 'Frame 1: It looked weak and needed help.' },
  { line: 'You stayed and watched over the duck carefully.', subline: 'Frame 2: You knew you had to save it.' },
  { line: 'You gently reached in and lifted the duck to safety.', subline: 'Frame 3: Rescue started.' },
  { line: 'You brought the duck out of the water and dried it.', subline: 'Frame 4: The duck was safe.' },
  { line: 'You let it rest and recover in a warm basket.', subline: 'Frame 5: Recovery phase.' },
  { line: 'You treated the duck and gave proper care.', subline: 'Frame 6: Healing and trust.' },
  { line: 'You fed it and gave it love every day.', subline: 'Frame 7: Bond growing stronger.' },
  { line: 'Now this bread-faced duck will be your learning guidance and companion.', subline: 'Frame 8: Ready to learn with you.' }
];

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
  // Story now plays as a one-pass async sequence.
}

function setStoryNarrativeByFrame(frameIndex) {
  if (!storyLine || !storySubline) return;
  const safeIndex = Math.min(Math.max(frameIndex, 0), storyNarrative.length - 1);
  if (storyStep) storyStep.textContent = `Scene ${safeIndex + 1} / ${storyNarrative.length}`;
  storyLine.textContent = storyNarrative[safeIndex].line;
  storySubline.textContent = storyNarrative[safeIndex].subline;
}

async function playStorySequenceOnce() {
  if (!storySprite) return;

  for (let frameIndex = 0; frameIndex < storyFramePositions.length; frameIndex += 1) {
    if (skipRequested) return;

    storySprite.style.backgroundPosition = storyFramePositions[frameIndex];
    setStoryNarrativeByFrame(frameIndex);

    if (frameIndex < storyFramePositions.length - 1) {
      await waitOrSkip(introTimings.storyFrameStep);
    }
  }

  // Hold last frame briefly, then continue to loading.
  await waitOrSkip(introTimings.storyLastHold);
}

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

    window.close();

    try {
      window.open('', '_self');
      window.close();
    } catch (error) {
      window.location.href = 'about:blank';
    }
  });
}

// bg music

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
        // Ignore set currentTime failures.
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
    // Ignore storage errors.
  }
});

if (volumeButton && bgAudio) {
  volumeButton.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;
    volumeButton.src = bgAudio.muted ? 'assets/Volume-off.png' : 'assets/Volume-on.png';

    try {
      localStorage.setItem('bgMusicMuted', bgAudio.muted);
    } catch (error) {
      // Ignore storage errors.
    }
  });
}

// Google sign-in button

const GOOGLE_CLIENT_ID = '898335762947-8vavg6euu2rcq8ui2nel2n4pl2kl0g54.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:5500/oauth2callback.html';
const SCOPES = 'openid profile email';

function buildGoogleAuthUrl() {
  const base = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: SCOPES,
    prompt: 'select_account'
  });

  return `${base}?${params.toString()}`;
}

function openAuthPopup(url, name = 'googleAuth', width = 500, height = 650) {
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  const opts = `width=${width},height=${height},top=${top},left=${left}`;
  const popup = window.open(url, name, opts);

  return new Promise((resolve, reject) => {
    if (!popup) return reject(new Error('Popup blocked'));

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        reject(new Error('Popup closed'));
      }
    }, 500);

    function onMessage(event) {
      if (event.origin !== window.location.origin) return;
      clearInterval(timer);
      window.removeEventListener('message', onMessage);
      resolve(event.data);
    }

    window.addEventListener('message', onMessage);
  });
}

async function handleGoogleSignIn() {
  try {
    const authUrl = buildGoogleAuthUrl();
    const result = await openAuthPopup(authUrl);

    const hash = result.hash || '';
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const accessToken = params.get('access_token');

    if (!accessToken) {
      console.warn('Auth result', result);
      return;
    }

    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) throw new Error('Failed to fetch Google profile');

    const profile = await response.json();

    console.log('Signed in user', profile);
    if (playerNameInput) {
      playerNameInput.value = profile.given_name || profile.name || '';
    }

    alert(`Signed in as ${profile.email || profile.name}`);
  } catch (error) {
    console.error('Google sign-in error', error);
  }
}

if (googleSignInButton) {
  googleSignInButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleGoogleSignIn();
  });
}
