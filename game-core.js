// ========== CORE GAME LOGIC ==========
const STORAGE_KEY = 'spelling_numbers_finn_v7';
let state = {
  gameMode: 'mixed', // 'numbers', 'reading', 'mixed', 'math', 'time', 'science'
  gradeLevel: 1, // 1-6 corresponding to grades 1-6
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

let gameTimerInterval;
let currentQuestion = null;

// DOM element references
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const continueBtn = document.getElementById('continueBtn');
const inputRow = document.getElementById('inputRow');
const answerInput = document.getElementById('answerInput');
const hintBtn = document.getElementById('hintBtn');
const encounterArea = document.getElementById('encounterArea');
const collectionBar = document.getElementById('collectionBar');
const eggsBar = document.getElementById('eggsBar');
const achievementsList = document.getElementById('achievementsList');
const streakLabel = document.getElementById('streakLabel');
const totalLabel = document.getElementById('totalLabel');
const difficultyLabel = document.getElementById('difficultyLabel');
const soundToggle = document.getElementById('soundToggle');
const hintsToggle = document.getElementById('hintsToggle');

// ========== STORAGE FUNCTIONS ==========
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const loadedState = JSON.parse(saved);
      // Merge with default state to handle new properties
      state = { ...state, ...loadedState };
    }
  } catch (e) {
    console.error('Failed to load game state:', e);
  }
}

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenName).style.display = 'block';
}

// ========== SPEECH SYNTHESIS ==========
function speak(text) {
  if (!state.sound || !('speechSynthesis' in window)) return;
  
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.speechRate;
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Speech synthesis error:', e);
  }
}

// ========== QUESTION GENERATION ==========
// Clear encounters after a delay to let players see them
function clearEncountersDelayed() {
  setTimeout(() => {
    if (encounterArea.innerHTML.includes('pokemon-encounter') || encounterArea.innerHTML.includes('egg-find')) {
      encounterArea.innerHTML = '';
    }
  }, 5000); // Clear after 5 seconds
}

function nextQuestion() {
  hideElements();
  
  // Clear old encounters after a delay
  clearEncountersDelayed();
  
  const gradeContent = getGradeContent();
  
  if (state.gameMode === 'mixed') {
    const modes = ['numbers', 'reading', 'math', 'time', 'science'];
    state.gameMode = modes[Math.floor(Math.random() * modes.length)];
  }

  switch (state.gameMode) {
    case 'numbers':
      generateNumberQuestion(gradeContent);
      break;
    case 'reading':
      generateReadingQuestion(gradeContent);
      break;
    case 'math':
      generateMathQuestion(gradeContent);
      break;
    case 'time':
      generateTimeQuestion(gradeContent);
      break;
    case 'science':
      generateScienceQuestion(gradeContent);
      break;
    default:
      generateNumberQuestion(gradeContent);
  }

  updateStats();
  
  if (state.gameMode === 'mixed') {
    state.gameMode = 'mixed'; // Reset back to mixed mode
  }
}

function generateNumberQuestion(gradeContent) {
  const { min, max } = gradeContent.numbers;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  
  currentQuestion = {
    type: 'numbers',
    number: number,
    answer: numberToWords(number).toLowerCase()
  };

  questionEl.textContent = `How do you spell: ${number}?`;
  speak(`How do you spell ${number}?`);

  const options = generateSpellingOptions(number);
  createOptionsButtons(options, currentQuestion.answer);
}

function generateReadingQuestion(gradeContent) {
  const wordList = [...gradeContent.readingWords, ...gradeContent.sightWords];
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  
  const questionTypes = ['spell', 'meaning', 'rhyme', 'complete'];
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  switch (questionType) {
    case 'spell':
      generateSpellingQuestion(word);
      break;
    case 'meaning':
      generateMeaningQuestion(word);
      break;
    case 'rhyme':
      generateRhymeQuestion(word);
      break;
    case 'complete':
      generateCompletionQuestion(word);
      break;
  }
}

function generateSpellingQuestion(word) {
  currentQuestion = {
    type: 'reading',
    word: word,
    answer: word.toLowerCase()
  };

  questionEl.textContent = `How do you spell: ${word}?`;
  speak(`How do you spell ${word}?`);

  const wrongOptions = generateWrongSpellings(word);
  const options = [word, ...wrongOptions].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, word);
}

