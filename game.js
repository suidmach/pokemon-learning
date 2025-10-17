// ========== DATA & STATE ==========
const MAX_NUM = 200;
const numbers = Array.from({length: MAX_NUM}, (_, i) => i + 1);

const pokemonNames = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

const creatures = pokemonNames.map((name, i) => ({
  id: `poke${i + 1}`,
  name,
  img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
  index: i + 1
}));

const LEGENDARIES = new Set([144, 145, 146, 150, 151]);
const RARES = new Set([25, 131, 142]);

const achievements = {
  'first_catch': { name: 'First Catch!', description: 'Caught your first Pokémon' },
  'streak_master': { name: 'Streak Master', description: '20 correct in a row' },
  'legendary_trainer': { name: 'Legendary Trainer', description: 'Caught a legendary' },
  'egg_hatcher': { name: 'Egg Hatcher', description: 'Hatched your first egg' },
  'collector_50': { name: 'Collector', description: 'Caught 50 Pokémon' },
  'rocket_defeated': { name: 'Rocket Buster', description: 'Beat Team Rocket 5 times' },
  'dex_complete': { name: 'Pokédex Master', description: 'Filled the entire Pokédex' },
  'egg_collector': { name: 'Egg Collector', description: 'Collected 10 eggs' },
  'speed_typist': { name: 'Speed Typist', description: 'Answered in under 2 seconds' },
  'reading_master': { name: 'Reading Master', description: 'Mastered 50 reading questions' },
  'phonics_pro': { name: 'Phonics Pro', description: 'Completed 25 phonics challenges' },
  'math_rookie': { name: 'Math Rookie', description: 'Solved 10 math problems' },
  'addition_expert': { name: 'Addition Expert', description: 'Reached level 5 in addition' },
  'subtraction_expert': { name: 'Subtraction Expert', description: 'Reached level 5 in subtraction' },
  'math_master': { name: 'Math Master', description: 'Solved 100 math problems' },
  'quick_calculator': { name: 'Quick Calculator', description: 'Solved 10 math problems in a row' },
  'perfect_session': { name: 'Perfect Session', description: 'Got 20 math problems right without a mistake' }
};

// Time learning data
const timeSkills = {
  hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  minutes: [0, 15, 30, 45],
  timeWords: ['hour', 'minute', 'clock', 'time', 'morning', 'afternoon', 'evening', 'night'],
  dailyActivities: [
    { time: '7:00', activity: 'wake up', period: 'morning' },
    { time: '8:00', activity: 'eat breakfast', period: 'morning' },
    { time: '12:00', activity: 'eat lunch', period: 'afternoon' },
    { time: '3:00', activity: 'snack time', period: 'afternoon' },
    { time: '6:00', activity: 'eat dinner', period: 'evening' },
    { time: '8:00', activity: 'bedtime', period: 'night' }
  ]
};

// Science and nature content
const scienceContent = {
  animals: [
    { name: 'elephant', habitat: 'savanna', sound: 'trumpet', fact: 'largest land animal' },
    { name: 'dolphin', habitat: 'ocean', sound: 'click', fact: 'very smart marine mammal' },
    { name: 'owl', habitat: 'forest', sound: 'hoot', fact: 'hunts at night' },
    { name: 'frog', habitat: 'pond', sound: 'ribbit', fact: 'starts as a tadpole' },
    { name: 'bee', habitat: 'hive', sound: 'buzz', fact: 'makes honey' }
  ],
  weather: ['sunny', 'rainy', 'cloudy', 'snowy', 'windy', 'stormy'],
  seasons: ['spring', 'summer', 'fall', 'winter'],
  plants: ['tree', 'flower', 'grass', 'bush', 'vine']
};

// Enhanced achievements for new content
const newAchievements = {
  'time_master': { name: 'Time Master', description: 'Learned to read 20 different times' },
  'nature_explorer': { name: 'Nature Explorer', description: 'Identified 15 animals correctly' },
  'weather_watcher': { name: 'Weather Watcher', description: 'Mastered weather vocabulary' },
  'daily_scheduler': { name: 'Daily Scheduler', description: 'Matched 10 activities to correct times' },
  'science_student': { name: 'Science Student', description: 'Completed 25 science questions' },
  'pattern_detective': { name: 'Pattern Detective', description: 'Solved 15 sequence puzzles' }
};

// Merge with existing achievements
Object.assign(achievements, newAchievements);
const readingWords = {
  simple: ['cat', 'dog', 'run', 'big', 'red', 'sun', 'hat', 'mat', 'bat', 'sit', 'top', 'hop', 'cup', 'bug', 'fun', 'pig', 'bag', 'leg', 'web', 'pen'],
  medium: ['jump', 'swim', 'play', 'happy', 'truck', 'clock', 'smile', 'green', 'snake', 'bread', 'chair', 'plant', 'beach', 'sheep', 'brown', 'quick', 'earth', 'light'],
  hard: ['elephant', 'butterfly', 'rainbow', 'adventure', 'beautiful', 'computer', 'dinosaur', 'umbrella', 'basketball', 'chocolate', 'telephone', 'helicopter', 'photograph', 'restaurant']
};

const sightWords = ['the', 'and', 'to', 'a', 'I', 'you', 'it', 'in', 'said', 'for', 'up', 'look', 'is', 'go', 'we', 'little', 'down', 'can', 'see', 'not', 'one', 'my', 'me', 'big', 'come', 'blue', 'red', 'where', 'jump', 'away', 'here', 'help', 'make', 'yellow', 'two', 'play', 'run', 'find', 'three', 'funny'];

const rhymingPairs = {
  'cat': ['bat', 'hat', 'mat', 'rat'],
  'dog': ['log', 'fog', 'hog', 'jog'],
  'sun': ['run', 'fun', 'bun', 'gun'],
  'tree': ['bee', 'see', 'free', 'knee'],
  'cake': ['make', 'take', 'lake', 'wake'],
  'ball': ['call', 'fall', 'tall', 'wall']
};

const STORAGE_KEY = 'spelling_numbers_finn_v6';
let state = {
  gameMode: 'mixed', // 'numbers', 'reading', 'mixed', 'math', 'time', 'science'
  difficulty: 1,
  streak: 0,
  mastered: [],
  readingMastered: [],
  mathMastered: [],
  timeMastered: [],
  scienceMastered: [],
  mistakes: {},
  readingMistakes: {},
  mathMistakes: {},
  timeMistakes: {},
  scienceMistakes: {},
  collection: [],
  stolen: [],
  lastQuestion: null,
  correctTotal: 0,
  readingTotal: 0,
  mathTotal: 0,
  timeTotal: 0,
  scienceTotal: 0,
  sound: true,
  hints: true,
  speechRate: 0.8,
  textSize: 'normal', // 'small', 'normal', 'large'
  colorMode: 'normal', // 'normal', 'high-contrast'
  milestones: [],
  achievementsUnlocked: {},
  eggs: [],
  hatched: [],
  rocketWins: 0,
  phonicsCompleted: 0,
  // Math difficulty tracking
  additionLevel: 1,
  subtractionLevel: 1,
  mathStreak: 0,
  mathSessionCorrect: 0,
  mathSessionTotal: 0,
  // New tracking
  timeLevel: 1,
  scienceStreak: 0,
  sessionStartTime: null,
  dailyGoal: 20,
  dailyProgress: 0
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const loaded = JSON.parse(raw);
      state = { ...state, ...loaded };
    }
  } catch (e) {
    console.warn('Error loading save data:', e);
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Error saving data:', e);
  }
}

load();

// ========== MATH SYSTEM ==========
function getMathDifficultyLevel(type) {
  if (type === 'addition') return state.additionLevel;
  if (type === 'subtraction') return state.subtractionLevel;
  return 1;
}

function adjustMathDifficulty(type, wasCorrect) {
  const currentLevel = getMathDifficultyLevel(type);
  
  if (wasCorrect) {
    state.mathStreak++;
    state.mathSessionCorrect++;
    
    // Increase difficulty if they're doing well
    if (state.mathStreak >= 5 && currentLevel < 5) {
      if (type === 'addition') {
        state.additionLevel++;
        showTempMessage(`🎉 Addition Level ${state.additionLevel} unlocked!`, 2000, 'success');
        if (state.additionLevel === 5) unlockAchievement('addition_expert');
      } else if (type === 'subtraction') {
        state.subtractionLevel++;
        showTempMessage(`🎉 Subtraction Level ${state.subtractionLevel} unlocked!`, 2000, 'success');
        if (state.subtractionLevel === 5) unlockAchievement('subtraction_expert');
      }
      state.mathStreak = 0; // Reset streak after level up
    }
  } else {
    state.mathStreak = 0;
    // Don't decrease difficulty immediately, but track mistakes
  }
  
  state.mathSessionTotal++;
  save();
}

function generateAdditionProblem(level) {
  let num1, num2, max;
  
  switch(level) {
    case 1: // 1+1 to 5+5
      max = 5;
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      break;
    case 2: // 1+1 to 10+10, ensure sum ≤ 20
      max = 10;
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * (20 - num1)) + 1;
      break;
    case 3: // 10+10 to 25+25
      num1 = Math.floor(Math.random() * 16) + 10; // 10-25
      num2 = Math.floor(Math.random() * 16) + 10; // 10-25
      break;
    case 4: // 20+20 to 50+50
      num1 = Math.floor(Math.random() * 31) + 20; // 20-50
      num2 = Math.floor(Math.random() * 31) + 20; // 20-50
      break;
    case 5: // 25+25 to 99+99
      num1 = Math.floor(Math.random() * 75) + 25; // 25-99
      num2 = Math.floor(Math.random() * 75) + 25; // 25-99
      break;
    default:
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
  }
  
  return { num1, num2, answer: num1 + num2, operation: '+' };
}

