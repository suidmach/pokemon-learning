// ========== UI AND SCREENS MANAGEMENT ==========

// ========== ANALYTICS AND PROGRESS ==========
function renderAnalytics() {
  const analyticsContent = document.getElementById('analyticsContent');
  
  const totalQuestions = state.correctTotal + Object.values(state.mistakes).reduce((a, b) => a + b, 0);
  const accuracy = totalQuestions > 0 ? Math.round((state.correctTotal / totalQuestions) * 100) : 0;
  
  const recentActivity = getRecentActivity();
  const topMistakes = getTopMistakes();
  const progressByMode = getProgressByMode();
  
  analyticsContent.innerHTML = `
    <div class="analytics-grid">
      <div class="stat-card">
        <h4>📊 Overall Stats</h4>
        <div class="stat-row">
          <span>Total Correct:</span>
          <span class="stat-value">${state.correctTotal}</span>
        </div>
        <div class="stat-row">
          <span>Accuracy:</span>
          <span class="stat-value">${accuracy}%</span>
        </div>
        <div class="stat-row">
          <span>Best Streak:</span>
          <span class="stat-value">${Math.max(state.streak, ...Object.values(state.milestones))}</span>
        </div>
        <div class="stat-row">
          <span>Current Grade:</span>
          <span class="stat-value">Grade ${state.gradeLevel}</span>
        </div>
      </div>
      
      <div class="stat-card">
        <h4>🎮 Game Progress</h4>
        <div class="stat-row">
          <span>Pokémon Caught:</span>
          <span class="stat-value">${state.collection.length}/151</span>
        </div>
        <div class="stat-row">
          <span>Numbers Mastered:</span>
          <span class="stat-value">${state.mastered.length}</span>
        </div>
        <div class="stat-row">
          <span>Eggs Hatched:</span>
          <span class="stat-value">${state.hatched.length}</span>
        </div>
        <div class="stat-row">
          <span>Rocket Victories:</span>
          <span class="stat-value">${state.rocketWins}</span>
        </div>
      </div>
      
      <div class="stat-card">
        <h4>📚 Learning Areas</h4>
        <div class="progress-area">
          <div class="progress-item">
            <span>Numbers: ${state.correctTotal}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${Math.min(100, (state.correctTotal / 50) * 100)}%"></div>
            </div>
          </div>
          <div class="progress-item">
            <span>Reading: ${state.readingTotal}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${Math.min(100, (state.readingTotal / 50) * 100)}%"></div>
            </div>
          </div>
          <div class="progress-item">
            <span>Math: ${state.mathTotal}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${Math.min(100, (state.mathTotal / 50) * 100)}%"></div>
            </div>
          </div>
          <div class="progress-item">
            <span>Time: ${state.timeTotal}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${Math.min(100, (state.timeTotal / 20) * 100)}%"></div>
            </div>
          </div>
          <div class="progress-item">
            <span>Science: ${state.scienceTotal}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${Math.min(100, (state.scienceTotal / 30) * 100)}%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <h4>🏆 Achievements</h4>
        <div class="achievements-display">
          ${Object.keys(state.achievementsUnlocked).length > 0 
            ? Object.keys(state.achievementsUnlocked).map(id => {
                const achievement = achievements[id];
                return `<div class="achievement-item">🏆 ${achievement.name}</div>`;
              }).join('')
            : '<div class="no-achievements">No achievements yet!</div>'
          }
        </div>
      </div>
      
      ${topMistakes.length > 0 ? `
        <div class="stat-card">
          <h4>📝 Areas to Practice</h4>
          <div class="mistakes-list">
            ${topMistakes.map(([item, count]) => `
              <div class="mistake-item">
                <span>${item}</span>
                <span class="mistake-count">${count} mistakes</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  // Update settings toggles
  document.getElementById('soundToggle').checked = state.sound;
  document.getElementById('hintsToggle').checked = state.hints;
}

function getRecentActivity() {
  // This would track recent activity - simplified for now
  return [];
}

function getTopMistakes() {
  const allMistakes = [
    ...Object.entries(state.mistakes),
    ...Object.entries(state.readingMistakes),
    ...Object.entries(state.mathMistakes),
    ...Object.entries(state.timeMistakes),
    ...Object.entries(state.scienceMistakes)
  ];
  
  return allMistakes
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function getProgressByMode() {
  return {
    numbers: state.correctTotal,
    reading: state.readingTotal,
    math: state.mathTotal,
    time: state.timeTotal,
    science: state.scienceTotal
  };
}

// ========== PROGRESS MAP ==========
function renderProgressMap() {
  const mapGrid = document.getElementById('mapGrid');
  const gradeContent = getGradeContent();
  
  mapGrid.innerHTML = '';
  
  for (let i = gradeContent.numbers.min; i <= gradeContent.numbers.max; i++) {
    const item = document.createElement('div');
    item.className = 'map-item';
    item.textContent = i;
    
    if (state.mastered.includes(i)) {
      item.classList.add('completed');
    } else if (state.mistakes[i]) {
      item.classList.add('partial');
    } else {
      item.classList.add('locked');
    }
    
    // Add click handler for practice
    item.onclick = () => practiceNumber(i);
    
    mapGrid.appendChild(item);
  }
}

function practiceNumber(number) {
  // Quick practice mode for specific number
  showScreen('game');
  
  currentQuestion = {
    type: 'numbers',
    number: number,
    answer: numberToWords(number).toLowerCase()
  };

  questionEl.textContent = `Practice: How do you spell ${number}?`;
  speak(`How do you spell ${number}?`);

  const options = generateSpellingOptions(number);
  createOptionsButtons(options, currentQuestion.answer);
  
  updateStats();
}

// ========== POKEDEX ==========
function renderPokedex() {
  const dexGrid = document.getElementById('dexGrid');
  const progress = document.getElementById('dexProgress');
  
  // Verify creatures data is loaded
  if (!creatures || creatures.length === 0) {
    console.error('ERROR: creatures array not loaded for Pokedex!');
    dexGrid.innerHTML = `
      <div class="error-message">
        <div>❌ Pokemon data not loaded!</div>
        <div class="small">Please refresh the page and try again.</div>
      </div>
    `;
    progress.textContent = 'Error loading Pokemon data';
    return;
  }
  
  progress.textContent = `${state.collection.length} / ${creatures.length} caught`;
  
  dexGrid.innerHTML = creatures.map((creature, index) => {
    const caught = state.collection.includes(creature.name);
    const isShinyVersion = state.collection.includes(`Shiny ${creature.name}`);
    
    return `
      <div class="dex-item ${caught ? 'caught' : ''} ${creature.rarity === 'legendary' ? 'legendary' : ''} ${isShinyVersion ? 'shiny' : ''}"
           onclick="showPokemonDetails('${creature.name}')">
        <div class="dex-pokemon">${caught ? creature.emoji : '❓'}</div>
        <div class="dex-name">${caught ? creature.name : '???'}</div>
        <div class="dex-number">#${index + 1}</div>
        ${caught ? `<div class="dex-type">${creature.type}</div>` : ''}
        ${isShinyVersion ? '<div class="shiny-indicator">✨</div>' : ''}
      </div>
    `;
  }).join('');
}

function showPokemonDetails(pokemonName) {
  const pokemon = creatures.find(p => p.name === pokemonName);
  const caught = state.collection.includes(pokemonName);
  
  if (!caught) {
    feedbackEl.innerHTML = '<span class="hint">Catch this Pokémon first to see details!</span>';
    return;
  }
  
  const detailsModal = document.createElement('div');
  detailsModal.className = 'pokemon-details-modal';
  detailsModal.innerHTML = `
    <div class="pokemon-details">
      <div class="pokemon-header">
        <span class="pokemon-emoji">${pokemon.emoji}</span>
        <h3>${pokemon.name}</h3>
        <button class="close-details" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="pokemon-info">
        <div><strong>Type:</strong> ${pokemon.type}</div>
        <div><strong>Rarity:</strong> ${pokemon.rarity}</div>
        <div><strong>Description:</strong> ${pokemon.description}</div>
        ${canEvolve(pokemonName) ? `<div><strong>Evolves to:</strong> ${getEvolution(pokemonName)}</div>` : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(detailsModal);
  
  // Close modal when clicking outside
  detailsModal.onclick = (e) => {
    if (e.target === detailsModal) {
      detailsModal.remove();
    }
  };
}

// ========== TEAM ROCKET BATTLE SYSTEM ==========
let rocketBattleState = {
  currentBattle: 0,
  questionsCorrect: 0,
  questionsTotal: 0,
  battleActive: false
};

function startRocketBattle() {
  if (state.collection.length < 5) {
    feedbackEl.innerHTML = '<span class="hint">You need at least 5 Pokémon to battle Team Rocket!</span>';
    return;
  }
  
  rocketBattleState = {
    currentBattle: 0,
    questionsCorrect: 0,
    questionsTotal: 0,
    battleActive: true
  };
  
  showScreen('rocketBattle');
  nextRocketQuestion();
}

function nextRocketQuestion() {
  if (rocketBattleState.questionsCorrect >= 3) {
    winRocketBattle();
    return;
  }
  
  if (rocketBattleState.questionsTotal - rocketBattleState.questionsCorrect >= 3) {
    loseRocketBattle();
    return;
  }
  
  // Generate a harder question for rocket battle
  const gradeContent = getGradeContent();
  const questionTypes = ['numbers', 'reading', 'math'];
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  switch (questionType) {
    case 'numbers':
      generateRocketNumberQuestion(gradeContent);
      break;
    case 'reading':
      generateRocketReadingQuestion(gradeContent);
      break;
    case 'math':
      generateRocketMathQuestion(gradeContent);
      break;
  }
  
  updateRocketProgress();
}

function generateRocketNumberQuestion(gradeContent) {
  // Use higher numbers for rocket battles
  const { min, max } = gradeContent.numbers;
  const number = Math.floor(Math.random() * (max - min + 1)) + Math.floor(max * 0.7);
  
  currentQuestion = {
    type: 'rocket_numbers',
    number: number,
    answer: numberToWords(number).toLowerCase()
  };

  document.getElementById('rocketQuestion').textContent = `Team Rocket challenges you: Spell ${number}!`;
  speak(`Team Rocket wants you to spell ${number}!`);

  const options = generateSpellingOptions(number);
  createRocketOptionsButtons(options, currentQuestion.answer);
}

function generateRocketReadingQuestion(gradeContent) {
  const words = [...gradeContent.readingWords, ...gradeContent.sightWords];
  const word = words[Math.floor(Math.random() * words.length)];
  
  currentQuestion = {
    type: 'rocket_reading',
    word: word,
    answer: word.toLowerCase()
  };

  document.getElementById('rocketQuestion').textContent = `Spell this word: ${word}`;
  speak(`Spell the word ${word}`);

  const wrongOptions = generateWrongSpellings(word);
  const options = [word, ...wrongOptions].sort(() => Math.random() - 0.5);
  createRocketOptionsButtons(options, word);
}

function generateRocketMathQuestion(gradeContent) {
  const { max1, max2, maxSum } = gradeContent.addition;
  
  let num1, num2;
  do {
    num1 = Math.floor(Math.random() * max1) + Math.floor(max1 * 0.5);
    num2 = Math.floor(Math.random() * max2) + Math.floor(max2 * 0.5);
  } while (num1 + num2 > maxSum);

  const answer = num1 + num2;
  
  currentQuestion = {
    type: 'rocket_math',
    operation: 'addition',
    num1: num1,
    num2: num2,
    answer: answer
  };

  document.getElementById('rocketQuestion').innerHTML = `
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
  createRocketOptionsButtons(options, answer);
}

function createRocketOptionsButtons(options, correctAnswer) {
  const rocketOptions = document.getElementById('rocketOptions');
  rocketOptions.innerHTML = '';
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => submitRocketAnswer(option);
    rocketOptions.appendChild(button);
  });
}

function submitRocketAnswer(answer) {
  const isCorrect = checkAnswer(answer);
  rocketBattleState.questionsTotal++;
  
  if (isCorrect) {
    rocketBattleState.questionsCorrect++;
    document.getElementById('rocketFeedback').innerHTML = '<span class="success">✅ Correct! Team Rocket is weakening!</span>';
    speak('Correct! Team Rocket is getting weaker!');
  } else {
    document.getElementById('rocketFeedback').innerHTML = `<span class="error">❌ Wrong! The answer was: ${currentQuestion.answer}</span>`;
    speak(`Wrong! The answer was ${currentQuestion.answer}`);
  }
  
  updateRocketProgress();
  
  setTimeout(() => {
    nextRocketQuestion();
  }, 2000);
}

function updateRocketProgress() {
  document.getElementById('rocketProgress').textContent = `${rocketBattleState.questionsCorrect}/3`;
}

function winRocketBattle() {
  state.rocketWins++;
  
  // Award stolen Pokemon back and give bonus Pokemon
  const bonusPokemon = getRandomPokemon('rare');
  state.collection.push(bonusPokemon.name);
  
  // Return any stolen Pokemon
  state.collection.push(...state.stolen);
  state.stolen = [];
  
  showScreen('victory');
  document.getElementById('victoryMessage').textContent = 'You defeated Team Rocket!';
  document.getElementById('victoryRewards').innerHTML = `
    <div class="victory-reward">
      <div class="pokemon-reward">${bonusPokemon.emoji}</div>
      <div>You caught ${bonusPokemon.name}!</div>
      <div class="small">All stolen Pokémon have been returned!</div>
    </div>
  `;
  
  speak(`You defeated Team Rocket and caught ${bonusPokemon.name}!`);
  updateCollectionBar();
  checkAchievements();
  save();
}

function loseRocketBattle() {
  // Team Rocket steals a random Pokemon
  if (state.collection.length > 0) {
    const stolenIndex = Math.floor(Math.random() * state.collection.length);
    const stolenPokemon = state.collection.splice(stolenIndex, 1)[0];
    state.stolen.push(stolenPokemon);
    
    feedbackEl.innerHTML = `<span class="error">Team Rocket stole your ${stolenPokemon}! Train harder and try again!</span>`;
    speak(`Team Rocket stole your ${stolenPokemon}! Train harder and battle them again!`);
  }
  
  rocketBattleState.battleActive = false;
  showScreen('game');
  updateCollectionBar();
  save();
}

function forfeitRocketBattle() {
  rocketBattleState.battleActive = false;
  showScreen('game');
}

// ========== EVENT HANDLERS AND INITIALIZATION ==========
function updateModeButtons() {
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(state.gameMode + 'Mode').classList.add('active');
}

function updateGradeButtons() {
  document.querySelectorAll('.grade-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`grade${state.gradeLevel}`).classList.add('active');
  
  const gradeDescriptions = {
    1: 'Grade 1: Numbers 1-20, simple addition, basic sight words, telling time to the hour',
    2: 'Grade 2: Numbers 1-50, addition to 50, more sight words, half past and quarter past',
    3: 'Grade 3: Numbers 1-100, addition to 100, longer words, digital time and schedules',
    4: 'Grade 4: Numbers 1-150, addition to 150, complex words, time zones and calendars',
    5: 'Grade 5: Numbers 1-200, addition to 200, advanced vocabulary, time calculations',
    6: 'Grade 6: Numbers 1-200, advanced math, complex reading, world time and science'
  };
  
  document.getElementById('gradeDescription').textContent = gradeDescriptions[state.gradeLevel];
}

// ========== SPECIAL EVENTS AND RANDOM ENCOUNTERS ==========
function triggerSpecialEvent() {
  const events = ['rocketBattle', 'legendaryEncounter', 'eggFind', 'evolution'];
  const event = events[Math.floor(Math.random() * events.length)];
  
  switch (event) {
    case 'rocketBattle':
      if (Math.random() < 0.1 && state.collection.length >= 5) { // 10% chance
        setTimeout(() => {
          if (confirm('Team Rocket appeared! Do you want to battle them?')) {
            startRocketBattle();
          }
        }, 1000);
      }
      break;
      
    case 'legendaryEncounter':
      if (state.streak >= 30 && Math.random() < 0.05) { // 5% chance with high streak
        const legendary = getPokemonByRarity('legendary');
        const pokemon = legendary[Math.floor(Math.random() * legendary.length)];
        
        if (!state.collection.includes(pokemon.name)) {
          state.collection.push(pokemon.name);
          encounterArea.innerHTML = `
            <div class="legendary-encounter">
              <div class="legendary-pokemon">${pokemon.emoji}</div>
              <div>🌟 LEGENDARY ENCOUNTER! 🌟</div>
              <div>You found ${pokemon.name}!</div>
            </div>
          `;
          speak(`Legendary encounter! You found ${pokemon.name}!`);
          updateCollectionBar();
        }
      }
      break;
      
    case 'eggFind':
      if (Math.random() < 0.15 && state.eggs.length < 6) { // 15% chance
        generateEgg();
        encounterArea.innerHTML = `
          <div class="egg-find">
            <div>🥚 You found a mysterious egg!</div>
            <div class="small">It will hatch soon...</div>
          </div>
        `;
        speak('You found a mysterious egg!');
      }
      break;
      
    case 'evolution':
      // Check for evolution opportunities
      const evolvablePokemon = state.collection.filter(name => canEvolve(name));
      if (evolvablePokemon.length > 0 && Math.random() < 0.1) {
        const pokemonToEvolve = evolvablePokemon[Math.floor(Math.random() * evolvablePokemon.length)];
        const evolution = getEvolution(pokemonToEvolve);
        
        if (!state.collection.includes(evolution)) {
          state.collection.push(evolution);
          encounterArea.innerHTML = `
            <div class="evolution-event">
              <div>✨ ${pokemonToEvolve} evolved into ${evolution}! ✨</div>
            </div>
          `;
          speak(`${pokemonToEvolve} evolved into ${evolution}!`);
          updateCollectionBar();
        }
      }
      break;
  }
}

// Call special events occasionally
setInterval(() => {
  if (document.getElementById('game').style.display !== 'none') {
    triggerSpecialEvent();
  }
}, 30000); // Check every 30 seconds

// Export functions to global scope for HTML onclick handlers
window.checkEgg = checkEgg;
window.showPokemonDetails = showPokemonDetails;
window.practiceNumber = practiceNumber;
window.startRocketBattle = startRocketBattle;