function generateMathQuestion(gradeContent) {
  const operations = ['addition', 'subtraction'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  switch (operation) {
    case 'addition':
      generateAdditionQuestion(gradeContent);
      break;
    case 'subtraction':
      generateSubtractionQuestion(gradeContent);
      break;
  }
}

function generateAdditionQuestion(gradeContent) {
  const { max1, max2, maxSum } = gradeContent.addition;
  
  let num1, num2;
  do {
    num1 = Math.floor(Math.random() * max1) + 1;
    num2 = Math.floor(Math.random() * max2) + 1;
  } while (num1 + num2 > maxSum);

  const answer = num1 + num2;
  
  currentQuestion = {
    type: 'math',
    operation: 'addition',
    num1: num1,
    num2: num2,
    answer: answer
  };

  questionEl.innerHTML = `
    <div class="math-display">
      ${num1} + ${num2} = ?
    </div>
  `;
  
  speak(`What is ${num1} plus ${num2}?`);

  const wrongAnswers = [
    answer + 1,
    answer - 1,
    answer + 2,
    Math.max(1, answer - 2)
  ].filter(n => n !== answer && n > 0);
  
  const options = [answer, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, answer);
}

function generateSubtractionQuestion(gradeContent) {
  const { minStart, maxStart, maxSub } = gradeContent.subtraction;
  
  let num1, num2;
  do {
    num1 = Math.floor(Math.random() * (maxStart - minStart + 1)) + minStart;
    num2 = Math.floor(Math.random() * Math.min(maxSub, num1)) + 1;
  } while (num1 - num2 < 0);

  const answer = num1 - num2;
  
  currentQuestion = {
    type: 'math',
    operation: 'subtraction',
    num1: num1,
    num2: num2,
    answer: answer
  };

  questionEl.innerHTML = `
    <div class="math-display">
      ${num1} - ${num2} = ?
    </div>
  `;
  
  speak(`What is ${num1} minus ${num2}?`);

  const wrongAnswers = [
    answer + 1,
    answer - 1,
    answer + 2,
    Math.max(0, answer - 2)
  ].filter(n => n !== answer && n >= 0);
  
  const options = [answer, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, answer);
}

function generateTimeQuestion(gradeContent) {
  const skills = gradeContent.timeSkills;
  const skill = skills[Math.floor(Math.random() * skills.length)];
  
  if (skill.includes('clock') || skill === 'hour') {
    generateClockQuestion();
  } else if (skill.includes('time')) {
    generateTimeReadingQuestion();
  } else {
    generateTimeVocabularyQuestion();
  }
}

function generateClockQuestion() {
  const gradeLevel = state.gradeLevel;
  let hour, minutes;
  
  // Generate appropriate difficulty based on grade
  if (gradeLevel <= 2) {
    // Grades 1-2: Focus on hour and half-hour
    hour = Math.floor(Math.random() * 12) + 1;
    minutes = [0, 30][Math.floor(Math.random() * 2)];
  } else if (gradeLevel <= 4) {
    // Grades 3-4: Add quarter hours and 5-minute intervals
    hour = Math.floor(Math.random() * 12) + 1;
    minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
  } else {
    // Grades 5-6: Any time, including tricky ones
    hour = Math.floor(Math.random() * 12) + 1;
    minutes = Math.floor(Math.random() * 60);
  }
  
  const timeString = `${hour}:${minutes.toString().padStart(2, '0')}`;
  
  currentQuestion = {
    type: 'time',
    hour: hour,
    minutes: minutes,
    answer: timeString
  };

  questionEl.innerHTML = `
    <div>What time does this clock show?</div>
    <div class="clock-display">
      <div class="analog-clock">
        <div class="clock-face">
          <div class="hour-12">12</div>
          <div class="hour-1">1</div>
          <div class="hour-2">2</div>
          <div class="hour-3">3</div>
          <div class="hour-4">4</div>
          <div class="hour-5">5</div>
          <div class="hour-6">6</div>
          <div class="hour-7">7</div>
          <div class="hour-8">8</div>
          <div class="hour-9">9</div>
          <div class="hour-10">10</div>
          <div class="hour-11">11</div>
          <div class="hour-hand" style="transform: rotate(${(hour % 12) * 30 + minutes * 0.5}deg)"></div>
          <div class="minute-hand" style="transform: rotate(${minutes * 6}deg)"></div>
          <div class="clock-center"></div>
        </div>
      </div>
    </div>
  `;
  
  speak(`What time does this clock show?`);

  // Generate challenging wrong answers
  const wrongTimes = [];
  
  // Off by 5 minutes (common reading error)
  if (minutes >= 5) wrongTimes.push(`${hour}:${(minutes - 5).toString().padStart(2, '0')}`);
  if (minutes <= 55) wrongTimes.push(`${hour}:${(minutes + 5).toString().padStart(2, '0')}`);
  
  // Off by 15 minutes (quarter hour confusion)
  wrongTimes.push(`${hour}:${((minutes + 15) % 60).toString().padStart(2, '0')}`);
  
  // Hour hand confusion (reading wrong hour when minute hand is past 30)
  const nextHour = hour === 12 ? 1 : hour + 1;
  const prevHour = hour === 1 ? 12 : hour - 1;
  if (minutes > 30) {
    wrongTimes.push(`${nextHour}:${minutes.toString().padStart(2, '0')}`);
  } else if (minutes > 0) {
    wrongTimes.push(`${prevHour}:${minutes.toString().padStart(2, '0')}`);
  }
  
  // Remove duplicates and current answer
  const uniqueWrongTimes = [...new Set(wrongTimes)].filter(t => t !== timeString);
  const options = [timeString, ...uniqueWrongTimes.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, timeString);
}

function generateScienceQuestion(gradeContent) {
  const topics = gradeContent.scienceTopics;
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  switch (topic) {
    case 'animals':
      generateAnimalQuestion();
      break;
    case 'weather':
      generateWeatherQuestion();
      break;
    case 'seasons':
      generateSeasonQuestion();
      break;
    default:
      generateAnimalQuestion();
  }
}

function generateAnimalQuestion() {
  const animal = scienceContent.animals[Math.floor(Math.random() * scienceContent.animals.length)];
  
  const questionTypes = ['habitat', 'sound', 'fact'];
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  currentQuestion = {
    type: 'science',
    animal: animal.name,
    answer: animal[questionType]
  };

  switch (questionType) {
    case 'habitat':
      questionEl.textContent = `Where does a ${animal.name} live?`;
      speak(`Where does a ${animal.name} live?`);
      
      const habitats = ['forest', 'ocean', 'savanna', 'pond', 'hive', 'desert', 'mountain'];
      const wrongHabitats = habitats.filter(h => h !== animal.habitat).slice(0, 3);
      const habitatOptions = [animal.habitat, ...wrongHabitats].sort(() => Math.random() - 0.5);
      createOptionsButtons(habitatOptions, animal.habitat);
      break;
      
    case 'sound':
      questionEl.textContent = `What sound does a ${animal.name} make?`;
      speak(`What sound does a ${animal.name} make?`);
      
      const sounds = ['trumpet', 'click', 'hoot', 'ribbit', 'buzz', 'roar', 'bark'];
      const wrongSounds = sounds.filter(s => s !== animal.sound).slice(0, 3);
      const soundOptions = [animal.sound, ...wrongSounds].sort(() => Math.random() - 0.5);
      createOptionsButtons(soundOptions, animal.sound);
      break;
      
    case 'fact':
      questionEl.textContent = `What is special about a ${animal.name}?`;
      speak(`What is special about a ${animal.name}?`);
      
      const facts = ['largest land animal', 'very smart marine mammal', 'hunts at night', 'starts as a tadpole', 'makes honey'];
      const wrongFacts = facts.filter(f => f !== animal.fact).slice(0, 3);
      const factOptions = [animal.fact, ...wrongFacts].sort(() => Math.random() - 0.5);
      createOptionsButtons(factOptions, animal.fact);
      break;
  }
}

// ========== UI HELPER FUNCTIONS ==========
function hideElements() {
  optionsEl.innerHTML = '';
  inputRow.style.display = 'none';
  continueBtn.style.display = 'none';
  hintBtn.style.display = 'none';
  feedbackEl.textContent = '';
  // Don't clear encounterArea immediately - let Pokemon encounters show
  // encounterArea.innerHTML = '';
}

function createOptionsButtons(options, correctAnswer) {
  optionsEl.innerHTML = '';
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => submitAnswer(option);
    optionsEl.appendChild(button);
  });
}

