// ========== CONTENT AND QUESTIONS DATA ==========

// Grade-level content definitions
const gradeLevelContent = {
  1: { // Grade 1 (ages 6-7)
    numbers: { min: 1, max: 20 },
    addition: { max1: 10, max2: 10, maxSum: 20 },
    subtraction: { minStart: 5, maxStart: 20, maxSub: 10 },
    readingWords: ['cat', 'dog', 'run', 'big', 'red', 'sun', 'hat', 'mat', 'bat', 'sit'],
    sightWords: ['the', 'and', 'to', 'a', 'I', 'you', 'it', 'in', 'said', 'for'],
    timeSkills: ['hour', 'o\'clock', 'morning', 'night'],
    scienceTopics: ['animals', 'weather']
  },
  2: { // Grade 2 (ages 7-8)
    numbers: { min: 1, max: 50 },
    addition: { max1: 25, max2: 25, maxSum: 50 },
    subtraction: { minStart: 10, maxStart: 50, maxSub: 25 },
    readingWords: ['jump', 'swim', 'play', 'happy', 'truck', 'clock', 'smile', 'green', 'snake', 'bread'],
    sightWords: ['up', 'look', 'is', 'go', 'we', 'little', 'down', 'can', 'see', 'not'],
    timeSkills: ['half past', 'quarter past', 'minutes'],
    scienceTopics: ['animals', 'weather', 'seasons']
  },
  3: { // Grade 3 (ages 8-9)
    numbers: { min: 1, max: 100 },
    addition: { max1: 50, max2: 50, maxSum: 100 },
    subtraction: { minStart: 20, maxStart: 100, maxSub: 50 },
    readingWords: ['chair', 'plant', 'beach', 'sheep', 'brown', 'quick', 'earth', 'light', 'friend', 'school'],
    sightWords: ['one', 'my', 'me', 'big', 'come', 'blue', 'red', 'where', 'jump', 'away'],
    timeSkills: ['digital time', 'elapsed time', 'schedule'],
    scienceTopics: ['animals', 'weather', 'seasons', 'habitats']
  },
  4: { // Grade 4 (ages 9-10)
    numbers: { min: 1, max: 150 },
    addition: { max1: 75, max2: 75, maxSum: 150 },
    subtraction: { minStart: 30, maxStart: 150, maxSub: 75 },
    readingWords: ['elephant', 'butterfly', 'rainbow', 'adventure', 'beautiful', 'computer', 'telephone', 'important'],
    sightWords: ['here', 'help', 'make', 'yellow', 'two', 'play', 'run', 'find', 'three', 'funny'],
    timeSkills: ['time zones', 'calendar', 'duration'],
    scienceTopics: ['animals', 'weather', 'seasons', 'habitats', 'life cycles']
  },
  5: { // Grade 5 (ages 10-11)
    numbers: { min: 1, max: 200 },
    addition: { max1: 99, max2: 99, maxSum: 200 },
    subtraction: { minStart: 50, maxStart: 200, maxSub: 99 },
    readingWords: ['dinosaur', 'umbrella', 'basketball', 'chocolate', 'helicopter', 'photograph', 'restaurant', 'community'],
    sightWords: ['because', 'through', 'before', 'around', 'another', 'between', 'different', 'important'],
    timeSkills: ['time conversion', 'time problems', 'schedules'],
    scienceTopics: ['animals', 'weather', 'seasons', 'habitats', 'life cycles', 'simple machines']
  },
  6: { // Grade 6 (ages 11-12)
    numbers: { min: 1, max: 200 },
    addition: { max1: 99, max2: 99, maxSum: 200 },
    subtraction: { minStart: 50, maxStart: 200, maxSub: 99 },
    readingWords: ['magnificent', 'extraordinary', 'encyclopedia', 'responsibility', 'environment', 'opportunity', 'understanding', 'imagination'],
    sightWords: ['although', 'however', 'therefore', 'meanwhile', 'especially', 'immediately', 'throughout', 'particular'],
    timeSkills: ['complex schedules', 'time calculations', 'world time'],
    scienceTopics: ['animals', 'weather', 'seasons', 'habitats', 'life cycles', 'simple machines', 'solar system']
  }
};

function getGradeContent() {
  return gradeLevelContent[state.gradeLevel] || gradeLevelContent[1];
}

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
    { name: 'bee', habitat: 'hive', sound: 'buzz', fact: 'makes honey' },
    { name: 'lion', habitat: 'savanna', sound: 'roar', fact: 'king of the jungle' },
    { name: 'penguin', habitat: 'antarctica', sound: 'squawk', fact: 'cannot fly but swims well' },
    { name: 'butterfly', habitat: 'garden', sound: 'silent', fact: 'starts as a caterpillar' },
    { name: 'shark', habitat: 'ocean', sound: 'silent', fact: 'has many teeth' },
    { name: 'bear', habitat: 'forest', sound: 'growl', fact: 'hibernates in winter' }
  ],
  weather: ['sunny', 'rainy', 'cloudy', 'snowy', 'windy', 'stormy'],
  seasons: ['spring', 'summer', 'fall', 'winter'],
  plants: ['tree', 'flower', 'grass', 'bush', 'vine']
};