function generateSubtractionProblem(level) {
  let num1, num2;
  
  switch(level) {
    case 1: // 5-1 to 10-5
      num1 = Math.floor(Math.random() * 6) + 5; // 5-10
      num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
      break;
    case 2: // 10-5 to 20-10
      num1 = Math.floor(Math.random() * 11) + 10; // 10-20
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 to num1-1
      break;
    case 3: // 20-10 to 50-25
      num1 = Math.floor(Math.random() * 31) + 20; // 20-50
      num2 = Math.floor(Math.random() * (num1 - 10)) + 10; // 10 to num1-10
      break;
    case 4: // 50-25 to 75-35
      num1 = Math.floor(Math.random() * 26) + 50; // 50-75
      num2 = Math.floor(Math.random() * (num1 - 20)) + 20; // 20 to num1-20
      break;
    case 5: // 75-50 to 100-25
      num1 = Math.floor(Math.random() * 26) + 75; // 75-100
      num2 = Math.floor(Math.random() * (num1 - 25)) + 25; // 25 to num1-25
      break;
    default:
      num1 = Math.floor(Math.random() * 6) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
  }
  
  return { num1, num2, answer: num1 - num2, operation: '-' };
}

function chooseMathProblemType() {
  // Choose between addition and subtraction based on current levels
  const addLevel = state.additionLevel;
  const subLevel = state.subtractionLevel;
  
  // Favor the operation they need more practice with
  if (addLevel > subLevel + 1) return 'subtraction';
  if (subLevel > addLevel + 1) return 'addition';
  
  // Otherwise random choice
  return Math.random() < 0.5 ? 'addition' : 'subtraction';
}
function numToWords(n) {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
  if (n < 20) return ones[n];
  if (n < 100) {
    const t = Math.floor(n / 10), o = n % 10;
    return tens[t] + (o ? "-" + ones[o] : "");
  }
  if (n === 100) return 'one hundred';
  if (n < 200) {
    const r = n - 100;
    return 'one hundred' + (r ? ' ' + numToWords(r) : '');
  }
  if (n === 200) return 'two hundred';
  return String(n);
}

function speak(text) {
  if (!state.sound) return;
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    const v = speechSynthesis.getVoices().find(v => /female|zira|susan|kathy/i.test((v.name || '') + (v.lang || '') + (v.voiceURI || '')));
    if (v) u.voice = v;
    u.rate = 0.8;
    u.pitch = 1.1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}

function playSound(type) {
  if (!state.sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    if (type === 'correct') {
      o.frequency.value = 880;
      o.type = 'sine';
      g.gain.value = 0.07;
    } else if (type === 'wrong') {
      o.frequency.value = 220;
      o.type = 'sawtooth';
      g.gain.value = 0.07;
    } else if (type === 'achievement') {
      // Play a sequence of notes for achievements
      const notes = [523, 659, 784, 1047]; // C, E, G, C
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const o2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          o2.connect(g2);
          g2.connect(ctx.destination);
          o2.frequency.value = freq;
          o2.type = 'sine';
          g2.gain.value = 0.05;
          o2.start();
          o2.stop(ctx.currentTime + 0.2);
        }, i * 150);
      });
      return;
    }
    o.start();
    o.stop(ctx.currentTime + 0.14);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

function getRarity(index) {
  if (LEGENDARIES.has(index)) return 'legendary';
  if (RARES.has(index) || index > 120) return 'rare';
  return 'common';
}

function getCatchChance(index) {
  const r = getRarity(index);
  if (r === 'legendary') return 0.12;
  if (r === 'rare') return 0.35;
  return 0.75;
}

function unlockAchievement(key) {
  if (!state.achievementsUnlocked[key]) {
    state.achievementsUnlocked[key] = true;
    save();
    playSound('achievement');
    showTempMessage(`🏆 Achievement unlocked: ${achievements[key].name}`, 3000, 'success');
    renderAchievements();
  }
}

function showTempMessage(msg, ms = 1200, type = 'default') {
  const fb = document.getElementById('feedback');
  fb.textContent = msg;
  fb.className = `small center feedback-${type}`;
  setTimeout(() => {
    if (fb.textContent === msg) {
      fb.textContent = '';
      fb.className = 'small center';
    }
  }, ms);
}

// ========== UI REFS ==========
const qEl = document.getElementById('question');
const optEl = document.getElementById('options');
const inputRow = document.getElementById('inputRow');
const answerInput = document.getElementById('answerInput');
const encounterArea = document.getElementById('encounterArea');
const collectionBar = document.getElementById('collectionBar');
const difficultyLabel = document.getElementById('difficultyLabel');
const streakLabel = document.getElementById('streakLabel');
const totalLabel = document.getElementById('totalLabel');
const continueBtn = document.getElementById('continueBtn');
const eggsBar = document.getElementById('eggsBar');
const soundToggle = document.getElementById('soundToggle');
const hintsToggle = document.getElementById('hintsToggle');
const hintBtn = document.getElementById('hintBtn');

let gameTimerInterval = null;
let retryState = null;
let lastQuestionStart = 0;
let currentAnswer = null;
let selectedLetters = [];
let currentQuestionType = null;

// ========== GAME FLOW ==========
function updateStats() {
  const modeNames = {
    'numbers': 'Numbers Only',
    'reading': 'Reading Only',
    'math': 'Math Only',
    'mixed': 'Mixed Learning'
  };
  difficultyLabel.textContent = modeNames[state.gameMode] || 'Mixed Learning';
  streakLabel.textContent = state.streak;
  totalLabel.textContent = state.correctTotal + state.readingTotal + state.mathTotal;
}

function startGame() {
  state.streak = 0;
  save();
  updateCollectionBar();
  renderEggs();
  renderAchievements();
  updateStats();
  
  if (!gameTimerInterval) {
    gameTimerInterval = setInterval(checkEggs, 1000);
  }
  nextQuestion();
  showScreen('game');
}

function quitToMenu() {
  // Don't allow quitting during a question - they must answer it
  if (state.lastQuestion !== null || retryState !== null) {
    showTempMessage('Please finish this question first!', 2000, 'hint');
    return;
  }
  save();
  showScreen('menu');
}