function submitAnswer(givenAnswer = null) {
  const answer = givenAnswer || answerInput.value.trim().toLowerCase();
  const isCorrect = checkAnswer(answer);
  
  handleAnswer(isCorrect);
  showFeedback(isCorrect, answer);
  
  continueBtn.style.display = 'inline-block';
  optionsEl.innerHTML = '';
  inputRow.style.display = 'none';
  
  save();
}

function checkAnswer(userAnswer) {
  if (!currentQuestion) return false;
  
  const correctAnswer = currentQuestion.answer.toString().toLowerCase();
  const normalizedAnswer = userAnswer.toString().toLowerCase().trim();
  
  return normalizedAnswer === correctAnswer;
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    state.streak++;
    state.correctTotal++;
    
    // Update specific totals based on question type
    switch (currentQuestion.type) {
      case 'reading':
        state.readingTotal++;
        break;
      case 'math':
        state.mathTotal++;
        break;
      case 'time':
        state.timeTotal++;
        break;
      case 'science':
        state.scienceTotal++;
        break;
    }
    
    // Mark as mastered
    if (currentQuestion.type === 'numbers') {
      if (!state.mastered.includes(currentQuestion.number)) {
        state.mastered.push(currentQuestion.number);
      }
    }
    
    // Clear encounter area first
    encounterArea.innerHTML = '';
    
    // Enhanced Pokemon encounter system - ALWAYS try to show something exciting!
    let encounterChance = 0.4; // Good base 40% chance
    
    // Increase chance based on streak
    if (state.streak >= 3) encounterChance += 0.2;
    if (state.streak >= 5) encounterChance += 0.2;
    if (state.streak >= 10) encounterChance += 0.2;
    
    // Guarantee encounter every 2 correct answers to prevent dry spells
    const guaranteedEncounter = state.correctTotal % 2 === 0;
    
    console.log(`Encounter check: Streak ${state.streak}, Total ${state.correctTotal}, Chance ${encounterChance}, Guaranteed ${guaranteedEncounter}`);
    
    if (guaranteedEncounter || Math.random() < encounterChance) {
      console.log('Pokemon encounter triggered!');
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        catchPokemon();
      }, 100);
    } else {
      console.log('No Pokemon encounter this time');
      // Even if no Pokemon, show encouraging message
      setTimeout(() => {
        if (encounterArea.innerHTML === '') {
          encounterArea.innerHTML = `
            <div class="pokemon-search">
              <div>🔍 Looking for Pokemon...</div>
              <div class="small">Keep answering correctly to find more!</div>
            </div>
          `;
        }
      }, 200);
    }
    
    // Egg generation - 30% chance per correct answer (after Pokemon check)
    if (Math.random() < 0.3 && state.eggs.length < 6) {
      setTimeout(() => {
        generateEgg();
        // Add egg message below Pokemon encounter if any
        const eggMessage = `
          <div class="egg-find" style="margin-top: 10px;">
            <div>🥚 You found a mysterious egg!</div>
            <div class="small">It will hatch soon...</div>
          </div>
        `;
        encounterArea.innerHTML += eggMessage;
        speak('You found a mysterious egg!');
      }, 300);
    }
    
    // Check for achievements
    checkAchievements();
    
    // Trigger random events (Team Rocket, special encounters, etc.)
    checkForRandomEvents();
    
  } else {
    state.streak = 0;
    
    // Track mistakes
    if (currentQuestion.type === 'numbers') {
      const num = currentQuestion.number;
      state.mistakes[num] = (state.mistakes[num] || 0) + 1;
    }
  }
}