// Reading word lists for different skill levels
const readingWords = {
  simple: ['cat', 'dog', 'run', 'big', 'red', 'sun', 'hat', 'mat', 'bat', 'sit'],
  medium: ['jump', 'swim', 'play', 'happy', 'truck', 'clock', 'smile', 'green', 'snake', 'bread'],
  hard: ['chair', 'plant', 'beach', 'sheep', 'brown', 'quick', 'earth', 'light', 'friend', 'school']
};

const sightWords = ['the', 'and', 'to', 'a', 'I', 'you', 'it', 'in', 'said', 'for', 'up', 'look', 'is', 'go', 'we'];

const rhymingPairs = {
  'cat': ['bat', 'hat', 'mat', 'rat'],
  'dog': ['log', 'fog', 'hog', 'jog'],
  'sun': ['run', 'fun', 'bun', 'gun'],
  'tree': ['bee', 'see', 'free', 'knee'],
  'cake': ['make', 'take', 'lake', 'wake'],
  'ball': ['call', 'fall', 'tall', 'wall']
};

// Enhanced achievements for new content
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
  'perfect_session': { name: 'Perfect Session', description: 'Got 20 math problems right without a mistake' },
  'time_master': { name: 'Time Master', description: 'Learned to read 20 different times' },
  'nature_explorer': { name: 'Nature Explorer', description: 'Identified 15 animals correctly' },
  'weather_watcher': { name: 'Weather Watcher', description: 'Mastered weather vocabulary' },
  'daily_scheduler': { name: 'Daily Scheduler', description: 'Matched 10 activities to correct times' },
  'science_student': { name: 'Science Student', description: 'Completed 25 science questions' },
  'pattern_detective': { name: 'Pattern Detective', description: 'Solved 15 sequence puzzles' }
};

// ========== QUESTION HELPER FUNCTIONS ==========
function generateSpellingOptions(number) {
  const correct = numberToWords(number).toLowerCase();
  const options = [correct];
  
  // Generate wrong options by common mistakes
  const wrongOptions = [];
  
  // Common misspellings
  if (number <= 20) {
    const commonMistakes = {
      1: ['wun', 'wan'],
      2: ['too', 'to'],
      3: ['tree', 'thee'],
      4: ['for', 'fore'],
      5: ['fiv', 'fyve'],
      6: ['siks', 'sixx'],
      7: ['sevn', 'sevan'],
      8: ['ate', 'eigt'],
      9: ['nyne', 'nin'],
      10: ['ten', 'tan'],
      11: ['elevan', 'elvn'],
      12: ['twelv', 'twelf'],
      13: ['thirten', 'therten'],
      14: ['forteen', 'fourten'],
      15: ['fiften', 'fivteen'],
      16: ['sikteen', 'sixten'],
      17: ['seventen', 'seventn'],
      18: ['eiteen', 'eighteen'],
      19: ['ninteen', 'nineteen'],
      20: ['tweny', 'twentie']
    };
    
    if (commonMistakes[number]) {
      wrongOptions.push(...commonMistakes[number]);
    }
  }
  
  // Fill remaining slots with variations
  while (wrongOptions.length < 3) {
    const variation = createSpellingVariation(correct);
    if (!wrongOptions.includes(variation) && variation !== correct) {
      wrongOptions.push(variation);
    }
  }
  
  return [correct, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
}

function createSpellingVariation(word) {
  const variations = [
    word.replace(/y$/, 'ie'),
    word.replace(/ty$/, 'tey'),
    word.replace(/teen$/, 'ten'),
    word.replace(/th/, 'th'),
    word.replace(/f/, 'ph'),
    word.replace(/v/, 'f'),
    word + 'e'
  ];
  
  return variations[Math.floor(Math.random() * variations.length)];
}

function generateWrongSpellings(word) {
  const wrong = [];
  
  // Common mistakes
  wrong.push(word.replace(/c/g, 'k'));
  wrong.push(word.replace(/ph/g, 'f'));
  wrong.push(word.replace(/y$/g, 'ie'));
  wrong.push(word.slice(0, -1) + (word.slice(-1) === 'e' ? '' : 'e'));
  
  // Double letters
  if (word.length > 3) {
    const pos = Math.floor(word.length / 2);
    wrong.push(word.slice(0, pos) + word[pos] + word.slice(pos));
  }
  
  return wrong.filter(w => w !== word).slice(0, 3);
}

function generateMeaningQuestion(word) {
  // Simplified meaning questions for demo
  const meanings = {
    'cat': 'a small furry pet',
    'dog': 'a loyal pet that barks',
    'run': 'to move quickly',
    'big': 'very large',
    'red': 'the color of fire',
    'sun': 'the bright star in the sky'
  };
  
  currentQuestion = {
    type: 'reading',
    word: word,
    answer: meanings[word] || 'a word'
  };
  
  questionEl.textContent = `What does "${word}" mean?`;
  speak(`What does ${word} mean?`);
  
  const wrongMeanings = [
    'a type of food',
    'something cold',
    'a number',
    'a place to live'
  ];
  
  const options = [meanings[word] || 'a word', ...wrongMeanings.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, meanings[word] || 'a word');
}

function generateRhymeQuestion(word) {
  const rhymes = rhymingPairs[word];
  if (!rhymes) {
    generateSpellingQuestion(word); // Fallback
    return;
  }
  
  const correctRhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
  
  currentQuestion = {
    type: 'reading',
    word: word,
    answer: correctRhyme
  };
  
  questionEl.textContent = `Which word rhymes with "${word}"?`;
  speak(`Which word rhymes with ${word}?`);
  
  const nonRhymes = ['book', 'chair', 'happy', 'green'].filter(w => !rhymes.includes(w));
  const options = [correctRhyme, ...nonRhymes.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, correctRhyme);
}

function generateCompletionQuestion(word) {
  const incomplete = word.slice(0, -2) + '__';
  
  currentQuestion = {
    type: 'reading',
    word: word,
    answer: word.slice(-2)
  };
  
  questionEl.textContent = `Complete the word: ${incomplete}`;
  speak(`Complete the word ${incomplete}`);
  
  const endings = ['ly', 'er', 'ed', 'ing', 'le', 'al'];
  const wrongEndings = endings.filter(e => e !== word.slice(-2)).slice(0, 3);
  const options = [word.slice(-2), ...wrongEndings].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, word.slice(-2));
}