function pickWeightedCreature() {
  const pool = [];
  creatures.forEach(c => {
    const r = getRarity(c.index);
    let w = (r === 'common' ? 10 : (r === 'rare' ? 4 : 1));
    if (state.correctTotal + state.readingTotal > 50 && r === 'rare') w += 3;
    if (state.correctTotal + state.readingTotal > 120 && r === 'legendary') w += 2;
    for (let i = 0; i < w; i++) pool.push(c);
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

function chooseNumber() {
  const pool = [];
  for (let n of numbers) {
    const mastered = state.mastered.includes(n);
    const mistakes = state.mistakes[n] || 0;
    const m = mastered ? 1 : 3;
    const weight = Math.max(1, m + mistakes);
    for (let i = 0; i < weight; i++) pool.push(n);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function chooseReadingWord() {
  const allWords = [...readingWords.simple, ...readingWords.medium, ...readingWords.hard, ...sightWords];
  const pool = [];
  
  for (let word of allWords) {
    const mastered = state.readingMastered.includes(word);
    const mistakes = state.readingMistakes[word] || 0;
    const m = mastered ? 1 : 3;
    const weight = Math.max(1, m + mistakes);
    for (let i = 0; i < weight; i++) pool.push(word);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function nextQuestion() {
  updateStats();
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'small center';
  encounterArea.innerHTML = '';
  continueBtn.style.display = 'none';
  inputRow.style.display = 'none';
  hintBtn.style.display = 'none';
  optEl.innerHTML = '';
  answerInput.value = '';
  answerInput.placeholder = 'Type your answer';
  retryState = null;
  lastQuestionStart = Date.now();
  currentQuestionType = null;
  
  // Determine question type based on game mode
  let questionTypes = [];
  
  if (state.gameMode === 'numbers') {
    questionTypes = ['spellTiles', 'countForward', 'countBackward', 'skipCount', 
                     'placeValue', 'placeValueReverse', 'placeValueDifferent',
                     'nearestTen', 'compare', 'orderNumbers', 'findPattern'];
  } else if (state.gameMode === 'reading') {
    questionTypes = ['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'];
  } else if (state.gameMode === 'math') {
    questionTypes = ['addition', 'subtraction', 'mathWordProblem', 'mathComparison'];
  } else if (state.gameMode === 'time') {
    questionTypes = ['timeTelling', 'dailyActivity', 'timeSequence'];
  } else if (state.gameMode === 'science') {
    questionTypes = ['animalIdentification', 'animalHabitat', 'weatherPattern'];
  } else { // mixed mode
    const numTypes = ['spellTiles', 'countForward', 'countBackward', 'skipCount', 
                      'placeValue', 'nearestTen', 'compare'];
    const readTypes = ['readWord', 'sightWord', 'rhyming', 'phonics'];
    const mathTypes = ['addition', 'subtraction'];
    const timeTypes = ['timeTelling', 'dailyActivity'];
    const scienceTypes = ['animalIdentification', 'weatherPattern'];
    questionTypes = [...numTypes, ...readTypes, ...mathTypes, ...timeTypes, ...scienceTypes];
  }
  
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  currentQuestionType = type;
  
  // Set state.lastQuestion for all question types
  if (['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'].includes(type)) {
    state.lastQuestion = chooseReadingWord();
  } else if (['addition', 'subtraction', 'mathWordProblem', 'mathComparison'].includes(type)) {
    state.lastQuestion = type; // Store the type, actual problem generated in show function
  } else if (['timeTelling', 'dailyActivity', 'timeSequence'].includes(type)) {
    state.lastQuestion = type; // Time problems generate their own content
  } else if (['animalIdentification', 'animalHabitat', 'weatherPattern'].includes(type)) {
    state.lastQuestion = type; // Science problems generate their own content
  } else {
    state.lastQuestion = chooseNumber();
  }

  // Show the appropriate question
  if (type === 'spellTiles') showSpellTiles(state.lastQuestion, numToWords(state.lastQuestion));
  else if (type === 'countForward') showCountForward(state.lastQuestion);
  else if (type === 'countBackward') showCountBackward(state.lastQuestion);
  else if (type === 'skipCount') showSkipCount();
  else if (type === 'placeValue') showPlaceValue(state.lastQuestion);
  else if (type === 'placeValueReverse') showPlaceValueReverse(state.lastQuestion);
  else if (type === 'placeValueDifferent') showPlaceValueDifferent(state.lastQuestion);
  else if (type === 'nearestTen') showNearestTen(state.lastQuestion);
  else if (type === 'compare') showCompare();
  else if (type === 'orderNumbers') showOrderNumbers();
  else if (type === 'findPattern') showFindPattern();
  else if (type === 'readWord') showReadWord(state.lastQuestion);
  else if (type === 'sightWord') showSightWord(state.lastQuestion);
  else if (type === 'rhyming') showRhyming();
  else if (type === 'phonics') showPhonics(state.lastQuestion);
  else if (type === 'syllables') showSyllables(state.lastQuestion);
  else if (type === 'letterSounds') showLetterSounds();
  else if (type === 'addition') showAddition();
  else if (type === 'subtraction') showSubtraction();
  else if (type === 'mathWordProblem') showMathWordProblem();
  else if (type === 'mathComparison') showMathComparison();
  else if (type === 'timeTelling') showTimeTelling();
  else if (type === 'dailyActivity') showDailyActivity();
  else if (type === 'timeSequence') showTimeSequence();
  else if (type === 'animalIdentification') showAnimalIdentification();
  else if (type === 'animalHabitat') showAnimalHabitat();
  else if (type === 'weatherPattern') showWeatherPattern();
}

// ========== READING QUESTION TYPES ==========
function showReadWord(word) {
  currentAnswer = word;
  qEl.textContent = `Read this word out loud, then type it:`;
  
  optEl.innerHTML = `<div class="word-display" id="wordDisplay">${word.toUpperCase()}</div>`;
  
  speak(`Read this word: ${word}`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type the word you see';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showSightWord(word) {
  if (!sightWords.includes(word)) {
    word = sightWords[Math.floor(Math.random() * sightWords.length)];
  }
  currentAnswer = word;
  
  qEl.textContent = `Listen and type this sight word:`;
  
  setTimeout(() => {
    speak(word);
  }, 500);
  
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type what you heard';
  answerInput.focus();
  
  const repeatBtn = document.createElement('button');
  repeatBtn.textContent = '🔊 Repeat';
  repeatBtn.className = 'secondary';
  repeatBtn.onclick = () => speak(word);
  optEl.appendChild(repeatBtn);
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showRhyming() {
  const baseWords = Object.keys(rhymingPairs);
  const baseWord = baseWords[Math.floor(Math.random() * baseWords.length)];
  const rhymes = rhymingPairs[baseWord];
  const correctRhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
  
  currentAnswer = correctRhyme;
  
  qEl.textContent = `Which word rhymes with "${baseWord}"?`;
  
  const wrongChoices = [];
  const allWords = [...readingWords.simple, ...readingWords.medium];
  while (wrongChoices.length < 3) {
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    if (!rhymes.includes(word) && word !== baseWord && !wrongChoices.includes(word)) {
      wrongChoices.push(word);
    }
  }
  
  const choices = [correctRhyme, ...wrongChoices];
  shuffleArray(choices);
  
  speak(`Which word rhymes with ${baseWord}?`);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
}

function showPhonics(word) {
  currentAnswer = word;
  
  // Break word into phonemes for display
  const phonemes = word.split('').join(' - ');
  
  qEl.textContent = `Sound out this word and type it:`;
  optEl.innerHTML = `<div class="phonics-display">${phonemes.toUpperCase()}</div>`;
  
  speak(`Sound out this word: ${word.split('').join(', ')}`);
  
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type the word';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showSyllables(word) {
  const syllableCount = countSyllables(word);
  currentAnswer = String(syllableCount);
  
  qEl.textContent = `How many syllables are in "${word}"?`;
  
  speak(`How many syllables are in ${word}?`);
  
  const options = [1, 2, 3, 4];
  options.forEach((count, i) => {
    const btn = document.createElement('button');
    btn.textContent = `${count} syllable${count !== 1 ? 's' : ''}`;
    btn.className = 'syllable-btn';
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(String(count));
    optEl.appendChild(btn);
  });
}

function showLetterSounds() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  currentAnswer = letter;
  
  qEl.textContent = `What letter makes this sound?`;
  
  const letterSound = getLetterSound(letter);
  setTimeout(() => {
    speak(letterSound);
  }, 500);
  
  const wrongLetters = [];
  while (wrongLetters.length < 3) {
    const wrongLetter = letters[Math.floor(Math.random() * letters.length)];
    if (wrongLetter !== letter && !wrongLetters.includes(wrongLetter)) {
      wrongLetters.push(wrongLetter);
    }
  }
  
  const choices = [letter, ...wrongLetters];
  shuffleArray(choices);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice.toUpperCase();
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
  
  const repeatBtn = document.createElement('button');
  repeatBtn.textContent = '🔊 Repeat Sound';
  repeatBtn.className = 'secondary';
  repeatBtn.onclick = () => speak(letterSound);
  optEl.appendChild(repeatBtn);
}

// ========== TIME & SCIENCE QUESTION TYPES ==========
function showTimeTelling() {
  const hour = timeSkills.hours[Math.floor(Math.random() * timeSkills.hours.length)];
  const minute = timeSkills.minutes[Math.floor(Math.random() * timeSkills.minutes.length)];
  
  currentAnswer = `${hour}:${minute.toString().padStart(2, '0')}`;
  state.lastQuestion = currentAnswer;
  
  qEl.textContent = `What time does this clock show?`;
  
  // Create analog clock display
  const clockHtml = createAnalogClock(hour, minute);
  optEl.innerHTML = `<div class="clock-display">${clockHtml}</div>`;
  
  speak(`What time does this clock show?`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type time like 3:30';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showDailyActivity() {
  const activity = timeSkills.dailyActivities[Math.floor(Math.random() * timeSkills.dailyActivities.length)];
  const wrongTimes = timeSkills.dailyActivities.filter(a => a !== activity);
  const choices = [activity, ...wrongTimes.slice(0, 3)];
  shuffleArray(choices);
  
  currentAnswer = activity.time;
  state.lastQuestion = activity.activity;
  
  qEl.textContent = `What time do most people ${activity.activity}?`;
  
  speak(`What time do most people ${activity.activity}?`);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice.time;
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice.time);
    optEl.appendChild(btn);
  });
}

function showTimeSequence() {
  const baseHour = Math.floor(Math.random() * 8) + 1; // 1-8
  const sequence = [
    `${baseHour}:00`,
    `${baseHour + 1}:00`,
    `${baseHour + 2}:00`,
    '___',
    `${baseHour + 4}:00`
  ];
  
  currentAnswer = `${baseHour + 3}:00`;
  state.lastQuestion = sequence.join(' ');
  
  qEl.textContent = `What time comes next in this pattern?`;
  optEl.innerHTML = `<div class="time-sequence">${sequence.join(' → ')}</div>`;
  
  speak(`What time comes next in this pattern?`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type time like 4:00';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showAnimalIdentification() {
  const animal = scienceContent.animals[Math.floor(Math.random() * scienceContent.animals.length)];
  const wrongAnimals = scienceContent.animals.filter(a => a !== animal);
  const choices = [animal.name, ...wrongAnimals.slice(0, 3).map(a => a.name)];
  shuffleArray(choices);
  
  currentAnswer = animal.name;
  state.lastQuestion = animal.name;
  
  qEl.textContent = `Which animal ${animal.fact}?`;
  
  speak(`Which animal ${animal.fact}?`);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
}

function showAnimalHabitat() {
  const animal = scienceContent.animals[Math.floor(Math.random() * scienceContent.animals.length)];
  const habitats = ['ocean', 'forest', 'savanna', 'pond', 'hive', 'desert', 'mountains'];
  const wrongHabitats = habitats.filter(h => h !== animal.habitat);
  const choices = [animal.habitat, ...wrongHabitats.slice(0, 3)];
  shuffleArray(choices);
  
  currentAnswer = animal.habitat;
  state.lastQuestion = animal.name;
  
  qEl.textContent = `Where does a ${animal.name} live?`;
  
  speak(`Where does a ${animal.name} live?`);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
}

function showWeatherPattern() {
  const seasons = {
    'spring': ['rainy', 'mild', 'flowers bloom'],
    'summer': ['sunny', 'hot', 'long days'],
    'fall': ['leaves change', 'cooler', 'harvest time'],
    'winter': ['cold', 'snowy', 'short days']
  };
  
  const season = Object.keys(seasons)[Math.floor(Math.random() * 4)];
  const correctWeather = seasons[season][Math.floor(Math.random() * seasons[season].length)];
  const wrongWeathers = [];
  
  Object.values(seasons).forEach(weatherList => {
    weatherList.forEach(weather => {
      if (weather !== correctWeather && !wrongWeathers.includes(weather)) {
        wrongWeathers.push(weather);
      }
    });
  });
  
  const choices = [correctWeather, ...wrongWeathers.slice(0, 3)];
  shuffleArray(choices);
  
  currentAnswer = correctWeather;
  state.lastQuestion = season;
  
  qEl.textContent = `What is the weather usually like in ${season}?`;
  
  speak(`What is the weather usually like in ${season}?`);
  
  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
}

function createAnalogClock(hour, minute) {
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30; // 30 degrees per hour
  const minuteAngle = minute * 6; // 6 degrees per minute
  
  return `
    <div class="analog-clock">
      <div class="clock-face">
        <div class="hour-hand" style="transform: rotate(${hourAngle}deg)"></div>
        <div class="minute-hand" style="transform: rotate(${minuteAngle}deg)"></div>
        <div class="clock-center"></div>
        <div class="hour-marker" style="transform: rotate(0deg)"><span>12</span></div>
        <div class="hour-marker" style="transform: rotate(90deg)"><span>3</span></div>
        <div class="hour-marker" style="transform: rotate(180deg)"><span>6</span></div>
        <div class="hour-marker" style="transform: rotate(270deg)"><span>9</span></div>
      </div>
    </div>
  `;
}
function showAddition() {
  const level = getMathDifficultyLevel('addition');
  const problem = generateAdditionProblem(level);
  
  currentAnswer = String(problem.answer);
  state.lastQuestion = `${problem.num1}+${problem.num2}`;
  
  qEl.textContent = `What is ${problem.num1} + ${problem.num2}?`;
  
  // Create a visual math display
  optEl.innerHTML = `<div class="math-display">${problem.num1} + ${problem.num2} = ?</div>`;
  
  speak(`What is ${problem.num1} plus ${problem.num2}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showSubtraction() {
  const level = getMathDifficultyLevel('subtraction');
  const problem = generateSubtractionProblem(level);
  
  currentAnswer = String(problem.answer);
  state.lastQuestion = `${problem.num1}-${problem.num2}`;
  
  qEl.textContent = `What is ${problem.num1} - ${problem.num2}?`;
  
  // Create a visual math display
  optEl.innerHTML = `<div class="math-display">${problem.num1} - ${problem.num2} = ?</div>`;
  
  speak(`What is ${problem.num1} minus ${problem.num2}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showMathWordProblem() {
  const type = chooseMathProblemType();
  const level = getMathDifficultyLevel(type);
  const problem = type === 'addition' ? generateAdditionProblem(level) : generateSubtractionProblem(level);
  
  currentAnswer = String(problem.answer);
  state.lastQuestion = `${problem.num1}${problem.operation}${problem.num2}`;
  
  let wordProblem;
  if (type === 'addition') {
    const scenarios = [
      `Sarah has ${problem.num1} apples and gets ${problem.num2} more. How many apples does she have now?`,
      `There are ${problem.num1} birds in a tree. ${problem.num2} more birds join them. How many birds are there total?`,
      `Tom collected ${problem.num1} coins and found ${problem.num2} more. How many coins does he have altogether?`,
      `In the morning, ${problem.num1} students were in class. After lunch, ${problem.num2} more joined. How many students are in class now?`
    ];
    wordProblem = scenarios[Math.floor(Math.random() * scenarios.length)];
  } else {
    const scenarios = [
      `Maria had ${problem.num1} stickers but gave away ${problem.num2}. How many stickers does she have left?`,
      `There were ${problem.num1} cookies in a jar. The family ate ${problem.num2} of them. How many cookies are left?`,
      `Jake had ${problem.num1} toy cars and lost ${problem.num2} of them. How many toy cars does he have now?`,
      `A school had ${problem.num1} books. They donated ${problem.num2} books to another school. How many books do they have left?`
    ];
    wordProblem = scenarios[Math.floor(Math.random() * scenarios.length)];
  }
  
  qEl.textContent = wordProblem;
  optEl.innerHTML = `<div class="word-problem-display">${wordProblem}</div>`;
  
  speak(wordProblem);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showMathComparison() {
  const type = chooseMathProblemType();
  const level = getMathDifficultyLevel(type);
  
  const problem1 = type === 'addition' ? generateAdditionProblem(level) : generateSubtractionProblem(level);
  const problem2 = type === 'addition' ? generateAdditionProblem(level) : generateSubtractionProblem(level);
  
  const result1 = problem1.answer;
  const result2 = problem2.answer;
  
  currentAnswer = result1 > result2 ? '>' : (result1 < result2 ? '<' : '=');
  state.lastQuestion = `${problem1.num1}${problem1.operation}${problem1.num2} vs ${problem2.num1}${problem2.operation}${problem2.num2}`;
  
  qEl.textContent = `Which is greater?`;
  optEl.innerHTML = `
    <div class="math-comparison">
      <div class="math-side">
        <div class="math-expression">${problem1.num1} ${problem1.operation} ${problem1.num2}</div>
        <div class="math-result">${result1}</div>
      </div>
      <div class="comparison-operator">___</div>
      <div class="math-side">
        <div class="math-expression">${problem2.num1} ${problem2.operation} ${problem2.num2}</div>
        <div class="math-result">${result2}</div>
      </div>
    </div>
  `;
  
  speak(`Compare ${result1} and ${result2}`);
  
  const symbols = ['>', '<', '='];
  symbols.forEach((sym, i) => {
    const btn = document.createElement('button');
    btn.textContent = sym;
    btn.className = 'symbol-btn';
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(sym);
    optEl.appendChild(btn);
  });
}
function countSyllables(word) {
  const vowels = 'aeiouy';
  let count = 0;
  let prevIsVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i].toLowerCase());
    if (isVowel && !prevIsVowel) count++;
    prevIsVowel = isVowel;
  }
  
  if (word.endsWith('e')) count--;
  return Math.max(1, count);
}

function getLetterSound(letter) {
  const sounds = {
    'a': 'ah', 'b': 'buh', 'c': 'kuh', 'd': 'duh', 'e': 'eh',
    'f': 'fuh', 'g': 'guh', 'h': 'huh', 'i': 'ih', 'j': 'juh',
    'k': 'kuh', 'l': 'luh', 'm': 'muh', 'n': 'nuh', 'o': 'oh',
    'p': 'puh', 'q': 'kwuh', 'r': 'ruh', 's': 'sss', 't': 'tuh',
    'u': 'uh', 'v': 'vuh', 'w': 'wuh', 'x': 'ksss', 'y': 'yuh', 'z': 'zzz'
  };
  return sounds[letter] || letter;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ========== NUMBER QUESTION RENDERERS ==========
function showSpellTiles(n, word) {
  currentAnswer = word;
  selectedLetters = [];
  qEl.textContent = `Spell the number: ${n}`;
  
  // Get all letters from the word, including spaces and hyphens for proper spelling
  const letters = word.split('').filter(c => c !== ' ' && c !== '-');
  const shuffled = [...letters].sort(() => Math.random() - 0.5);
  
  // Clear the options area and create the tile interface
  optEl.innerHTML = '';
  
  // Create display area
  const tileDisplay = document.createElement('div');
  tileDisplay.className = 'tile-display';
  tileDisplay.id = 'tileDisplay';
  tileDisplay.textContent = 'Click letters to spell the word';
  optEl.appendChild(tileDisplay);
  
  // Create tile bank
  const tileBank = document.createElement('div');
  tileBank.className = 'tile-bank';
  tileBank.id = 'tileBank';
  
  // Add letter tiles
  shuffled.forEach((letter, i) => {
    const tile = document.createElement('button');
    tile.textContent = letter.toUpperCase(); // Make sure letters are visible
    tile.className = 'letter-tile';
    tile.style.setProperty('--i', i);
    tile.onclick = () => selectLetter(letter, tile);
    tileBank.appendChild(tile);
  });
  
  // Add control buttons
  const clearBtn = document.createElement('button');
  clearBtn.textContent = '↺ Clear';
  clearBtn.className = 'secondary';
  clearBtn.onclick = clearLetters;
  tileBank.appendChild(clearBtn);
  
  const submitBtn = document.createElement('button');
  submitBtn.textContent = '✓ Check';
  submitBtn.onclick = checkSpelling;
  tileBank.appendChild(submitBtn);
  
  optEl.appendChild(tileBank);
  
  speak(`Spell the number ${n}`);
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function selectLetter(letter, tile) {
  selectedLetters.push(letter);
  tile.disabled = true;
  tile.style.opacity = '0.3';
  updateTileDisplay();
}

function clearLetters() {
  selectedLetters = [];
  document.querySelectorAll('.letter-tile').forEach(tile => {
    tile.disabled = false;
    tile.style.opacity = '1';
  });
  updateTileDisplay();
}

function updateTileDisplay() {
  const display = document.getElementById('tileDisplay');
  if (!display) return;
  
  if (selectedLetters.length > 0) {
    display.textContent = selectedLetters.join('');
    display.classList.add('has-content');
  } else {
    display.textContent = 'Click letters to spell the word';
    display.classList.remove('has-content');
  }
}

function checkSpelling() {
  const answer = selectedLetters.join('');
  const correct = currentAnswer.replace(/[\s-]/g, '');
  if (answer === correct) return handleCorrect();
  else return handleWrong(currentAnswer);
}

function showCountForward(n) {
  if (n >= 199) n = Math.floor(Math.random() * 180) + 1;
  currentAnswer = String(n + 1);
  qEl.textContent = `What number comes after ${n}?`;
  speak(`What number comes after ${n}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showCountBackward(n) {
  if (n <= 2) n = Math.floor(Math.random() * 180) + 20;
  currentAnswer = String(n - 1);
  qEl.textContent = `What number comes before ${n}?`;
  speak(`What number comes before ${n}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showSkipCount() {
  const skip = [2, 5, 10, 20, 50][Math.floor(Math.random() * 5)];
  const start = Math.floor(Math.random() * (150 / skip)) * skip;
  const sequence = [];
  for (let i = 0; i < 5; i++) sequence.push(start + i * skip);
  const blankIndex = 2 + Math.floor(Math.random() * 2);
  currentAnswer = String(sequence[blankIndex]);
  sequence[blankIndex] = '___';
  
  qEl.textContent = `Skip count by ${skip}s. What is the missing number?`;
  optEl.innerHTML = `<div class="number-line">${sequence.join(' → ')}</div>`;
  speak(`Skip count by ${skip}s`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showPlaceValue(n) {
  currentAnswer = String(n);
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  
  qEl.textContent = `What number is this?`;
  optEl.innerHTML = `<div class="place-value-display">${h} hundred${h !== 1 ? 's' : ''}, ${t} ten${t !== 1 ? 's' : ''}, ${o} one${o !== 1 ? 's' : ''}</div>`;
  speak(`${h} hundreds, ${t} tens, ${o} ones`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showPlaceValueReverse(n) {
  currentAnswer = `${Math.floor(n / 100)} ${Math.floor((n % 100) / 10)} ${n % 10}`;
  qEl.textContent = `Write ${n} using place value:`;
  optEl.innerHTML = `
    <div class="place-value-inputs">
      <div class="pv-group">
        <label>Hundreds</label>
        <input type="text" id="pvHundreds" maxlength="1" />
      </div>
      <div class="pv-group">
        <label>Tens</label>
        <input type="text" id="pvTens" maxlength="1" />
      </div>
      <div class="pv-group">
        <label>Ones</label>
        <input type="text" id="pvOnes" maxlength="1" />
      </div>
    </div>
  `;
  speak(`Write ${n} using place value`);
  
  // Auto-focus and auto-advance between inputs
  const h = document.getElementById('pvHundreds');
  const t = document.getElementById('pvTens');
  const o = document.getElementById('pvOnes');
  h.focus();
  h.oninput = () => { if (h.value) t.focus(); };
  t.oninput = () => { if (t.value) o.focus(); };
  o.onkeydown = (e) => { if (e.key === 'Enter') submitPlaceValue(); };
  
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.onclick = submitPlaceValue;
  submitBtn.style.marginTop = '15px';
  optEl.appendChild(submitBtn);
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function submitPlaceValue() {
  const h = document.getElementById('pvHundreds').value.trim();
  const t = document.getElementById('pvTens').value.trim();
  const o = document.getElementById('pvOnes').value.trim();
  const answer = `${h} ${t} ${o}`;
  
  if (answer === currentAnswer) return handleCorrect();
  else return handleWrong(currentAnswer);
}

function showPlaceValueDifferent(n) {
  if (n < 20) n = 20 + Math.floor(Math.random() * 180);
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  
  const altT = h * 10 + t;
  currentAnswer = `${altT} ${o}`;
  
  qEl.textContent = `${n} = ${h} hundred, ${t} tens, ${o} ones. Write it using only tens and ones:`;
  optEl.innerHTML = `
    <div class="place-value-inputs">
      <div class="pv-group">
        <label>Tens</label>
        <input type="text" id="pvTens2" maxlength="2" />
      </div>
      <div class="pv-group">
        <label>Ones</label>
        <input type="text" id="pvOnes2" maxlength="1" />
      </div>
    </div>
  `;
  speak(`Write ${n} using tens and ones`);
  
  const t2 = document.getElementById('pvTens2');
  const o2 = document.getElementById('pvOnes2');
  t2.focus();
  t2.oninput = () => { if (t2.value.length >= 2) o2.focus(); };
  o2.onkeydown = (e) => { if (e.key === 'Enter') submitPlaceValueDiff(); };
  
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.onclick = submitPlaceValueDiff;
  submitBtn.style.marginTop = '15px';
  optEl.appendChild(submitBtn);
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function submitPlaceValueDiff() {
  const t = document.getElementById('pvTens2').value.trim();
  const o = document.getElementById('pvOnes2').value.trim();
  const answer = `${t} ${o}`;
  
  if (answer === currentAnswer) return handleCorrect();
  else return handleWrong(currentAnswer);
}

function showNearestTen(n) {
  const mod = n % 10;
  if (mod === 0) n = n + Math.floor(Math.random() * 9) + 1;
  currentAnswer = String(mod < 5 ? n - mod : n + (10 - mod));
  
  qEl.textContent = `What is the nearest ten to ${n}?`;
  speak(`What is the nearest ten to ${n}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showCompare() {
  const n1 = Math.floor(Math.random() * 200) + 1;
  let n2 = Math.floor(Math.random() * 200) + 1;
  while (n2 === n1) n2 = Math.floor(Math.random() * 200) + 1;
  
  currentAnswer = n1 > n2 ? '>' : '<';
  
  qEl.textContent = `Which symbol goes between these numbers?`;
  optEl.innerHTML = `<div class="compare-display">${n1} ___ ${n2}</div>`;
  speak(`Compare ${n1} and ${n2}`);
  
  const symbols = ['>', '<'];
  symbols.forEach((sym, i) => {
    const btn = document.createElement('button');
    btn.textContent = sym;
    btn.className = 'symbol-btn';
    btn.style.setProperty('--i', i);
    btn.onclick = () => submitChoice(sym);
    optEl.appendChild(btn);
  });
}

function showOrderNumbers() {
  const nums = [];
  while (nums.length < 4) {
    const n = Math.floor(Math.random() * 200) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  
  const order = Math.random() > 0.5 ? 'least to greatest' : 'greatest to least';
  const sorted = order === 'least to greatest' ? [...nums].sort((a, b) => a - b) : [...nums].sort((a, b) => b - a);
  currentAnswer = sorted.join(' ');
  
  qEl.textContent = `Put these numbers in order from ${order}:`;
  optEl.innerHTML = `<div class="numbers-to-order">${nums.join(', ')}</div><div class="small-muted">Type the numbers in order, separated by spaces</div>`;
  speak(`Put these numbers in order from ${order}`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'e.g. 5 10 15 20';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

function showFindPattern() {
  const isIncreasing = Math.random() > 0.5;
  const step = [1, 2, 3, 5, 10][Math.floor(Math.random() * 5)];
  const start = Math.floor(Math.random() * 150) + 1;
  
  const sequence = [];
  for (let i = 0; i < 6; i++) {
    sequence.push(isIncreasing ? start + i * step : start - i * step);
  }
  
  const blankIndex = 2 + Math.floor(Math.random() * 3);
  currentAnswer = String(sequence[blankIndex]);
  const pattern = isIncreasing ? 'increasing' : 'decreasing';
  sequence[blankIndex] = '___';
  
  qEl.textContent = `Find the missing number in this ${pattern} pattern:`;
  optEl.innerHTML = `<div class="number-line">${sequence.join(', ')}</div>`;
  speak(`Find the missing number`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  
  if (state.hints) {
    hintBtn.style.display = 'inline-block';
  }
}

// ========== HINT SYSTEM ==========
function showHint() {
  if (!state.hints) return;
  
  let hint = '';
  
  if (currentQuestionType === 'spellTiles') {
    hint = `The word starts with "${currentAnswer[0]}" and has ${currentAnswer.replace(/[\s-]/g, '').length} letters.`;
  } else if (currentQuestionType === 'countForward') {
    hint = `When counting up, the next number after ${state.lastQuestion} is ${state.lastQuestion + 1}.`;
  } else if (currentQuestionType === 'countBackward') {
    hint = `When counting down, the number before ${state.lastQuestion} is ${state.lastQuestion - 1}.`;
  } else if (currentQuestionType === 'readWord') {
    hint = `Try sounding out each letter: ${state.lastQuestion.split('').join('-')}`;
  } else if (currentQuestionType === 'sightWord') {
    hint = `This is a common word that starts with "${currentAnswer[0]}".`;
  } else if (currentQuestionType === 'phonics') {
    hint = `Listen carefully to each sound and put them together.`;
  } else if (currentQuestionType === 'addition') {
    const parts = state.lastQuestion.split('+');
    const num1 = parseInt(parts[0]);
    const num2 = parseInt(parts[1]);
    hint = `Try counting up from ${num1}. Add ${num2} more: ${num1} + 1 = ${num1 + 1}, then keep going!`;
  } else if (currentQuestionType === 'subtraction') {
    const parts = state.lastQuestion.split('-');
    const num1 = parseInt(parts[0]);
    const num2 = parseInt(parts[1]);
    hint = `Start with ${num1} and count backwards ${num2} times. Or think: what plus ${num2} equals ${num1}?`;
  } else if (currentQuestionType === 'mathWordProblem') {
    if (state.lastQuestion.includes('+')) {
      hint = `This is an addition problem. Look for words like "more", "total", "altogether", or "join".`;
    } else {
      hint = `This is a subtraction problem. Look for words like "left", "gave away", "lost", or "ate".`;
    }
  } else if (currentQuestionType === 'nearestTen') {
    const n = state.lastQuestion;
    const mod = n % 10;
    if (mod < 5) {
      hint = `${n} is closer to ${n - mod} because ${mod} is less than 5.`;
    } else {
      hint = `${n} is closer to ${n + (10 - mod)} because ${mod} is 5 or more.`;
    }
  } else {
    hint = `Think about what you know about this type of problem.`;
  }
  
  showTempMessage(`💡 Hint: ${hint}`, 4000, 'hint');
}

// ========== SUBMISSION & RETRY LOGIC ==========
function submitChoice(selected) {
  if (String(selected) === String(currentAnswer)) return handleCorrect();
  else return handleWrong(String(currentAnswer));
}

function submitAnswer() {
  const valRaw = answerInput.value.trim();
  if (!valRaw) {
    showTempMessage('Please type an answer!', 1000, 'hint');
    return;
  }
  
  const val = valRaw.toLowerCase().replace(/\s+/g, ' ');
  const correct = String(currentAnswer).toLowerCase().replace(/\s+/g, ' ');
  
  if (retryState === 'force') {
    if (val === correct) return handleCorrect();
    else {
      showTempMessage(`Please type the correct answer: ${currentAnswer}`, 1500, 'hint');
      return;
    }
  }
  
  if (val === correct) return handleCorrect();
  else return handleWrong(String(currentAnswer));
}

function handleCorrect() {
  const timeTaken = Date.now() - lastQuestionStart;
  if (timeTaken < 2000) unlockAchievement('speed_typist');
  
  state.streak++;
  state.dailyProgress++;
  
  // Determine the question category
  const isReadingQuestion = ['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'].includes(currentQuestionType);
  const isMathQuestion = ['addition', 'subtraction', 'mathWordProblem', 'mathComparison'].includes(currentQuestionType);
  const isTimeQuestion = ['timeTelling', 'dailyActivity', 'timeSequence'].includes(currentQuestionType);
  const isScienceQuestion = ['animalIdentification', 'animalHabitat', 'weatherPattern'].includes(currentQuestionType);
  
  if (isReadingQuestion) {
    state.readingTotal++;
    if (!state.readingMastered.includes(state.lastQuestion)) {
      state.readingMastered.push(state.lastQuestion);
    }
    if (currentQuestionType === 'phonics') {
      state.phonicsCompleted++;
      if (state.phonicsCompleted >= 25) unlockAchievement('phonics_pro');
    }
    if (state.readingTotal >= 50) unlockAchievement('reading_master');
  } else if (isMathQuestion) {
    state.mathTotal++;
    
    // Adjust difficulty based on performance
    if (['addition', 'subtraction'].includes(currentQuestionType)) {
      adjustMathDifficulty(currentQuestionType, true);
    }
    
    // Track math achievements
    if (state.mathTotal === 10) unlockAchievement('math_rookie');
    if (state.mathTotal >= 100) unlockAchievement('math_master');
    if (state.mathStreak >= 10) unlockAchievement('quick_calculator');
    if (state.mathSessionCorrect >= 20 && state.mathSessionTotal === state.mathSessionCorrect) {
      unlockAchievement('perfect_session');
    }
    
    // Add to math mastered list
    if (!state.mathMastered.includes(state.lastQuestion)) {
      state.mathMastered.push(state.lastQuestion);
    }
  } else if (isTimeQuestion) {
    state.timeTotal++;
    if (!state.timeMastered.includes(state.lastQuestion)) {
      state.timeMastered.push(state.lastQuestion);
    }
    if (state.timeTotal >= 20) unlockAchievement('time_master');
    if (state.timeMastered.length >= 10) unlockAchievement('daily_scheduler');
  } else if (isScienceQuestion) {
    state.scienceTotal++;
    state.scienceStreak++;
    if (!state.scienceMastered.includes(state.lastQuestion)) {
      state.scienceMastered.push(state.lastQuestion);
    }
    if (state.scienceTotal >= 15) unlockAchievement('nature_explorer');
    if (state.scienceTotal >= 25) unlockAchievement('science_student');
    if (currentQuestionType === 'weatherPattern' && state.scienceMastered.filter(q => q.includes('weather')).length >= 5) {
      unlockAchievement('weather_watcher');
    }
  } else {
    state.correctTotal++;
    if (!state.mastered.includes(state.lastQuestion)) {
      state.mastered.push(state.lastQuestion);
    }
  }
  
  playSound('correct');
  
  if (state.streak >= 20) {
    unlockAchievement('streak_master');
    state.streak = 0;
  }
  
  // Check daily goal
  if (state.dailyProgress >= state.dailyGoal) {
    showTempMessage(`🎯 Daily goal achieved! Great job!`, 3000, 'success');
  }
  
  state.lastQuestion = null; // Clear question after correct answer
  retryState = null;
  save();
  
  const encouragements = [
    'Excellent!', 'Great job!', 'Perfect!', 'Amazing!', 'Well done!', 
    'Fantastic!', 'You got it!', 'Super!', 'Brilliant!', 'Outstanding!'
  ];
  const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
  showTempMessage(msg, 800, 'success');
  
  if (state.streak >= 10) {
    triggerEvolution();
    state.streak = 0;
  }
  
  // Team Rocket battle every 15 correct answers (combined)
  const totalAnswers = state.correctTotal + state.readingTotal + state.mathTotal + state.timeTotal + state.scienceTotal;
  if (totalAnswers > 0 && totalAnswers % 15 === 0) {
    triggerRocketBattle();
    return;
  }
  
  if (Math.random() < 0.12) giveEgg();
  
  maybeEncounter();
  
  if (!encounterArea.hasChildNodes()) {
    setTimeout(() => nextQuestion(), 700);
  }
}

function handleWrong(correct) {
  state.streak = 0;
  playSound('wrong');
  
  // Track mistakes for number, reading, and math questions
  const isReadingQuestion = ['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'].includes(currentQuestionType);
  const isMathQuestion = ['addition', 'subtraction', 'mathWordProblem', 'mathComparison'].includes(currentQuestionType);
  
  if (isReadingQuestion) {
    state.readingMistakes[state.lastQuestion] = (state.readingMistakes[state.lastQuestion] || 0) + 1;
  } else if (isMathQuestion) {
    state.mathMistakes[state.lastQuestion] = (state.mathMistakes[state.lastQuestion] || 0) + 1;
    
    // Adjust difficulty based on wrong answer
    if (['addition', 'subtraction'].includes(currentQuestionType)) {
      adjustMathDifficulty(currentQuestionType, false);
    }
    
    state.mathSessionTotal++;
  } else {
    state.mistakes[state.lastQuestion] = (state.mistakes[state.lastQuestion] || 0) + 1;
  }
  
  save();
  
  if (!retryState) {
    retryState = { hinted: true };
    showTempMessage(`Hint: The answer starts with "${String(correct)[0]}" — try again!`, 3000, 'hint');
    inputRow.style.display = 'flex';
    answerInput.focus();
  } else if (retryState && retryState.hinted) {
    retryState = 'force';
    showTempMessage(`Type the correct answer to continue: ${correct}`, 5000, 'error');
    inputRow.style.display = 'flex';
    answerInput.focus();
  } else {
    retryState = 'force';
    showTempMessage(`Type the correct answer to continue: ${correct}`, 5000, 'error');
    inputRow.style.display = 'flex';
    answerInput.focus();
  }
}

// ========== ENCOUNTERS & CATCHING ==========
function maybeEncounter() {
  const chance = 0.35;
  if (Math.random() > chance) return;
  
  if (state.stolen.length > 0 && Math.random() < 0.4) {
    const stolenId = state.stolen[Math.floor(Math.random() * state.stolen.length)];
    const crit = creatures.find(c => c.id === stolenId);
    if (crit) return spawnEncounter(crit, true);
  }
  
  const crit = pickWeightedCreature();
  if (getRarity(crit.index) === 'legendary') {
    if (!state.milestones.includes('legendary-' + crit.index) && Math.random() > 0.15) return;
  }
  spawnEncounter(crit, false);
}

function spawnEncounter(crit, isStolen = false) {
  encounterArea.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'creature-popup';
  wrap.innerHTML = `<div class="center"><img src="${crit.img}" class="creature-img" alt="${crit.name}"></div>
    <div class="small center">${isStolen ? 'A stolen' : 'A wild'} <strong>${crit.name}</strong> appeared!</div>
    <div class="small-muted center">Rarity: ${getRarity(crit.index)}</div>`;
  
  const btnCatch = document.createElement('button');
  btnCatch.textContent = '⚡ Catch!';
  btnCatch.className = 'secondary';
  
  const btnRun = document.createElement('button');
  btnRun.textContent = '🏃 Let it go';
  
  wrap.appendChild(btnCatch);
  wrap.appendChild(btnRun);
  encounterArea.appendChild(wrap);

  let resolved = false;
  const timeout = setTimeout(() => {
    if (resolved) return;
    resolved = true;
    encounterArea.innerHTML = `<div class="small center">Oh no — ${crit.name} got away!</div>`;
    setTimeout(() => {
      encounterArea.innerHTML = '';
      nextQuestion();
    }, 900);
  }, 5000);

  btnCatch.onclick = () => {
    if (resolved) return;
    resolved = true;
    clearTimeout(timeout);
    const chance = getCatchChance(crit.index);
    const success = Math.random() < chance;
    
    if (success) {
      if (isStolen) {
        const idx = state.stolen.indexOf(crit.id);
        if (idx >= 0) state.stolen.splice(idx, 1);
        addToCollection(crit.id);
        encounterArea.innerHTML = `<div class="small center">🎉 You recaught <strong>${crit.name}</strong>!</div>`;
      } else {
        addToCollection(crit.id);
        encounterArea.innerHTML = `<div class="small center">🎉 You caught <strong>${crit.name}</strong>!</div>`;
        if (getRarity(crit.index) === 'legendary') {
          state.milestones.push('legendary-' + crit.index);
        }
      }
      save();
      setTimeout(() => {
        encounterArea.innerHTML = '';
        nextQuestion();
      }, 1200);
    } else {
      encounterArea.innerHTML = `<div class="small center">💨 Oh no — ${crit.name} escaped!</div>`;
      setTimeout(() => {
        encounterArea.innerHTML = '';
        nextQuestion();
      }, 900);
    }
  };

  btnRun.onclick = () => {
    if (resolved) return;
    resolved = true;
    clearTimeout(timeout);
    encounterArea.innerHTML = `<div class="small center">👋 You let ${crit.name} go.</div>`;
    setTimeout(() => {
      encounterArea.innerHTML = '';
      nextQuestion();
    }, 700);
  };
}

function addToCollection(id) {
  if (!state.collection.includes(id)) {
    state.collection.push(id);
    
    if (state.collection.length === 1) unlockAchievement('first_catch');
    if (state.collection.length >= 50) unlockAchievement('collector_50');
    
    const crit = creatures.find(c => c.id === id);
    if (crit && LEGENDARIES.has(crit.index)) {
      unlockAchievement('legendary_trainer');
    }
    
    if (state.collection.length === creatures.length) {
      unlockAchievement('dex_complete');
    }
    
    save();
    updateCollectionBar();
  } else {
    showTempMessage('You already have that one!', 900, 'hint');
  }
}

function updateCollectionBar() {
  collectionBar.innerHTML = '';
  state.collection.forEach(cid => {
    const c = creatures.find(x => x.id === cid);
    if (!c) return;
    const el = document.createElement('div');
    el.className = 'collection-creature';
    el.title = c.name;
    el.innerHTML = `<img src="${c.img}" alt="${c.name}"><div class="small-muted">${c.name}</div>`;
    collectionBar.appendChild(el);
  });
}

// ========== EGGS & HATCHING ==========
function giveEgg() {
  const minutes = 2 + Math.floor(Math.random() * 4);
  const hatchTime = Date.now() + minutes * 60 * 1000;
  const egg = { id: `egg${Date.now()}`, hatchTime, critId: pickWeightedCreature().id };
  state.eggs.push(egg);
  save();
  showTempMessage('An egg has been added to your collection! 🥚', 2000, 'hint');
  if (state.eggs.length >= 10) unlockAchievement('egg_collector');
  renderEggs();
}

function renderEggs() {
  eggsBar.innerHTML = '';
  state.eggs.forEach(egg => {
    const eggEl = document.createElement('div');
    eggEl.className = 'egg';
    const secondsLeft = Math.floor((egg.hatchTime - Date.now()) / 1000);
    const minutesLeft = Math.ceil(secondsLeft / 60);
    eggEl.innerHTML = `🐣<div class="egg-timer">${minutesLeft} min</div>`;
    eggsBar.appendChild(eggEl);
  });
}

function checkEggs() {
  const now = Date.now();
  const hatchedEggs = state.eggs.filter(e => now >= e.hatchTime);
  const remainingEggs = state.eggs.filter(e => now < e.hatchTime);
  state.eggs = remainingEggs;

  hatchedEggs.forEach(egg => {
    state.hatched.push(egg.critId);
    addToCollection(egg.critId);
    const crit = creatures.find(c => c.id === egg.critId);
    if (crit) {
      showTempMessage(`🎉 Your egg hatched a ${crit.name}!`, 3000, 'success');
      unlockAchievement('egg_hatcher');
    }
  });

  if (hatchedEggs.length > 0) {
    save();
    renderEggs();
    updateCollectionBar();
  }
}

// ========== EVOLUTION & TEAM ROCKET ==========
function triggerEvolution() {
  const potentialEvo = state.collection.find(cid => {
    const crit = creatures.find(c => c.id === cid);
    if (crit && crit.index < 100 && (crit.index % 10 === 0)) return true;
    return false;
  });
  
  if (potentialEvo) {
    const crit = creatures.find(c => c.id === potentialEvo);
    const nextCrit = creatures.find(c => c.index === crit.index + 1);
    if (nextCrit) {
      state.collection = state.collection.filter(id => id !== crit.id);
      addToCollection(nextCrit.id);
      showTempMessage(`✨ ${crit.name} evolved into ${nextCrit.name}!`, 2500, 'success');
    }
  }
}

let rocketBattleCorrect = 0;
let rocketBattleTotal = 3;
let rocketQuestions = [];

function triggerRocketBattle() {
  showScreen('rocketBattle');
  
  // Generate 3 challenging questions for the rocket battle
  rocketQuestions = [
    { question: 'Spell: one hundred fifty', answer: 'one hundred fifty' },
    { question: 'What comes after 199?', answer: '200' },
    { question: 'Spell: ninety-nine', answer: 'ninety-nine' }
  ];
  
  rocketBattleCorrect = 0;
  updateRocketQuestion();
}

function updateRocketQuestion() {
  if (rocketBattleCorrect >= rocketBattleTotal) {
    handleRocketVictory();
    return;
  }
  
  const currentQ = rocketQuestions[rocketBattleCorrect];
  document.getElementById('rocketQuestion').textContent = currentQ.question;
  document.getElementById('rocketFeedback').textContent = '';
  document.getElementById('rocketProgress').textContent = `${rocketBattleCorrect}/${rocketBattleTotal}`;
  
  const rocketOptions = document.getElementById('rocketOptions');
  rocketOptions.innerHTML = '';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type your answer';
  input.id = 'rocketAnswerInput';
  input.style.width = '300px';
  input.style.fontSize = '1.1rem';
  
  const btn = document.createElement('button');
  btn.textContent = 'Submit Answer';
  btn.onclick = submitRocketAnswer;
  
  input.onkeydown = (e) => {
    if (e.key === 'Enter') submitRocketAnswer();
  };
  
  rocketOptions.appendChild(input);
  rocketOptions.appendChild(btn);
  
  // Focus the input
  setTimeout(() => input.focus(), 100);
  
  speak(currentQ.question);
}

function submitRocketAnswer() {
  const input = document.getElementById('rocketAnswerInput');
  const answer = input.value.trim().toLowerCase();
  const correctAnswer = rocketQuestions[rocketBattleCorrect].answer.toLowerCase();
  
  if (answer === correctAnswer) {
    rocketBattleCorrect++;
    document.getElementById('rocketFeedback').textContent = `Correct! ${rocketBattleTotal - rocketBattleCorrect} more to go!`;
    document.getElementById('rocketFeedback').className = 'small center feedback-success';
    
    setTimeout(() => {
      updateRocketQuestion();
    }, 1500);
  } else {
    document.getElementById('rocketFeedback').textContent = `Not quite right. Try again!`;
    document.getElementById('rocketFeedback').className = 'small center feedback-error';
    input.value = '';
    input.focus();
  }
}

function handleRocketVictory() {
  state.rocketWins++;
  if (state.rocketWins >= 5) unlockAchievement('rocket_defeated');
  
  showScreen('victory');
  document.getElementById('victoryMessage').textContent = `🎉 You defeated Team Rocket! This is victory #${state.rocketWins}!`;
  
  const rewards = document.getElementById('victoryRewards');
  rewards.innerHTML = '<h3>Rewards:</h3>';
  
  // Give rewards
  const rewardCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < rewardCount; i++) {
    const creature = pickWeightedCreature();
    addToCollection(creature.id);
    rewards.innerHTML += `<p>🎁 Caught ${creature.name}!</p>`;
  }
  
  // Sometimes steal a creature (but not if they only have a few)
  if (state.collection.length > 5 && Math.random() < 0.3) {
    const stolenCreature = state.collection[Math.floor(Math.random() * state.collection.length)];
    state.stolen.push(stolenCreature);
    state.collection = state.collection.filter(c => c !== stolenCreature);
    const crit = creatures.find(c => c.id === stolenCreature);
    rewards.innerHTML += `<p style="color: #ef4444;">😈 Team Rocket stole your ${crit.name}!</p>`;
  }
  
  save();
  updateCollectionBar();
}

// ========== SCREENS & NAVIGATION ==========
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  
  if (id === 'game') {
    updateCollectionBar();
    renderEggs();
    renderAchievements();
    updateStats();
  }
  if (id === 'map') renderMap();
  if (id === 'dex') renderDex();
  if (id === 'analytics') renderAnalytics();
}

// ========== ANALYTICS & SETTINGS ==========
function renderMap() {
  const mapGrid = document.getElementById('mapGrid');
  mapGrid.innerHTML = '';
  for (let i = 1; i <= MAX_NUM; i++) {
    const tile = document.createElement('div');
    tile.className = 'map-tile';
    tile.textContent = i;
    if (state.mastered.includes(i)) {
      tile.classList.add('completed');
    } else if (state.mistakes[i] > 0) {
      tile.classList.add('partial');
    }
    tile.title = `Number ${i}: ${state.mastered.includes(i) ? 'Mastered' : (state.mistakes[i] ? `${state.mistakes[i]} mistakes` : 'Not attempted')}`;
    mapGrid.appendChild(tile);
  }
}

function renderDex() {
  const dexGrid = document.getElementById('dexGrid');
  const dexProgress = document.getElementById('dexProgress');
  
  dexProgress.textContent = `${state.collection.length} / ${creatures.length} caught`;
  
  dexGrid.innerHTML = '';
  creatures.forEach(c => {
    const el = document.createElement('div');
    el.className = 'dex-creature';
    const isCaught = state.collection.includes(c.id);
    if (!isCaught) el.classList.add('locked');
    const rarity = getRarity(c.index);
    el.classList.add(`dex-${rarity}`);
    el.innerHTML = `
      <img src="${isCaught ? c.img : 'https://placehold.co/50x50/333333/FFFFFF?text=?'}" alt="${isCaught ? c.name : '???'}">
      <div>${isCaught ? c.name : '???'}</div>
      <div class="small-muted">${rarity}</div>
    `;
    dexGrid.appendChild(el);
  });
}

function renderAnalytics() {
  const content = document.getElementById('analyticsContent');
  const totalAnswers = state.correctTotal + state.readingTotal + state.mathTotal;
  
  content.innerHTML = `
    <h3>Overall Progress</h3>
    <p>Total Correct Answers: <strong>${totalAnswers}</strong></p>
    <p>Number Questions: <strong>${state.correctTotal}</strong></p>
    <p>Reading Questions: <strong>${state.readingTotal}</strong></p>
    <p>Math Questions: <strong>${state.mathTotal}</strong></p>
    <p>Mastered Numbers: <strong>${state.mastered.length} / ${MAX_NUM}</strong></p>
    <p>Reading Words Mastered: <strong>${state.readingMastered.length}</strong></p>
    <p>Math Problems Mastered: <strong>${state.mathMastered.length}</strong></p>
    <p>Addition Level: <strong>${state.additionLevel} / 5</strong></p>
    <p>Subtraction Level: <strong>${state.subtractionLevel} / 5</strong></p>
    <p>Pokédex Completion: <strong>${state.collection.length} / ${creatures.length}</strong></p>
    <p>Team Rocket Wins: <strong>${state.rocketWins}</strong></p>
    <p>Eggs Collected: <strong>${state.hatched.length + state.eggs.length}</strong></p>
    <p>Phonics Challenges: <strong>${state.phonicsCompleted}</strong></p>
    <hr style="margin:20px 0; border: none; border-top: 1px dashed #ccc;">
    <h3>Areas for Practice</h3>
    <ul id="mistakesList"></ul>
  `;
  
  const mistakesList = document.getElementById('mistakesList');
  const numberMistakes = Object.entries(state.mistakes).sort(([, a], [, b]) => b - a);
  const readingMistakes = Object.entries(state.readingMistakes).sort(([, a], [, b]) => b - a);
  const mathMistakes = Object.entries(state.mathMistakes).sort(([, a], [, b]) => b - a);
  
  if (numberMistakes.length === 0 && readingMistakes.length === 0 && mathMistakes.length === 0) {
    mistakesList.innerHTML = '<li>No mistakes yet - great job!</li>';
  } else {
    mistakesList.innerHTML = '<h4>Numbers needing practice:</h4>';
    numberMistakes.slice(0, 3).forEach(([num, count]) => {
      const li = document.createElement('li');
      li.textContent = `${num}: ${count} mistakes`;
      mistakesList.appendChild(li);
    });
    
    if (readingMistakes.length > 0) {
      const readingHeader = document.createElement('h4');
      readingHeader.textContent = 'Reading words needing practice:';
      mistakesList.appendChild(readingHeader);
      
      readingMistakes.slice(0, 3).forEach(([word, count]) => {
        const li = document.createElement('li');
        li.textContent = `${word}: ${count} mistakes`;
        mistakesList.appendChild(li);
      });
    }
    
    if (mathMistakes.length > 0) {
      const mathHeader = document.createElement('h4');
      mathHeader.textContent = 'Math problems needing practice:';
      mistakesList.appendChild(mathHeader);
      
      mathMistakes.slice(0, 3).forEach(([problem, count]) => {
        const li = document.createElement('li');
        li.textContent = `${problem}: ${count} mistakes`;
        mistakesList.appendChild(li);
      });
    }
  }
  
  soundToggle.checked = state.sound;
  hintsToggle.checked = state.hints;
}

function renderAchievements() {
  const list = document.getElementById('achievementsList');
  list.innerHTML = '';
  const unlocked = Object.keys(state.achievementsUnlocked).length;
  if (unlocked === 0) {
    list.textContent = 'No achievements unlocked yet.';
    return;
  }
  Object.keys(achievements).forEach(key => {
    if (state.achievementsUnlocked[key]) {
      const span = document.createElement('span');
      span.textContent = `🏆 ${achievements[key].name}`;
      span.style.margin = '0 5px';
      span.title = achievements[key].description;
      list.appendChild(span);
    }
  });
}

function resetGame() {
  if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) {
    localStorage.removeItem(STORAGE_KEY);
    state = {
      gameMode: 'mixed',
      difficulty: 1,
      streak: 0,
      mastered: [],
      readingMastered: [],
      mistakes: {},
      readingMistakes: {},
      collection: [],
      stolen: [],
      lastQuestion: null,
      correctTotal: 0,
      readingTotal: 0,
      sound: true,
      hints: true,
      milestones: [],
      achievementsUnlocked: {},
      eggs: [],
      hatched: [],
      rocketWins: 0,
      phonicsCompleted: 0
    };
    save();
    showTempMessage('All progress has been reset!', 2000, 'error');
    showScreen('menu');
  }
}

// ========== EVENT LISTENERS ==========
window.onload = function() {
  showScreen('menu');
  
  // Settings
  soundToggle.checked = state.sound;
  soundToggle.addEventListener('change', (e) => {
    state.sound = e.target.checked;
    save();
  });
  
  hintsToggle.checked = state.hints;
  hintsToggle.addEventListener('change', (e) => {
    state.hints = e.target.checked;
    save();
  });
  
  // Game mode selection
  document.getElementById('numbersMode').onclick = () => {
    state.gameMode = 'numbers';
    updateModeButtons();
    save();
  };
  
  document.getElementById('readingMode').onclick = () => {
    state.gameMode = 'reading';
    updateModeButtons();
    save();
  };
  
  document.getElementById('mathMode').onclick = () => {
    state.gameMode = 'math';
    updateModeButtons();
    save();
  };
  
  document.getElementById('timeMode').onclick = () => {
    state.gameMode = 'time';
    updateModeButtons();
    save();
  };
  
  document.getElementById('scienceMode').onclick = () => {
    state.gameMode = 'science';
    updateModeButtons();
    save();
  };
  
  document.getElementById('mixedMode').onclick = () => {
    state.gameMode = 'mixed';
    updateModeButtons();
    save();
  };
  
  // Navigation
  document.getElementById('playBtn').onclick = startGame;
  document.getElementById('mapBtn').onclick = () => showScreen('map');
  document.getElementById('dexBtn').onclick = () => showScreen('dex');
  document.getElementById('analyticsBtn').onclick = () => showScreen('analytics');
  document.getElementById('backFromMap').onclick = () => showScreen('menu');
  document.getElementById('backFromDex').onclick = () => showScreen('menu');
  document.getElementById('backFromAnalytics').onclick = () => showScreen('menu');
  document.getElementById('quitBtn').onclick = quitToMenu;
  document.getElementById('resetBtn').onclick = resetGame;
  
  // Game controls
  document.getElementById('submitBtn').onclick = submitAnswer;
  document.getElementById('answerInput').onkeydown = (e) => {
    if (e.key === 'Enter') submitAnswer();
  };
  document.getElementById('continueBtn').onclick = nextQuestion;
  document.getElementById('hintBtn').onclick = showHint;
  
  // Team Rocket controls
  document.getElementById('forfeitRocket').onclick = () => {
    showTempMessage('You gave up! Team Rocket wins this time!', 2000, 'error');
    setTimeout(() => {
      showScreen('game');
      nextQuestion();
    }, 1000);
  };
  
  // Victory screen
  document.getElementById('continueFromVictory').onclick = () => {
    showScreen('game');
    nextQuestion();
  };
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && continueBtn.style.display !== 'none') {
      e.preventDefault();
      nextQuestion();
    }
    if (e.key === 'h' && hintBtn.style.display !== 'none') {
      e.preventDefault();
      showHint();
    }
  });
  
  updateCollectionBar();
  renderAchievements();
  renderEggs();
  updateModeButtons();
  
  gameTimerInterval = setInterval(checkEggs, 1000);
};

function updateModeButtons() {
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(state.gameMode + 'Mode').classList.add('active');
}