// ========== RANDOM EVENTS SYSTEM ==========
function checkForRandomEvents() {
  // Team Rocket appears every 20-30 correct answers
  if (state.correctTotal > 0 && state.correctTotal % 25 === 0 && state.collection.length >= 5) {
    if (Math.random() < 0.7) { // 70% chance when conditions are met
      setTimeout(() => {
        if (confirm('🚀 Team Rocket appeared! Do you want to battle them for a rare Pokemon?')) {
          startRocketBattle();
        }
      }, 1000);
    }
  }
  
  // Legendary encounter chance for high streaks
  if (state.streak >= 15 && Math.random() < 0.1) {
    setTimeout(() => {
      encounterArea.innerHTML += `
        <div class="legendary-event">
          <div>🌟 A legendary presence is felt nearby... 🌟</div>
          <div class="small">Your streak is attracting powerful Pokemon!</div>
        </div>
      `;
    }, 500);
  }
}

function showFeedback(isCorrect, userAnswer) {
  if (isCorrect) {
    feedbackEl.innerHTML = '<span class="success">✅ Correct!</span>';
    speak('Correct!');
    
    // Debug info for tracking encounters (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const debugInfo = `
        <div class="small" style="margin-top: 5px; opacity: 0.7;">
          Debug: Streak ${state.streak} | Total ${state.correctTotal} | Collection ${state.collection.length}/151
        </div>
      `;
      feedbackEl.innerHTML += debugInfo;
    }
  } else {
    const correctAnswer = currentQuestion.answer;
    feedbackEl.innerHTML = `<span class="error">❌ Not quite. The answer was: ${correctAnswer}</span>`;
    speak(`Not quite. The answer was ${correctAnswer}`);
  }
}

function updateStats() {
  streakLabel.textContent = state.streak;
  totalLabel.textContent = state.correctTotal;
  difficultyLabel.textContent = state.gameMode.charAt(0).toUpperCase() + state.gameMode.slice(1);
}

// ========== POKEMON AND ACHIEVEMENTS ==========
function catchPokemon() {
  console.log('=== CATCHPOKEMON FUNCTION CALLED ===');
  console.log('Current collection size:', state.collection.length);
  console.log('Available creatures:', creatures.length);
  console.log('encounterArea element:', encounterArea);
  
  if (!creatures || creatures.length === 0) {
    console.error('ERROR: creatures array is not defined or empty!');
    encounterArea.innerHTML = `
      <div class="pokemon-encounter error-encounter">
        <div class="pokemon-caught">❌</div>
        <div>Pokemon data not loaded!</div>
        <div class="small">Check console for details</div>
      </div>
    `;
    return;
  }
  
  const availablePokemon = creatures.filter(c => !state.collection.includes(c.name));
  console.log('Available Pokemon count:', availablePokemon.length);
  
  // If all Pokemon are caught, allow duplicates but show special message
  if (availablePokemon.length === 0) {
    const allPokemon = creatures[Math.floor(Math.random() * creatures.length)];
    const shinyHTML = `
      <div class="pokemon-encounter shiny-encounter">
        <div class="pokemon-caught">✨${allPokemon.emoji}✨</div>
        <div>Shiny ${allPokemon.name} appeared!</div>
        <div class="small">You already caught all Pokémon! This is a rare shiny variant!</div>
      </div>
    `;
    console.log('Setting shiny encounter HTML');
    encounterArea.innerHTML = shinyHTML;
    speak(`Amazing! A shiny ${allPokemon.name} appeared!`);
    updateCollectionBar();
    save();
    return;
  }
  
  // Determine rarity based on streak with better distribution
  let rarity = 'common';
  if (state.streak >= 3) rarity = 'uncommon';
  if (state.streak >= 10) rarity = 'rare';
  if (state.streak >= 20) rarity = 'legendary';
  
  console.log('Target rarity:', rarity, 'for streak:', state.streak);
  
  // Try to get Pokemon of desired rarity, fallback to any available
  let pokemonOfRarity = availablePokemon.filter(p => p.rarity === rarity);
  console.log('Pokemon of target rarity:', pokemonOfRarity.length);
  
  // If no Pokemon of desired rarity, try the next best
  if (pokemonOfRarity.length === 0 && rarity === 'legendary') {
    pokemonOfRarity = availablePokemon.filter(p => p.rarity === 'rare');
    console.log('Fallback to rare:', pokemonOfRarity.length);
  }
  if (pokemonOfRarity.length === 0 && (rarity === 'legendary' || rarity === 'rare')) {
    pokemonOfRarity = availablePokemon.filter(p => p.rarity === 'uncommon');
    console.log('Fallback to uncommon:', pokemonOfRarity.length);
  }
  if (pokemonOfRarity.length === 0) {
    pokemonOfRarity = availablePokemon.filter(p => p.rarity === 'common');
    console.log('Fallback to common:', pokemonOfRarity.length);
  }
  
  const pokemon = pokemonOfRarity.length > 0 
    ? pokemonOfRarity[Math.floor(Math.random() * pokemonOfRarity.length)]
    : availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
  
  console.log('Selected Pokemon:', pokemon.name, pokemon.rarity);
  
  // Add to collection BEFORE displaying
  state.collection.push(pokemon.name);
  console.log('Added to collection. New collection size:', state.collection.length);
  
  // Special message for rare encounters
  let encounterMessage = `You caught ${pokemon.name}!`;
  let extraClass = '';
  
  if (pokemon.rarity === 'legendary') {
    encounterMessage = `🌟 LEGENDARY ENCOUNTER! You caught ${pokemon.name}! 🌟`;
    extraClass = 'legendary-encounter';
  } else if (pokemon.rarity === 'rare') {
    encounterMessage = `✨ RARE ENCOUNTER! You caught ${pokemon.name}! ✨`;
    extraClass = 'rare-encounter';
  } else if (pokemon.rarity === 'uncommon') {
    encounterMessage = `⭐ UNCOMMON ENCOUNTER! You caught ${pokemon.name}! ⭐`;
    extraClass = 'uncommon-encounter';
  }
  
  const encounterHTML = `
    <div class="pokemon-encounter ${extraClass}">
      <div class="pokemon-caught">${pokemon.emoji}</div>
      <div>${encounterMessage}</div>
      <div class="small">${pokemon.description}</div>
      <div class="small">Rarity: ${pokemon.rarity} | Type: ${pokemon.type}</div>
      <div class="small">Collection: ${state.collection.length}/151</div>
    </div>
  `;
  
  console.log('Setting encounterArea HTML:', encounterHTML);
  
  // Force the encounter to display
  if (encounterArea) {
    encounterArea.innerHTML = encounterHTML;
    encounterArea.style.display = 'block';
    encounterArea.style.visibility = 'visible';
    console.log('encounterArea innerHTML set successfully');
  } else {
    console.error('encounterArea element not found!');
  }
  
  speak(encounterMessage);
  updateCollectionBar();
  
  // Update eggs display
  renderEggs();
  
  // Force a save to make sure progress is retained
  save();
  
  console.log('=== POKEMON ENCOUNTER COMPLETED ===');
}

function updateCollectionBar() {
  if (state.collection.length === 0) {
    collectionBar.innerHTML = '<div class="center">No Pokémon caught yet!</div>';
    return;
  }
  
  collectionBar.innerHTML = state.collection.slice(-10).map(name => {
    const pokemon = creatures.find(c => c.name === name);
    return `<span class="pokemon ${pokemon.rarity === 'legendary' ? 'legendary' : ''}">${pokemon.emoji}</span>`;
  }).join('');
}

function checkAchievements() {
  const newAchievements = [];
  
  // Check various achievement conditions
  if (state.collection.length === 1 && !state.achievementsUnlocked['first_catch']) {
    newAchievements.push('first_catch');
  }
  
  if (state.streak >= 20 && !state.achievementsUnlocked['streak_master']) {
    newAchievements.push('streak_master');
  }
  
  if (state.correctTotal >= 10 && !state.achievementsUnlocked['math_rookie']) {
    newAchievements.push('math_rookie');
  }
  
  // Award achievements
  newAchievements.forEach(achievementId => {
    state.achievementsUnlocked[achievementId] = true;
    const achievement = achievements[achievementId];
    showAchievement(achievement);
  });
}

function showAchievement(achievement) {
  const achievementEl = document.createElement('div');
  achievementEl.className = 'achievement';
  achievementEl.textContent = `🏆 ${achievement.name}`;
  achievementsList.appendChild(achievementEl);
  
  speak(`Achievement unlocked: ${achievement.name}`);
  
  setTimeout(() => {
    achievementEl.remove();
  }, 5000);
}

function renderAchievements() {
  // This function can be called to show permanent achievement display
  const unlockedAchievements = Object.keys(state.achievementsUnlocked);
  if (unlockedAchievements.length === 0) return;
  
  achievementsList.innerHTML = unlockedAchievements.slice(-3).map(id => {
    const achievement = achievements[id];
    return `<span class="achievement">🏆 ${achievement.name}</span>`;
  }).join('');
}

// ========== EGGS SYSTEM ==========
function generateEgg() {
  if (state.eggs.length >= 6) return; // Max 6 eggs
  
  const eggTypes = ['common', 'uncommon', 'rare'];
  const weights = [0.7, 0.25, 0.05];
  let random = Math.random();
  let eggType = 'common';
  
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      eggType = eggTypes[i];
      break;
    }
    random -= weights[i];
  }
  
  // Shorter hatch times for better gameplay experience
  const hatchTimes = {
    'common': 60000,    // 1 minute
    'uncommon': 120000, // 2 minutes  
    'rare': 300000      // 5 minutes
  };
  
  const egg = {
    id: Date.now() + Math.random(), // Ensure unique ID
    type: eggType,
    hatchTime: Date.now() + hatchTimes[eggType],
    progress: 0
  };
  
  console.log('Generated egg:', egg);
  
  state.eggs.push(egg);
  renderEggs();
  save(); // Save immediately when egg is generated
}

function checkEggs() {
  const now = Date.now();
  const readyEggs = state.eggs.filter(egg => now >= egg.hatchTime);
  
  // Hatch ready eggs
  readyEggs.forEach(egg => {
    console.log('Hatching ready egg:', egg.id);
    hatchEgg(egg.id);
  });
  
  // Update progress for remaining eggs
  state.eggs.forEach(egg => {
    const hatchTimes = {
      'common': 60000,    // 1 minute
      'uncommon': 120000, // 2 minutes  
      'rare': 300000      // 5 minutes
    };
    
    const totalTime = hatchTimes[egg.type] || 60000;
    const startTime = egg.hatchTime - totalTime;
    const elapsed = now - startTime;
    egg.progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));
    
    // Debug logging
    if (egg.progress > 90) {
      console.log(`Egg ${egg.id} almost ready: ${egg.progress}%`);
    }
  });
  
  // Update eggs display
  renderEggs();
  
  // Auto-save occasionally to preserve egg progress
  if (Math.random() < 0.1) { // 10% chance each check
    save();
  }
}

function hatchEgg(eggId) {
  console.log('=== HATCHING EGG ===');
  const eggIndex = state.eggs.findIndex(egg => egg.id === eggId);
  if (eggIndex === -1) {
    console.log('Egg not found:', eggId);
    return;
  }
  
  const egg = state.eggs[eggIndex];
  console.log('Hatching egg:', egg);
  state.eggs.splice(eggIndex, 1);
  
  console.log('Egg type:', egg.type);
  console.log('Available creatures:', creatures ? creatures.length : 'undefined');
  
  // Hatch a pokemon of the egg's rarity
  const availablePokemon = creatures.filter(c => 
    !state.collection.includes(c.name) && c.rarity === egg.type
  );
  
  console.log('Available Pokemon for hatching:', availablePokemon.length);
  
  if (availablePokemon.length > 0) {
    const pokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    
    // Add to collection AND hatched list
    state.collection.push(pokemon.name);
    state.hatched.push(pokemon.name);
    
    console.log('Hatched Pokemon:', pokemon.name, 'Collection size now:', state.collection.length);
    
    const hatchHTML = `
      <div class="egg-hatch">
        <div class="hatch-animation">🥚 ➡️ ${pokemon.emoji}</div>
        <div>Your egg hatched into ${pokemon.name}!</div>
        <div class="small">${pokemon.description}</div>
        <div class="small">Rarity: ${pokemon.rarity} | Type: ${pokemon.type}</div>
        <div class="small">Collection: ${state.collection.length}/151</div>
      </div>
    `;
    
    // Force the hatch message to display
    if (encounterArea) {
      encounterArea.innerHTML = hatchHTML;
      encounterArea.style.display = 'block';
      encounterArea.style.visibility = 'visible';
      console.log('Egg hatch message displayed');
    }
    
    speak(`Your egg hatched into ${pokemon.name}!`);
    updateCollectionBar();
    
    // Clear the hatch message after a few seconds
    setTimeout(() => {
      if (encounterArea && encounterArea.innerHTML.includes('egg-hatch')) {
        encounterArea.innerHTML = '';
      }
    }, 6000);
    
  } else {
    // If no Pokemon of that rarity available, try any available Pokemon
    console.log('No Pokemon of egg rarity available, trying any available...');
    const anyAvailable = creatures.filter(c => !state.collection.includes(c.name));
    
    if (anyAvailable.length > 0) {
      const pokemon = anyAvailable[Math.floor(Math.random() * anyAvailable.length)];
      state.collection.push(pokemon.name);
      state.hatched.push(pokemon.name);
      
      console.log('Hatched any available Pokemon:', pokemon.name, 'Collection size now:', state.collection.length);
      
      const hatchHTML = `
        <div class="egg-hatch">
          <div class="hatch-animation">🥚 ➡️ ${pokemon.emoji}</div>
          <div>Your egg hatched into ${pokemon.name}!</div>
          <div class="small">${pokemon.description}</div>
          <div class="small">Rarity: ${pokemon.rarity} | Type: ${pokemon.type}</div>
          <div class="small">Collection: ${state.collection.length}/151</div>
        </div>
      `;
      
      if (encounterArea) {
        encounterArea.innerHTML = hatchHTML;
        encounterArea.style.display = 'block';
        encounterArea.style.visibility = 'visible';
      }
      
      speak(`Your egg hatched into ${pokemon.name}!`);
      updateCollectionBar();
      
      setTimeout(() => {
        if (encounterArea && encounterArea.innerHTML.includes('egg-hatch')) {
          encounterArea.innerHTML = '';
        }
      }, 6000);
    } else {
      // All Pokemon caught - give a special message
      console.log('All Pokemon already caught');
      const specialHTML = `
        <div class="egg-hatch">
          <div>🥚 ➡️ ✨</div>
          <div>Your egg hatched into stardust!</div>
          <div class="small">You've caught all available Pokemon!</div>
        </div>
      `;
      
      if (encounterArea) {
        encounterArea.innerHTML = specialHTML;
      }
      
      speak('Your egg hatched into stardust! You have caught all Pokemon!');
    }
  }
  
  renderEggs();
  save(); // Important: Save progress after hatching
  console.log('=== EGG HATCHING COMPLETED ===');
}

function renderEggs() {
  if (state.eggs.length === 0) {
    eggsBar.innerHTML = '';
    return;
  }
  
  eggsBar.innerHTML = state.eggs.map(egg => `
    <span class="egg" onclick="checkEgg(${egg.id})" title="Progress: ${Math.round(egg.progress)}%">
      🥚
    </span>
  `).join('');
}

function checkEgg(eggId) {
  const egg = state.eggs.find(e => e.id === eggId);
  if (!egg) return;
  
  const timeLeft = Math.max(0, egg.hatchTime - Date.now());
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  
  if (timeLeft > 0) {
    feedbackEl.innerHTML = `<span class="hint">Egg will hatch in ${minutes}:${seconds.toString().padStart(2, '0')}</span>`;
  } else {
    feedbackEl.innerHTML = `<span class="success">Egg is ready to hatch!</span>`;
  }
}

// ========== UTILITY FUNCTIONS ==========
function quitToMenu() {
  showScreen('menu');
  save();
}

function showHint() {
  if (!state.hints || !currentQuestion) return;
  
  let hint = '';
  
  switch (currentQuestion.type) {
    case 'numbers':
      hint = `The number ${currentQuestion.number} starts with "${currentQuestion.answer.charAt(0)}"`;
      break;
    case 'reading':
      hint = `The word starts with "${currentQuestion.answer.charAt(0)}"`;
      break;
    case 'math':
      if (currentQuestion.operation === 'addition') {
        hint = `Try counting up from ${currentQuestion.num1}`;
      } else {
        hint = `Try counting down from ${currentQuestion.num1}`;
      }
      break;
    case 'time':
      hint = `Look at where the hour hand points`;
      break;
    case 'science':
      hint = `Think about what you know about ${currentQuestion.animal || 'this topic'}`;
      break;
  }
  
  feedbackEl.innerHTML = `<span class="hint">💡 ${hint}</span>`;
  speak(hint);
}

// Test function for debugging - call from browser console or button
function testPokemonEncounter() {
  console.log('=== TESTING POKEMON ENCOUNTER ===');
  console.log('Current state:');
  console.log('- Streak:', state.streak);
  console.log('- Total correct:', state.correctTotal);
  console.log('- Collection size:', state.collection.length);
  console.log('- Creatures available:', creatures.length);
  
  // Clear encounter area
  encounterArea.innerHTML = '';
  
  // Force a Pokemon encounter
  console.log('Forcing Pokemon encounter...');
  catchPokemon();
  
  console.log('=== TESTING EGG GENERATION ===');
  // Test egg generation
  generateEgg();
  console.log('Generated egg, current eggs:', state.eggs.length);
  
  return 'Pokemon encounter and egg test completed - check the encounter area and eggs bar';
}

// Test egg hatching specifically
function testEggHatching() {
  console.log('=== TESTING EGG HATCHING ===');
  
  // Create a quick-hatch egg for testing
  const testEgg = {
    id: Date.now() + 999,
    type: 'common',
    hatchTime: Date.now() + 5000, // 5 seconds
    progress: 0
  };
  
  state.eggs.push(testEgg);
  renderEggs();
  console.log('Created test egg that will hatch in 5 seconds');
  
  return 'Test egg created - it will hatch in 5 seconds!';
}

// Debug function to check game state
function debugGameState() {
  console.log('=== GAME STATE DEBUG ===');
  console.log('Collection size:', state.collection.length);
  console.log('Collection:', state.collection);
  console.log('Creatures array available:', creatures ? creatures.length : 'NO');
  console.log('Eggs:', state.eggs.length);
  console.log('Current streak:', state.streak);
  console.log('Total correct:', state.correctTotal);
  console.log('encounterArea element:', document.getElementById('encounterArea'));
  console.log('collectionBar element:', document.getElementById('collectionBar'));
  
  // Force update collection bar
  updateCollectionBar();
  
  return 'Debug info logged to console';
}

// Force a Pokemon encounter regardless of conditions
function forceEncounter() {
  console.log('=== FORCING POKEMON ENCOUNTER ===');
  // Temporarily clear collection to ensure we have available Pokemon
  const originalCollection = [...state.collection];
  if (state.collection.length > 145) {
    console.log('Collection nearly full, temporarily resetting for test');
    state.collection = [];
  }
  
  catchPokemon();
  
  // If we temporarily cleared it, restore original but add the new Pokemon
  if (originalCollection.length > 145) {
    state.collection = [...originalCollection];
    updateCollectionBar();
  }
  
  return 'Forced encounter completed';
}

// Make test functions available globally
window.testPokemonEncounter = testPokemonEncounter;
window.testEggHatching = testEggHatching;
window.debugGameState = debugGameState;
window.forceEncounter = forceEncounter;

// Make Team Rocket functions available globally (defined in ui-screens.js)
window.startRocketBattle = window.startRocketBattle || function() {
  console.log('Team Rocket function not yet loaded - will be available after ui-screens.js loads');
};