function generateTimeReadingQuestion() {
  const times = ['9:30', '2:15', '11:45', '6:00', '4:30', '8:15'];
  const timeString = times[Math.floor(Math.random() * times.length)];
  
  currentQuestion = {
    type: 'time',
    answer: timeString
  };
  
  questionEl.innerHTML = `
    <div class="time-sequence">${timeString}</div>
    <div>What time is this?</div>
  `;
  
  speak(`What time is ${timeString}?`);
  
  const wrongTimes = [
    timeString.replace(/30/, '15'),
    timeString.replace(/15/, '45'),
    timeString.replace(/00/, '30')
  ].filter(t => t !== timeString);
  
  const options = [timeString, ...wrongTimes.slice(0, 3)].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, timeString);
}

function generateTimeVocabularyQuestion() {
  const concepts = [
    { question: 'When do you eat breakfast?', answer: 'morning', options: ['morning', 'afternoon', 'evening', 'night'] },
    { question: 'When do you go to bed?', answer: 'night', options: ['morning', 'afternoon', 'evening', 'night'] },
    { question: 'When do you eat lunch?', answer: 'afternoon', options: ['morning', 'afternoon', 'evening', 'night'] },
    { question: 'How many minutes in an hour?', answer: '60', options: ['60', '30', '24', '100'] }
  ];
  
  const concept = concepts[Math.floor(Math.random() * concepts.length)];
  
  currentQuestion = {
    type: 'time',
    answer: concept.answer
  };
  
  questionEl.textContent = concept.question;
  speak(concept.question);
  
  createOptionsButtons(concept.options, concept.answer);
}

function generateWeatherQuestion() {
  const weather = scienceContent.weather[Math.floor(Math.random() * scienceContent.weather.length)];
  
  const weatherDescriptions = {
    'sunny': 'bright and warm',
    'rainy': 'water falling from clouds',
    'cloudy': 'sky covered with clouds',
    'snowy': 'white flakes falling',
    'windy': 'air moving fast',
    'stormy': 'thunder and lightning'
  };
  
  currentQuestion = {
    type: 'science',
    answer: weather
  };
  
  questionEl.innerHTML = `
    <div class="weather-display">
      What weather is: ${weatherDescriptions[weather]}?
    </div>
  `;
  
  speak(`What weather is ${weatherDescriptions[weather]}?`);
  
  const otherWeather = scienceContent.weather.filter(w => w !== weather).slice(0, 3);
  const options = [weather, ...otherWeather].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, weather);
}

function generateSeasonQuestion() {
  const seasonActivities = {
    'spring': 'flowers bloom and it gets warmer',
    'summer': 'it is hot and sunny',
    'fall': 'leaves change colors and fall',
    'winter': 'it is cold and might snow'
  };
  
  const season = Object.keys(seasonActivities)[Math.floor(Math.random() * 4)];
  
  currentQuestion = {
    type: 'science',
    answer: season
  };
  
  questionEl.textContent = `In which season: ${seasonActivities[season]}?`;
  speak(`In which season ${seasonActivities[season]}?`);
  
  const otherSeasons = Object.keys(seasonActivities).filter(s => s !== season);
  const options = [season, ...otherSeasons].sort(() => Math.random() - 0.5);
  createOptionsButtons(options, season);
}

// ========== NUMBER TO WORDS CONVERSION ==========
function numberToWords(num) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
               'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 
               'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (num === 0) return 'zero';
  if (num < 20) return ones[num];
  if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '');
  }
  if (num < 200) {
    return 'one hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
  }
  if (num === 200) return 'two hundred';
  
  return num.toString(); // fallback
}
