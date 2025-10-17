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
    { name: 'bee', habitat: 'hive', sound: 'buzz', fact: 'makes honey' }
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

const MAX_NUM = 200;
const numbers = Array.from({length: MAX_NUM}, (_, i) => i + 1);

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

// Pokémon database with detailed information - Complete 151 Pokemon
const creatures = [
  { name: 'Bulbasaur', rarity: 'common', type: 'Grass', emoji: '🌱', description: 'A grass seed Pokémon' },
  { name: 'Ivysaur', rarity: 'uncommon', type: 'Grass', emoji: '🌿', description: 'An evolved grass Pokémon' },
  { name: 'Venusaur', rarity: 'rare', type: 'Grass', emoji: '🌺', description: 'A flower Pokémon with a large bloom' },
  { name: 'Charmander', rarity: 'common', type: 'Fire', emoji: '🔥', description: 'A fire lizard Pokémon' },
  { name: 'Charmeleon', rarity: 'uncommon', type: 'Fire', emoji: '🔥', description: 'A flame Pokémon' },
  { name: 'Charizard', rarity: 'rare', type: 'Fire', emoji: '🐲', description: 'A powerful fire dragon' },
  { name: 'Squirtle', rarity: 'common', type: 'Water', emoji: '🐢', description: 'A tiny turtle Pokémon' },
  { name: 'Wartortle', rarity: 'uncommon', type: 'Water', emoji: '🐢', description: 'A turtle Pokémon' },
  { name: 'Blastoise', rarity: 'rare', type: 'Water', emoji: '🌊', description: 'A water turtle with cannons' },
  { name: 'Caterpie', rarity: 'common', type: 'Bug', emoji: '🐛', description: 'A worm Pokémon' },
  { name: 'Metapod', rarity: 'common', type: 'Bug', emoji: '🛡️', description: 'A cocoon Pokémon' },
  { name: 'Butterfree', rarity: 'uncommon', type: 'Bug', emoji: '🦋', description: 'A butterfly Pokémon' },
  { name: 'Weedle', rarity: 'common', type: 'Bug', emoji: '🐛', description: 'A hairy bug Pokémon' },
  { name: 'Kakuna', rarity: 'common', type: 'Bug', emoji: '🛡️', description: 'A cocoon Pokémon' },
  { name: 'Beedrill', rarity: 'uncommon', type: 'Bug', emoji: '🐝', description: 'A poison bee Pokémon' },
  { name: 'Pidgey', rarity: 'common', type: 'Normal', emoji: '🐦', description: 'A tiny bird Pokémon' },
  { name: 'Pidgeotto', rarity: 'uncommon', type: 'Normal', emoji: '🦅', description: 'A bird Pokémon' },
  { name: 'Pidgeot', rarity: 'rare', type: 'Normal', emoji: '🦅', description: 'A bird of prey Pokémon' },
  { name: 'Rattata', rarity: 'common', type: 'Normal', emoji: '🐭', description: 'A rat Pokémon' },
  { name: 'Raticate', rarity: 'uncommon', type: 'Normal', emoji: '🐭', description: 'A rat Pokémon with big teeth' },
  { name: 'Spearow', rarity: 'common', type: 'Normal', emoji: '🐦', description: 'A tiny bird Pokémon' },
  { name: 'Fearow', rarity: 'uncommon', type: 'Normal', emoji: '🦅', description: 'A beak Pokémon' },
  { name: 'Ekans', rarity: 'common', type: 'Poison', emoji: '🐍', description: 'A snake Pokémon' },
  { name: 'Arbok', rarity: 'uncommon', type: 'Poison', emoji: '🐍', description: 'A cobra Pokémon' },
  { name: 'Pikachu', rarity: 'uncommon', type: 'Electric', emoji: '⚡', description: 'A friendly electric mouse' },
  { name: 'Raichu', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'A mouse Pokémon with electric cheeks' },
  { name: 'Sandshrew', rarity: 'common', type: 'Ground', emoji: '🏔️', description: 'A mouse Pokémon' },
  { name: 'Sandslash', rarity: 'uncommon', type: 'Ground', emoji: '🏔️', description: 'A mouse Pokémon with sharp claws' },
  { name: 'Nidoran♀', rarity: 'common', type: 'Poison', emoji: '💜', description: 'A poison pin Pokémon' },
  { name: 'Nidorina', rarity: 'uncommon', type: 'Poison', emoji: '💜', description: 'A poison pin Pokémon' },
  { name: 'Nidoqueen', rarity: 'rare', type: 'Poison', emoji: '💜', description: 'A drill Pokémon' },
  { name: 'Nidoran♂', rarity: 'common', type: 'Poison', emoji: '💙', description: 'A poison pin Pokémon' },
  { name: 'Nidorino', rarity: 'uncommon', type: 'Poison', emoji: '💙', description: 'A poison pin Pokémon' },
  { name: 'Nidoking', rarity: 'rare', type: 'Poison', emoji: '💙', description: 'A drill Pokémon' },
  { name: 'Clefairy', rarity: 'uncommon', type: 'Fairy', emoji: '🌙', description: 'A fairy Pokémon' },
  { name: 'Clefable', rarity: 'rare', type: 'Fairy', emoji: '🌙', description: 'A fairy Pokémon' },
  { name: 'Vulpix', rarity: 'uncommon', type: 'Fire', emoji: '🦊', description: 'A fox Pokémon' },
  { name: 'Ninetales', rarity: 'rare', type: 'Fire', emoji: '🦊', description: 'A fox Pokémon with nine tails' },
  { name: 'Jigglypuff', rarity: 'uncommon', type: 'Normal', emoji: '🎵', description: 'A balloon Pokémon' },
  { name: 'Wigglytuff', rarity: 'rare', type: 'Normal', emoji: '🎵', description: 'A balloon Pokémon' },
  { name: 'Zubat', rarity: 'common', type: 'Poison', emoji: '🦇', description: 'A bat Pokémon' },
  { name: 'Golbat', rarity: 'uncommon', type: 'Poison', emoji: '🦇', description: 'A bat Pokémon' },
  { name: 'Oddish', rarity: 'common', type: 'Grass', emoji: '🌿', description: 'A weed Pokémon' },
  { name: 'Gloom', rarity: 'uncommon', type: 'Grass', emoji: '🌿', description: 'A weed Pokémon' },
  { name: 'Vileplume', rarity: 'rare', type: 'Grass', emoji: '🌺', description: 'A flower Pokémon' },
  { name: 'Paras', rarity: 'common', type: 'Bug', emoji: '🍄', description: 'A mushroom Pokémon' },
  { name: 'Parasect', rarity: 'uncommon', type: 'Bug', emoji: '🍄', description: 'A mushroom Pokémon' },
  { name: 'Venonat', rarity: 'common', type: 'Bug', emoji: '🐛', description: 'An insect Pokémon' },
  { name: 'Venomoth', rarity: 'uncommon', type: 'Bug', emoji: '🦋', description: 'A poison moth Pokémon' },
  { name: 'Diglett', rarity: 'common', type: 'Ground', emoji: '🕳️', description: 'A mole Pokémon' },
  { name: 'Dugtrio', rarity: 'uncommon', type: 'Ground', emoji: '🕳️', description: 'A mole Pokémon' },
  { name: 'Meowth', rarity: 'uncommon', type: 'Normal', emoji: '🐱', description: 'A scratch cat Pokémon' },
  { name: 'Persian', rarity: 'rare', type: 'Normal', emoji: '🐱', description: 'A classy cat Pokémon' },
  { name: 'Psyduck', rarity: 'common', type: 'Water', emoji: '🦆', description: 'A duck Pokémon' },
  { name: 'Golduck', rarity: 'uncommon', type: 'Water', emoji: '🦆', description: 'A duck Pokémon' },
  { name: 'Mankey', rarity: 'common', type: 'Fighting', emoji: '🐒', description: 'A pig monkey Pokémon' },
  { name: 'Primeape', rarity: 'uncommon', type: 'Fighting', emoji: '🐒', description: 'A pig monkey Pokémon' },
  { name: 'Growlithe', rarity: 'uncommon', type: 'Fire', emoji: '🐕', description: 'A puppy Pokémon' },
  { name: 'Arcanine', rarity: 'rare', type: 'Fire', emoji: '🐕', description: 'A legendary Pokémon' },
  { name: 'Poliwag', rarity: 'common', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon' },
  { name: 'Poliwhirl', rarity: 'uncommon', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon' },
  { name: 'Poliwrath', rarity: 'rare', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon' },
  { name: 'Abra', rarity: 'uncommon', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon' },
  { name: 'Kadabra', rarity: 'rare', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon' },
  { name: 'Alakazam', rarity: 'rare', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon' },
  { name: 'Machop', rarity: 'common', type: 'Fighting', emoji: '💪', description: 'A superpower Pokémon' },
  { name: 'Machoke', rarity: 'uncommon', type: 'Fighting', emoji: '💪', description: 'A superpower Pokémon' },
  { name: 'Machamp', rarity: 'rare', type: 'Fighting', emoji: '💪', description: 'A four-armed fighter' },
  { name: 'Bellsprout', rarity: 'common', type: 'Grass', emoji: '🌱', description: 'A flower Pokémon' },
  { name: 'Weepinbell', rarity: 'uncommon', type: 'Grass', emoji: '🌱', description: 'A flycatcher Pokémon' },
  { name: 'Victreebel', rarity: 'rare', type: 'Grass', emoji: '🌱', description: 'A flycatcher Pokémon' },
  { name: 'Tentacool', rarity: 'common', type: 'Water', emoji: '🪼', description: 'A jellyfish Pokémon' },
  { name: 'Tentacruel', rarity: 'uncommon', type: 'Water', emoji: '🪼', description: 'A jellyfish Pokémon' },
  { name: 'Geodude', rarity: 'common', type: 'Rock', emoji: '🪨', description: 'A rock Pokémon' },
  { name: 'Graveler', rarity: 'uncommon', type: 'Rock', emoji: '🪨', description: 'A rock Pokémon' },
  { name: 'Golem', rarity: 'rare', type: 'Rock', emoji: '🪨', description: 'A megaton Pokémon' },
  { name: 'Ponyta', rarity: 'uncommon', type: 'Fire', emoji: '🐎', description: 'A fire horse Pokémon' },
  { name: 'Rapidash', rarity: 'rare', type: 'Fire', emoji: '🐎', description: 'A fire horse Pokémon' },
  { name: 'Slowpoke', rarity: 'common', type: 'Water', emoji: '🦥', description: 'A dopey Pokémon' },
  { name: 'Slowbro', rarity: 'uncommon', type: 'Water', emoji: '🦥', description: 'A hermit crab Pokémon' },
  { name: 'Magnemite', rarity: 'common', type: 'Electric', emoji: '🧲', description: 'A magnet Pokémon' },
  { name: 'Magneton', rarity: 'uncommon', type: 'Electric', emoji: '🧲', description: 'A magnet Pokémon' },
  { name: 'Farfetch\'d', rarity: 'rare', type: 'Normal', emoji: '🦆', description: 'A wild duck Pokémon' },
  { name: 'Doduo', rarity: 'common', type: 'Normal', emoji: '🦆', description: 'A twin bird Pokémon' },
  { name: 'Dodrio', rarity: 'uncommon', type: 'Normal', emoji: '🦆', description: 'A triple bird Pokémon' },
  { name: 'Seel', rarity: 'common', type: 'Water', emoji: '🦭', description: 'A sea lion Pokémon' },
  { name: 'Dewgong', rarity: 'uncommon', type: 'Water', emoji: '🦭', description: 'A sea lion Pokémon' },
  { name: 'Grimer', rarity: 'common', type: 'Poison', emoji: '💜', description: 'A sludge Pokémon' },
  { name: 'Muk', rarity: 'uncommon', type: 'Poison', emoji: '💜', description: 'A sludge Pokémon' },
  { name: 'Shellder', rarity: 'common', type: 'Water', emoji: '🐚', description: 'A bivalve Pokémon' },
  { name: 'Cloyster', rarity: 'uncommon', type: 'Water', emoji: '🐚', description: 'A bivalve Pokémon' },
  { name: 'Gastly', rarity: 'uncommon', type: 'Ghost', emoji: '👻', description: 'A gas Pokémon' },
  { name: 'Haunter', rarity: 'rare', type: 'Ghost', emoji: '👻', description: 'A gas Pokémon' },
  { name: 'Gengar', rarity: 'rare', type: 'Ghost', emoji: '👻', description: 'A shadow Pokémon' },
  { name: 'Onix', rarity: 'rare', type: 'Rock', emoji: '🪨', description: 'A rock snake Pokémon' },
  { name: 'Drowzee', rarity: 'common', type: 'Psychic', emoji: '😴', description: 'A hypnosis Pokémon' },
  { name: 'Hypno', rarity: 'uncommon', type: 'Psychic', emoji: '😵‍💫', description: 'A hypnosis Pokémon' },
  { name: 'Krabby', rarity: 'common', type: 'Water', emoji: '🦀', description: 'A river crab Pokémon' },
  { name: 'Kingler', rarity: 'uncommon', type: 'Water', emoji: '🦀', description: 'A pincer Pokémon' },
  { name: 'Voltorb', rarity: 'common', type: 'Electric', emoji: '⚡', description: 'A ball Pokémon' },
  { name: 'Electrode', rarity: 'uncommon', type: 'Electric', emoji: '⚡', description: 'A ball Pokémon' },
  { name: 'Exeggcute', rarity: 'common', type: 'Grass', emoji: '🥚', description: 'An egg Pokémon' },
  { name: 'Exeggutor', rarity: 'uncommon', type: 'Grass', emoji: '🥥', description: 'A coconut Pokémon' },
  { name: 'Cubone', rarity: 'uncommon', type: 'Ground', emoji: '🦴', description: 'A lonely Pokémon' },
  { name: 'Marowak', rarity: 'rare', type: 'Ground', emoji: '🦴', description: 'A bone keeper Pokémon' },
  { name: 'Hitmonlee', rarity: 'rare', type: 'Fighting', emoji: '🦵', description: 'A kicking Pokémon' },
  { name: 'Hitmonchan', rarity: 'rare', type: 'Fighting', emoji: '👊', description: 'A punching Pokémon' },
  { name: 'Lickitung', rarity: 'rare', type: 'Normal', emoji: '👅', description: 'A licking Pokémon' },
  { name: 'Koffing', rarity: 'common', type: 'Poison', emoji: '☁️', description: 'A poison gas Pokémon' },
  { name: 'Weezing', rarity: 'uncommon', type: 'Poison', emoji: '☁️', description: 'A poison gas Pokémon' },
  { name: 'Rhyhorn', rarity: 'uncommon', type: 'Ground', emoji: '🦏', description: 'A spikes Pokémon' },
  { name: 'Rhydon', rarity: 'rare', type: 'Ground', emoji: '🦏', description: 'A drill Pokémon' },
  { name: 'Chansey', rarity: 'rare', type: 'Normal', emoji: '🥚', description: 'An egg Pokémon' },
  { name: 'Tangela', rarity: 'uncommon', type: 'Grass', emoji: '🪴', description: 'A vine Pokémon' },
  { name: 'Kangaskhan', rarity: 'rare', type: 'Normal', emoji: '🦘', description: 'A parent Pokémon' },
  { name: 'Horsea', rarity: 'common', type: 'Water', emoji: '🐉', description: 'A dragon Pokémon' },
  { name: 'Seadra', rarity: 'uncommon', type: 'Water', emoji: '🐉', description: 'A dragon Pokémon' },
  { name: 'Goldeen', rarity: 'common', type: 'Water', emoji: '🐠', description: 'A goldfish Pokémon' },
  { name: 'Seaking', rarity: 'uncommon', type: 'Water', emoji: '🐠', description: 'A goldfish Pokémon' },
  { name: 'Staryu', rarity: 'common', type: 'Water', emoji: '⭐', description: 'A starshape Pokémon' },
  { name: 'Starmie', rarity: 'uncommon', type: 'Water', emoji: '⭐', description: 'A mysterious Pokémon' },
  { name: 'Mr. Mime', rarity: 'rare', type: 'Psychic', emoji: '🎭', description: 'A barrier Pokémon' },
  { name: 'Scyther', rarity: 'rare', type: 'Bug', emoji: '🦗', description: 'A mantis Pokémon' },
  { name: 'Jynx', rarity: 'rare', type: 'Ice', emoji: '❄️', description: 'A human shape Pokémon' },
  { name: 'Electabuzz', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'An electric Pokémon' },
  { name: 'Magmar', rarity: 'rare', type: 'Fire', emoji: '🔥', description: 'A spitfire Pokémon' },
  { name: 'Pinsir', rarity: 'rare', type: 'Bug', emoji: '🦗', description: 'A stag beetle Pokémon' },
  { name: 'Tauros', rarity: 'rare', type: 'Normal', emoji: '🐂', description: 'A wild bull Pokémon' },
  { name: 'Magikarp', rarity: 'common', type: 'Water', emoji: '🐟', description: 'A fish Pokémon' },
  { name: 'Gyarados', rarity: 'legendary', type: 'Water', emoji: '🐉', description: 'An atrocious Pokémon' },
  { name: 'Lapras', rarity: 'legendary', type: 'Water', emoji: '🌊', description: 'A transport Pokémon' },
  { name: 'Ditto', rarity: 'rare', type: 'Normal', emoji: '🧬', description: 'A transform Pokémon' },
  { name: 'Eevee', rarity: 'rare', type: 'Normal', emoji: '🦊', description: 'An evolution Pokémon' },
  { name: 'Vaporeon', rarity: 'rare', type: 'Water', emoji: '🌊', description: 'A bubble jet Pokémon' },
  { name: 'Jolteon', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'A lightning Pokémon' },
  { name: 'Flareon', rarity: 'rare', type: 'Fire', emoji: '🔥', description: 'A flame Pokémon' },
  { name: 'Porygon', rarity: 'legendary', type: 'Normal', emoji: '🤖', description: 'A virtual Pokémon' },
  { name: 'Omanyte', rarity: 'rare', type: 'Rock', emoji: '🐚', description: 'A spiral Pokémon' },
  { name: 'Omastar', rarity: 'rare', type: 'Rock', emoji: '🐙', description: 'A spiral Pokémon' },
  { name: 'Kabuto', rarity: 'rare', type: 'Rock', emoji: '🦀', description: 'A shellfish Pokémon' },
  { name: 'Kabutops', rarity: 'rare', type: 'Rock', emoji: '🦂', description: 'A shellfish Pokémon' },
  { name: 'Aerodactyl', rarity: 'legendary', type: 'Rock', emoji: '🦅', description: 'A fossil Pokémon' },
  { name: 'Snorlax', rarity: 'legendary', type: 'Normal', emoji: '😴', description: 'A sleeping Pokémon' },
  { name: 'Articuno', rarity: 'legendary', type: 'Ice', emoji: '🧊', description: 'A freeze Pokémon' },
  { name: 'Zapdos', rarity: 'legendary', type: 'Electric', emoji: '⚡', description: 'An electric Pokémon' },
  { name: 'Moltres', rarity: 'legendary', type: 'Fire', emoji: '🔥', description: 'A flame Pokémon' },
  { name: 'Dratini', rarity: 'rare', type: 'Dragon', emoji: '🐍', description: 'A dragon Pokémon' },
  { name: 'Dragonair', rarity: 'rare', type: 'Dragon', emoji: '🐉', description: 'A dragon Pokémon' },
  { name: 'Dragonite', rarity: 'legendary', type: 'Dragon', emoji: '🐲', description: 'A dragon Pokémon' },
  { name: 'Mewtwo', rarity: 'legendary', type: 'Psychic', emoji: '🧠', description: 'A genetic Pokémon' },
  { name: 'Mew', rarity: 'legendary', type: 'Psychic', emoji: '💫', description: 'A new species Pokémon' }
];

// DOM elements
const qEl = document.getElementById('question');
const optEl = document.getElementById('options');
const difficultyLabel = document.getElementById('difficultyLabel');
const streakLabel = document.getElementById('streakLabel');
const totalLabel = document.getElementById('totalLabel');
const encounterArea = document.getElementById('encounterArea');
const continueBtn = document.getElementById('continueBtn');
const inputRow = document.getElementById('inputRow');
const answerInput = document.getElementById('answerInput');
const hintBtn = document.getElementById('hintBtn');
const soundToggle = document.getElementById('soundToggle');
const hintsToggle = document.getElementById('hintsToggle');

// Game state variables
let currentAnswer = '';
let retryState = null;
let lastQuestionStart = Date.now();
let currentQuestionType = null;
let gameTimerInterval = null;
let rocketBattleState = null;

// ========== UTILITY FUNCTIONS ==========
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const loaded = JSON.parse(saved);
      Object.assign(state, loaded);
    }
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(screenId).style.display = 'block';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function speak(text) {
  if (state.sound && 'speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.speechRate || 0.8;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }
}

function playSound(type) {
  if (!state.sound) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    } else if (type === 'wrong') {
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2);
    }
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log('Audio not supported');
  }
}

function showTempMessage(msg, duration = 2000, type = 'success') {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.textContent = msg;
  feedbackEl.className = `small center ${type}`;
  setTimeout(() => {
    feedbackEl.textContent = '';
    feedbackEl.className = 'small center';
  }, duration);
}

function unlockAchievement(id) {
  if (state.achievementsUnlocked[id]) return;
  state.achievementsUnlocked[id] = true;
  const achievement = achievements[id];
  if (achievement) {
    showTempMessage(`🏆 ${achievement.name}: ${achievement.description}`, 4000, 'success');
  }
  save();
  renderAchievements();
}

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
      state.mathStreak = 0;
    }
  } else {
    state.mathStreak = 0;
  }
  
  state.mathSessionTotal++;
  save();
}

function generateAdditionProblem(level) {
  const gradeContent = getGradeContent();
  const max1 = gradeContent.addition.max1;
  const max2 = gradeContent.addition.max2;
  const maxSum = gradeContent.addition.maxSum;
  
  let num1, num2;
  
  const complexity = Math.min(state.gradeLevel + level - 1, 6);
  
  switch(complexity) {
    case 1:
      num1 = Math.floor(Math.random() * Math.min(5, max1)) + 1;
      num2 = Math.floor(Math.random() * Math.min(5, max2)) + 1;
      break;
    case 2:
      num1 = Math.floor(Math.random() * Math.min(10, max1)) + 1;
      num2 = Math.floor(Math.random() * Math.min(10, max2)) + 1;
      if (num1 + num2 > maxSum) num2 = maxSum - num1;
      break;
    case 3:
      num1 = Math.floor(Math.random() * Math.min(20, max1)) + 1;
      num2 = Math.floor(Math.random() * Math.min(20, max2)) + 1;
      if (num1 + num2 > maxSum) num2 = maxSum - num1;
      break;
    case 4:
      num1 = Math.floor(Math.random() * Math.min(35, max1)) + 10;
      num2 = Math.floor(Math.random() * Math.min(35, max2)) + 10;
      if (num1 + num2 > maxSum) num2 = maxSum - num1;
      break;
    case 5:
      num1 = Math.floor(Math.random() * Math.min(50, max1)) + 15;
      num2 = Math.floor(Math.random() * Math.min(50, max2)) + 15;
      if (num1 + num2 > maxSum) num2 = maxSum - num1;
      break;
    default:
      num1 = Math.floor(Math.random() * max1) + 20;
      num2 = Math.floor(Math.random() * max2) + 20;
      if (num1 + num2 > maxSum) num2 = maxSum - num1;
  }
  
  return { num1, num2, answer: num1 + num2, operation: '+' };
}

function generateSubtractionProblem(level) {
  const gradeContent = getGradeContent();
  const minStart = gradeContent.subtraction.minStart;
  const maxStart = gradeContent.subtraction.maxStart;
  const maxSub = gradeContent.subtraction.maxSub;
  
  let num1, num2;
  
  const complexity = Math.min(state.gradeLevel + level - 1, 6);
  
  switch(complexity) {
    case 1:
      num1 = Math.floor(Math.random() * 6) + 5;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      break;
    case 2:
      num1 = Math.floor(Math.random() * 11) + Math.max(10, minStart);
      num2 = Math.floor(Math.random() * Math.min(10, num1 - 1)) + 1;
      break;
    case 3:
      num1 = Math.floor(Math.random() * 21) + Math.max(20, minStart);
      num2 = Math.floor(Math.random() * Math.min(20, num1 - 10)) + 5;
      break;
    case 4:
      num1 = Math.floor(Math.random() * 31) + Math.max(30, minStart);
      num2 = Math.floor(Math.random() * Math.min(30, num1 - 10)) + 10;
      break;
    case 5:
      num1 = Math.floor(Math.random() * 41) + Math.max(40, minStart);
      num2 = Math.floor(Math.random() * Math.min(maxSub, num1 - 15)) + 15;
      break;
    default:
      num1 = Math.floor(Math.random() * (maxStart - minStart)) + minStart;
      num2 = Math.floor(Math.random() * Math.min(maxSub, num1 - 20)) + 20;
  }
  
  return { num1, num2, answer: num1 - num2, operation: '-' };
}

function chooseMathProblemType() {
  const addLevel = state.additionLevel;
  const subLevel = state.subtractionLevel;
  
  if (addLevel > subLevel + 1) return 'subtraction';
  if (subLevel > addLevel + 1) return 'addition';
  
  return Math.random() < 0.5 ? 'addition' : 'subtraction';
}

// ========== NUMBER FUNCTIONS ==========
function numToWords(n) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (n === 0) return 'zero';
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? '-' + ones[n%10] : '');
  if (n < 200) return 'one hundred' + (n%100 ? ' ' + numToWords(n%100) : '');
  return 'two hundred';
}

function chooseNumber() {
  const gradeContent = getGradeContent();
  const min = gradeContent.numbers.min;
  const max = gradeContent.numbers.max;
  
  const pool = [];
  for (let n = min; n <= max; n++) {
    const mastered = state.mastered.includes(n);
    const mistakes = state.mistakes[n] || 0;
    const m = mastered ? 1 : 3;
    const weight = Math.max(1, m + mistakes);
    for (let i = 0; i < weight; i++) pool.push(n);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function chooseReadingWord() {
  const gradeContent = getGradeContent();
  const gradeWords = [...gradeContent.readingWords, ...gradeContent.sightWords];
  
  const pool = [];
  for (let word of gradeWords) {
    const mastered = state.readingMastered.includes(word);
    const mistakes = state.readingMistakes[word] || 0;
    const m = mastered ? 1 : 3;
    const weight = Math.max(1, m + mistakes);
    for (let i = 0; i < weight; i++) pool.push(word);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// ========== TEAM ROCKET BATTLE SYSTEM ==========
function startRocketBattle() {
  rocketBattleState = {
    questionsAsked: 0,
    questionsCorrect: 0,
    targetCorrect: 3,
    isActive: true
  };
  
  showScreen('rocketBattle');
  document.getElementById('rocketProgress').textContent = `0/${rocketBattleState.targetCorrect}`;
  
  setTimeout(() => {
    nextRocketQuestion();
  }, 1000);
}

function nextRocketQuestion() {
  if (!rocketBattleState || !rocketBattleState.isActive) return;
  
  document.getElementById('rocketFeedback').textContent = '';
  document.getElementById('rocketOptions').innerHTML = '';
  
  // Choose a random question type for Team Rocket
  const questionTypes = ['numbers', 'reading', 'math', 'science'];
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  if (type === 'numbers') {
    const num = chooseNumber();
    currentAnswer = numToWords(num);
    document.getElementById('rocketQuestion').textContent = `How do you spell the number ${num}?`;
    speak(`Team Rocket challenges you: How do you spell the number ${num}?`);
    
    const correctAnswer = currentAnswer;
    const wrongAnswers = [
      numToWords(Math.max(1, num - 1)),
      numToWords(Math.min(200, num + 1)),
      numToWords(Math.floor(Math.random() * 50) + 1)
    ];
    
    const choices = [correctAnswer, ...wrongAnswers.slice(0, 3)];
    shuffleArray(choices);
    
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.onclick = () => handleRocketAnswer(choice);
      document.getElementById('rocketOptions').appendChild(btn);
    });
    
  } else if (type === 'reading') {
    const word = chooseReadingWord();
    currentAnswer = word;
    document.getElementById('rocketQuestion').textContent = `What word is this: ${word}?`;
    speak(`Team Rocket challenges you: What word is this: ${word}?`);
    
    const gradeContent = getGradeContent();
    const allWords = [...gradeContent.readingWords, ...gradeContent.sightWords];
    const wrongWords = allWords.filter(w => w !== word);
    const choices = [word, ...wrongWords.slice(0, 3)];
    shuffleArray(choices);
    
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.onclick = () => handleRocketAnswer(choice);
      document.getElementById('rocketOptions').appendChild(btn);
    });
    
  } else if (type === 'math') {
    const mathType = chooseMathProblemType();
    const level = getMathDifficultyLevel(mathType);
    const problem = mathType === 'addition' ? generateAdditionProblem(level) : generateSubtractionProblem(level);
    
    currentAnswer = String(problem.answer);
    document.getElementById('rocketQuestion').textContent = `What is ${problem.num1} ${problem.operation} ${problem.num2}?`;
    speak(`Team Rocket challenges you: What is ${problem.num1} ${problem.operation === '+' ? 'plus' : 'minus'} ${problem.num2}?`);
    
    const correctAnswer = problem.answer;
    const wrongAnswers = [
      correctAnswer + 1,
      correctAnswer - 1,
      Math.floor(Math.random() * 20) + 1
    ];
    
    const choices = [correctAnswer, ...wrongAnswers];
    shuffleArray(choices);
    
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.onclick = () => handleRocketAnswer(String(choice));
      document.getElementById('rocketOptions').appendChild(btn);
    });
    
  } else if (type === 'science') {
    const animal = scienceContent.animals[Math.floor(Math.random() * scienceContent.animals.length)];
    currentAnswer = animal.name;
    document.getElementById('rocketQuestion').textContent = `Which animal ${animal.fact}?`;
    speak(`Team Rocket challenges you: Which animal ${animal.fact}?`);
    
    const wrongAnimals = scienceContent.animals.filter(a => a !== animal);
    const choices = [animal.name, ...wrongAnimals.slice(0, 3).map(a => a.name)];
    shuffleArray(choices);
    
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.onclick = () => handleRocketAnswer(choice);
      document.getElementById('rocketOptions').appendChild(btn);
    });
  }
}

function handleRocketAnswer(answer) {
  if (!rocketBattleState || !rocketBattleState.isActive) return;
  
  rocketBattleState.questionsAsked++;
  
  if (answer.toLowerCase() === currentAnswer.toLowerCase()) {
    rocketBattleState.questionsCorrect++;
    document.getElementById('rocketFeedback').textContent = '🎉 Correct! Team Rocket is getting weaker!';
    document.getElementById('rocketFeedback').className = 'small center success';
    playSound('correct');
    
    document.getElementById('rocketProgress').textContent = `${rocketBattleState.questionsCorrect}/${rocketBattleState.targetCorrect}`;
    
    if (rocketBattleState.questionsCorrect >= rocketBattleState.targetCorrect) {
      // Victory!
      setTimeout(() => {
        rocketVictory();
      }, 1500);
    } else {
      setTimeout(() => {
        nextRocketQuestion();
      }, 1500);
    }
  } else {
    document.getElementById('rocketFeedback').textContent = `❌ Wrong! The correct answer was: ${currentAnswer}`;
    document.getElementById('rocketFeedback').className = 'small center error';
    playSound('wrong');
    
    setTimeout(() => {
      nextRocketQuestion();
    }, 2000);
  }
}

function rocketVictory() {
  rocketBattleState.isActive = false;
  state.rocketWins++;
  
  if (state.rocketWins >= 5) {
    unlockAchievement('rocket_defeated');
  }
  
  // Return stolen Pokemon
  if (state.stolen.length > 0) {
    const returned = state.stolen.splice(0, Math.min(3, state.stolen.length));
    state.collection.push(...returned);
  }
  
  // Give bonus Pokemon
  const available = creatures.filter(c => !state.collection.includes(c.name));
  if (available.length > 0) {
    const bonusPokemon = available[Math.floor(Math.random() * available.length)];
    state.collection.push(bonusPokemon.name);
  }
  
  save();
  
  document.getElementById('victoryMessage').innerHTML = `
    <h2>🎉 You defeated Team Rocket!</h2>
    <p>Great job! You answered ${rocketBattleState.questionsCorrect} questions correctly!</p>
    <p>Team Rocket has fled, and your Pokémon are safe!</p>
  `;
  
  const rewardsEl = document.getElementById('victoryRewards');
  rewardsEl.innerHTML = `
    <div class="victory-rewards">
      <h3>Rewards:</h3>
      <p>✨ All stolen Pokémon returned</p>
      <p>🎁 Bonus rare Pokémon caught</p>
      <p>🏆 Victory count: ${state.rocketWins}</p>
    </div>
  `;
  
  showScreen('victory');
  
  updateCollectionBar();
}

function forfeitRocketBattle() {
  if (!rocketBattleState) return;
  
  rocketBattleState.isActive = false;
  
  // Steal some Pokemon
  if (state.collection.length > 0) {
    const stolenCount = Math.min(2, state.collection.length);
    for (let i = 0; i < stolenCount; i++) {
      const randomIndex = Math.floor(Math.random() * state.collection.length);
      const stolen = state.collection.splice(randomIndex, 1)[0];
      state.stolen.push(stolen);
    }
  }
  
  save();
  showTempMessage('💔 Team Rocket stole some of your Pokémon! Win battles to get them back!', 3000, 'error');
  
  showScreen('game');
  updateCollectionBar();
  nextQuestion();
}

// ========== TIME & SCIENCE QUESTION TYPES ==========
function showTimeTelling() {
  const hour = timeSkills.hours[Math.floor(Math.random() * timeSkills.hours.length)];
  const minute = timeSkills.minutes[Math.floor(Math.random() * timeSkills.minutes.length)];
  
  currentAnswer = `${hour}:${minute.toString().padStart(2, '0')}`;
  state.lastQuestion = currentAnswer;
  
  qEl.textContent = `What time does this clock show?`;
  
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
  const baseHour = Math.floor(Math.random() * 8) + 1;
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
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;
  
  return `
    <div class="analog-clock">
      <div class="clock-face">
        <div class="hour-hand" style="transform: rotate(${hourAngle}deg)"></div>
        <div class="minute-hand" style="transform: rotate(${minuteAngle}deg)"></div>
        <div class="clock-center"></div>
        <div class="hour-12"><span>12</span></div>
        <div class="hour-3"><span>3</span></div>
        <div class="hour-6"><span>6</span></div>
        <div class="hour-9"><span>9</span></div>
      </div>
    </div>
  `;
}

// ========== MATH QUESTION TYPES ==========
function showAddition() {
  const level = getMathDifficultyLevel('addition');
  const problem = generateAdditionProblem(level);
  
  currentAnswer = String(problem.answer);
  state.lastQuestion = `${problem.num1}+${problem.num2}`;
  
  qEl.textContent = `What is ${problem.num1} + ${problem.num2}?`;
  
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

// Helper functions for reading questions
function showSpellTiles(num, word) {
  currentAnswer = word;
  qEl.textContent = `How do you spell ${num}?`;
  speak(`How do you spell ${num}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showCountForward(num) {
  currentAnswer = String(num + 1);
  qEl.textContent = `What number comes after ${num}?`;
  speak(`What number comes after ${num}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showCountBackward(num) {
  currentAnswer = String(num - 1);
  qEl.textContent = `What number comes before ${num}?`;
  speak(`What number comes before ${num}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showSkipCount() {
  const start = Math.floor(Math.random() * 5) + 2;
  const step = [2, 5, 10][Math.floor(Math.random() * 3)];
  const sequence = [start, start + step, start + 2*step, '___', start + 4*step];
  currentAnswer = String(start + 3*step);
  qEl.textContent = `What number comes next?`;
  optEl.innerHTML = `<div class="sequence">${sequence.join(', ')}</div>`;
  speak(`What number comes next in the sequence: ${sequence.slice(0, 3).join(', ')}`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showPlaceValue(num) {
  const digit = num < 10 ? num : (num < 100 ? Math.floor(num/10) : Math.floor(num/100));
  const place = num < 10 ? 'ones' : (num < 100 ? 'tens' : 'hundreds');
  currentAnswer = String(digit);
  qEl.textContent = `What digit is in the ${place} place in ${num}?`;
  speak(`What digit is in the ${place} place in ${num}?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showPlaceValueReverse(num) {
  if (num < 10) {
    currentAnswer = String(num);
    qEl.textContent = `What number has ${num} in the ones place?`;
  } else if (num < 100) {
    const tens = Math.floor(num/10);
    const ones = num % 10;
    currentAnswer = String(num);
    qEl.textContent = `What number has ${tens} in the tens place and ${ones} in the ones place?`;
  }
  speak(qEl.textContent);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showPlaceValueDifferent(num) {
  const options = [];
  for (let i = 0; i < 4; i++) {
    let n = num;
    if (i > 0) n = Math.floor(Math.random() * 99) + 1;
    options.push(n);
  }
  shuffleArray(options);
  currentAnswer = String(num);
  
  const digit = num < 10 ? num : Math.floor(num/10);
  const place = num < 10 ? 'ones' : 'tens';
  qEl.textContent = `Which number has ${digit} in the ${place} place?`;
  speak(qEl.textContent);
  
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => submitChoice(String(opt));
    optEl.appendChild(btn);
  });
}

function showNearestTen(num) {
  const mod = num % 10;
  const lower = num - mod;
  const upper = lower + 10;
  currentAnswer = String(mod < 5 ? lower : upper);
  qEl.textContent = `What is ${num} rounded to the nearest ten?`;
  speak(`What is ${num} rounded to the nearest ten?`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showCompare() {
  const num1 = chooseNumber();
  let num2 = chooseNumber();
  while (num2 === num1) num2 = chooseNumber();
  
  currentAnswer = num1 > num2 ? '>' : '<';
  qEl.textContent = `Which symbol goes between ${num1} and ${num2}?`;
  speak(`Which symbol goes between ${num1} and ${num2}?`);
  
  const symbols = ['>', '<'];
  symbols.forEach(sym => {
    const btn = document.createElement('button');
    btn.textContent = `${num1} ${sym} ${num2}`;
    btn.onclick = () => submitChoice(sym);
    optEl.appendChild(btn);
  });
}

function showOrderNumbers() {
  const nums = [];
  for (let i = 0; i < 3; i++) {
    nums.push(chooseNumber());
  }
  const sorted = [...nums].sort((a, b) => a - b);
  currentAnswer = sorted.join(',');
  
  qEl.textContent = `Put these numbers in order from smallest to largest:`;
  optEl.innerHTML = `<div class="numbers">${nums.join(', ')}</div>`;
  speak(`Put these numbers in order from smallest to largest: ${nums.join(', ')}`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Separate with commas';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showFindPattern() {
  const start = Math.floor(Math.random() * 10) + 1;
  const step = Math.floor(Math.random() * 3) + 2;
  const sequence = [start, start + step, start + 2*step];
  currentAnswer = String(start + 3*step);
  
  qEl.textContent = `What comes next in this pattern?`;
  optEl.innerHTML = `<div class="pattern">${sequence.join(', ')}, ___</div>`;
  speak(`What comes next in this pattern: ${sequence.join(', ')}`);
  inputRow.style.display = 'flex';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showReadWord(word) {
  currentAnswer = word;
  qEl.textContent = `Type this word: ${word}`;
  speak(`Type this word: ${word}`);
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type what you see';
  answerInput.focus();
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showSightWord(word) {
  const gradeContent = getGradeContent();
  const gradeSightWords = gradeContent.sightWords;
  
  if (!gradeSightWords.includes(word)) {
    word = gradeSightWords[Math.floor(Math.random() * gradeSightWords.length)];
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
  const words = ['cat', 'bat', 'hat', 'mat', 'rat'];
  const target = words[Math.floor(Math.random() * words.length)];
  const rhymes = words.filter(w => w !== target);
  const nonRhymes = ['dog', 'sun', 'big', 'run'];
  const choices = [rhymes[0], ...nonRhymes.slice(0, 3)];
  shuffleArray(choices);
  
  currentAnswer = rhymes[0];
  qEl.textContent = `Which word rhymes with "${target}"?`;
  speak(`Which word rhymes with ${target}?`);
  
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => submitChoice(choice);
    optEl.appendChild(btn);
  });
}

function showPhonics(word) {
  currentAnswer = word;
  const sounds = word.split('').join(' - ');
  qEl.textContent = `What word do these sounds make?`;
  
  setTimeout(() => {
    speak(sounds);
  }, 500);
  
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type the word';
  answerInput.focus();
  
  const repeatBtn = document.createElement('button');
  repeatBtn.textContent = '🔊 Repeat Sounds';
  repeatBtn.className = 'secondary';
  repeatBtn.onclick = () => speak(sounds);
  optEl.appendChild(repeatBtn);
  
  if (state.hints) hintBtn.style.display = 'inline-block';
}

function showSyllables(word) {
  const syllableCount = word.split(/[aeiou]/).length - 1 || 1;
  currentAnswer = String(Math.max(1, syllableCount));
  
  qEl.textContent = `How many syllables are in "${word}"?`;
  speak(`How many syllables are in ${word}?`);
  
  for (let i = 1; i <= 4; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => submitChoice(String(i));
    optEl.appendChild(btn);
  }
}

function showLetterSounds() {
  const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w'];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const sounds = {
    'b': 'buh', 'c': 'kuh', 'd': 'duh', 'f': 'fuh', 'g': 'guh',
    'h': 'huh', 'j': 'juh', 'k': 'kuh', 'l': 'luh', 'm': 'muh',
    'n': 'nuh', 'p': 'puh', 'r': 'ruh', 's': 'suh', 't': 'tuh', 'w': 'wuh'
  };
  
  currentAnswer = letter;
  qEl.textContent = `What letter makes this sound?`;
  
  setTimeout(() => {
    speak(sounds[letter]);
  }, 500);
  
  inputRow.style.display = 'flex';
  answerInput.placeholder = 'Type the letter';
  answerInput.focus();
  
  const repeatBtn = document.createElement('button');
  repeatBtn.textContent = '🔊 Repeat Sound';
  repeatBtn.className = 'secondary';
  repeatBtn.onclick = () => speak(sounds[letter]);
  optEl.appendChild(repeatBtn);
  
  if (state.hints) hintBtn.style.display = 'inline-block';
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
  
  if (['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'].includes(type)) {
    state.lastQuestion = chooseReadingWord();
  } else if (['addition', 'subtraction', 'mathWordProblem', 'mathComparison'].includes(type)) {
    state.lastQuestion = type;
  } else if (['timeTelling', 'dailyActivity', 'timeSequence'].includes(type)) {
    state.lastQuestion = type;
  } else if (['animalIdentification', 'animalHabitat', 'weatherPattern'].includes(type)) {
    state.lastQuestion = type;
  } else {
    state.lastQuestion = chooseNumber();
  }

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

function submitAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = currentAnswer.toLowerCase();
  
  if (userAnswer === correctAnswer) {
    handleCorrect();
  } else {
    handleWrong(currentAnswer);
  }
}

function submitChoice(choice) {
  if (choice.toLowerCase() === currentAnswer.toLowerCase()) {
    handleCorrect();
  } else {
    handleWrong(currentAnswer);
  }
}

function handleCorrect() {
  const timeTaken = Date.now() - lastQuestionStart;
  if (timeTaken < 2000) unlockAchievement('speed_typist');
  
  state.streak++;
  state.dailyProgress++;
  
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
    
    if (['addition', 'subtraction'].includes(currentQuestionType)) {
      adjustMathDifficulty(currentQuestionType, true);
    }
    
    if (state.mathTotal === 10) unlockAchievement('math_rookie');
    if (state.mathTotal >= 100) unlockAchievement('math_master');
    if (state.mathStreak >= 10) unlockAchievement('quick_calculator');
    if (state.mathSessionCorrect >= 20 && state.mathSessionTotal === state.mathSessionCorrect) {
      unlockAchievement('perfect_session');
    }
    
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
  
  if (state.dailyProgress >= state.dailyGoal) {
    showTempMessage(`🎯 Daily goal achieved! Great job!`, 3000, 'success');
  }
  
  state.lastQuestion = null;
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
  
  const totalAnswers = state.correctTotal + state.readingTotal + state.mathTotal + state.timeTotal + state.scienceTotal;
  if (totalAnswers > 0 && totalAnswers % 15 === 0) {
    startRocketBattle();
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
  
  const isReadingQuestion = ['readWord', 'sightWord', 'rhyming', 'phonics', 'syllables', 'letterSounds'].includes(currentQuestionType);
  const isMathQuestion = ['addition', 'subtraction', 'mathWordProblem', 'mathComparison'].includes(currentQuestionType);
  const isTimeQuestion = ['timeTelling', 'dailyActivity', 'timeSequence'].includes(currentQuestionType);
  const isScienceQuestion = ['animalIdentification', 'animalHabitat', 'weatherPattern'].includes(currentQuestionType);
  
  if (isReadingQuestion) {
    state.readingMistakes[state.lastQuestion] = (state.readingMistakes[state.lastQuestion] || 0) + 1;
  } else if (isMathQuestion) {
    state.mathMistakes[state.lastQuestion] = (state.mathMistakes[state.lastQuestion] || 0) + 1;
    
    if (['addition', 'subtraction'].includes(currentQuestionType)) {
      adjustMathDifficulty(currentQuestionType, false);
    }
    
    state.mathSessionTotal++;
  } else if (isTimeQuestion) {
    state.timeMistakes[state.lastQuestion] = (state.timeMistakes[state.lastQuestion] || 0) + 1;
  } else if (isScienceQuestion) {
    state.scienceMistakes[state.lastQuestion] = (state.scienceMistakes[state.lastQuestion] || 0) + 1;
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
  } else if (currentQuestionType === 'timeTelling') {
    hint = `Look at where the short hand (hour) and long hand (minute) point on the clock.`;
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

function updateStats() {
  const modeNames = {
    'numbers': 'Numbers Only',
    'reading': 'Reading Only',
    'math': 'Math Only',
    'time': 'Time Skills',
    'science': 'Science & Nature',
    'mixed': 'Mixed Learning'
  };
  difficultyLabel.textContent = `${modeNames[state.gameMode] || 'Mixed Learning'} (Grade ${state.gradeLevel})`;
  streakLabel.textContent = state.streak;
  totalLabel.textContent = state.correctTotal + state.readingTotal + state.mathTotal + state.timeTotal + state.scienceTotal;
}

function renderAnalytics() {
  const content = document.getElementById('analyticsContent');
  const totalAnswers = state.correctTotal + state.readingTotal + state.mathTotal + state.timeTotal + state.scienceTotal;
  
  content.innerHTML = `
    <h3>Overall Progress</h3>
    <p>Total Correct Answers: <strong>${totalAnswers}</strong></p>
    <p>Number Questions: <strong>${state.correctTotal}</strong></p>
    <p>Reading Questions: <strong>${state.readingTotal}</strong></p>
    <p>Math Questions: <strong>${state.mathTotal}</strong></p>
    <p>Time Questions: <strong>${state.timeTotal}</strong></p>
    <p>Science Questions: <strong>${state.scienceTotal}</strong></p>
    <p>Daily Progress: <strong>${state.dailyProgress} / ${state.dailyGoal}</strong></p>
    <div class="daily-progress">
      <span>Today's Goal:</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${Math.min(100, (state.dailyProgress / state.dailyGoal) * 100)}%"></div>
      </div>
      <span>${Math.round((state.dailyProgress / state.dailyGoal) * 100)}%</span>
    </div>
    <hr style="margin:20px 0; border: none; border-top: 1px dashed #ccc;">
    <h3>Skill Levels</h3>
    <p>Addition Level: <strong>${state.additionLevel} / 5</strong></p>
    <p>Subtraction Level: <strong>${state.subtractionLevel} / 5</strong></p>
    <p>Time Level: <strong>${state.timeLevel} / 5</strong></p>
    <p>Mastered Numbers: <strong>${state.mastered.length} / ${MAX_NUM}</strong></p>
    <p>Reading Words Mastered: <strong>${state.readingMastered.length}</strong></p>
    <p>Math Problems Mastered: <strong>${state.mathMastered.length}</strong></p>
    <p>Time Skills Mastered: <strong>${state.timeMastered.length}</strong></p>
    <p>Science Facts Mastered: <strong>${state.scienceMastered.length}</strong></p>
    <hr style="margin:20px 0; border: none; border-top: 1px dashed #ccc;">
    <h3>Collection & Rewards</h3>
    <p>Pokédex Completion: <strong>${state.collection.length} / ${creatures.length}</strong></p>
    <p>Team Rocket Wins: <strong>${state.rocketWins}</strong></p>
    <p>Eggs Collected: <strong>${state.hatched.length + state.eggs.length}</strong></p>
    <p>Achievements Unlocked: <strong>${Object.keys(state.achievementsUnlocked).length} / ${Object.keys(achievements).length}</strong></p>
    <hr style="margin:20px 0; border: none; border-top: 1px dashed #ccc;">
    <h3>Areas for Practice</h3>
    <ul id="mistakesList"></ul>
  `;
  
  const mistakesList = document.getElementById('mistakesList');
  const numberMistakes = Object.entries(state.mistakes).sort(([, a], [, b]) => b - a);
  const readingMistakes = Object.entries(state.readingMistakes).sort(([, a], [, b]) => b - a);
  const mathMistakes = Object.entries(state.mathMistakes).sort(([, a], [, b]) => b - a);
  const timeMistakes = Object.entries(state.timeMistakes || {}).sort(([, a], [, b]) => b - a);
  const scienceMistakes = Object.entries(state.scienceMistakes || {}).sort(([, a], [, b]) => b - a);
  
  const hasAnyMistakes = numberMistakes.length > 0 || readingMistakes.length > 0 || 
                       mathMistakes.length > 0 || timeMistakes.length > 0 || scienceMistakes.length > 0;
  
  if (!hasAnyMistakes) {
    mistakesList.innerHTML = '<li>No mistakes yet - excellent work!</li>';
  } else {
    mistakesList.innerHTML = '';
    
    if (numberMistakes.length > 0) {
      const numberHeader = document.createElement('h4');
      numberHeader.textContent = 'Numbers needing practice:';
      mistakesList.appendChild(numberHeader);
      numberMistakes.slice(0, 3).forEach(([num, count]) => {
        const li = document.createElement('li');
        li.textContent = `${num}: ${count} mistakes`;
        mistakesList.appendChild(li);
      });
    }
    
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
    
    if (timeMistakes.length > 0) {
      const timeHeader = document.createElement('h4');
      timeHeader.textContent = 'Time skills needing practice:';
      mistakesList.appendChild(timeHeader);
      timeMistakes.slice(0, 3).forEach(([time, count]) => {
        const li = document.createElement('li');
        li.textContent = `${time}: ${count} mistakes`;
        mistakesList.appendChild(li);
      });
    }
    
    if (scienceMistakes.length > 0) {
      const scienceHeader = document.createElement('h4');
      scienceHeader.textContent = 'Science topics needing practice:';
      mistakesList.appendChild(scienceHeader);
      scienceMistakes.slice(0, 3).forEach(([topic, count]) => {
        const li = document.createElement('li');
        li.textContent = `${topic}: ${count} mistakes`;
        mistakesList.appendChild(li);
      });
    }
  }
  
  soundToggle.checked = state.sound;
  hintsToggle.checked = state.hints;
}

// Simple Pokemon encounter system
function maybeEncounter() {
  if (Math.random() < 0.3) {
    const available = creatures.filter(c => !state.collection.includes(c.name));
    if (available.length > 0) {
      const creature = available[Math.floor(Math.random() * available.length)];
      showEncounter(creature);
    }
  }
}

function showEncounter(creature) {
  state.collection.push(creature.name);
  save();
  
  encounterArea.innerHTML = `
    <div class="encounter">
      <h3>A wild ${creature.name} appeared!</h3>
      <div class="creature-display">
        <span class="creature-emoji">${creature.emoji}</span>
        <p><strong>${creature.name}</strong></p>
        <p class="creature-type">${creature.type} type</p>
        <p class="creature-desc">${creature.description}</p>
        <p class="creature-rarity">${creature.rarity}</p>
      </div>
    </div>
  `;
  
  if (state.collection.length === 1) unlockAchievement('first_catch');
  if (state.collection.length >= 50) unlockAchievement('collector_50');
  if (creature.rarity === 'legendary') unlockAchievement('legendary_trainer');
  if (state.collection.length === creatures.length) unlockAchievement('dex_complete');
  
  updateCollectionBar();
  
  setTimeout(() => {
    encounterArea.innerHTML = '';
    continueBtn.style.display = 'inline-block';
  }, 3000);
}

function updateCollectionBar() {
  const recent = state.collection.slice(-10);
  document.getElementById('collectionBar').innerHTML = recent.map(name => {
    const creature = creatures.find(c => c.name === name);
    return `<span class="pokemon ${creature.rarity}" title="${creature.name}">${creature.emoji}</span>`;
  }).join('');
}

function renderAchievements() {
  const recentAchievements = Object.keys(state.achievementsUnlocked).slice(-3);
  document.getElementById('achievementsList').innerHTML = recentAchievements.map(id => 
    `<span class="achievement">${achievements[id].name}</span>`
  ).join('');
}

function giveEgg() {
  const eggTypes = ['🥚', '🐣', '🐤', '🐥'];
  const egg = {
    type: eggTypes[Math.floor(Math.random() * eggTypes.length)],
    hatchTime: Date.now() + (30000 + Math.random() * 60000)
  };
  state.eggs.push(egg);
  save();
  
  if (state.eggs.length === 1) unlockAchievement('egg_hatcher');
  if (state.eggs.length + state.hatched.length >= 10) unlockAchievement('egg_collector');
  
  renderEggs();
}

function renderEggs() {
  document.getElementById('eggsBar').innerHTML = state.eggs.map((egg, i) => 
    `<span class="egg" onclick="checkEgg(${i})" title="Click to check">${egg.type}</span>`
  ).join('');
}

function checkEgg(index) {
  const egg = state.eggs[index];
  if (Date.now() >= egg.hatchTime) {
    const creature = creatures[Math.floor(Math.random() * creatures.length)];
    state.hatched.push(creature.name);
    state.eggs.splice(index, 1);
    
    showTempMessage(`🎉 Your egg hatched into ${creature.name}! ${creature.emoji}`, 3000, 'success');
    
    if (!state.collection.includes(creature.name)) {
      state.collection.push(creature.name);
    }
    
    save();
    renderEggs();
    updateCollectionBar();
  } else {
    const timeLeft = Math.ceil((egg.hatchTime - Date.now()) / 1000);
    showTempMessage(`Egg will hatch in ${timeLeft} seconds`, 2000, 'hint');
  }
}

function checkEggs() {
  let anyHatched = false;
  state.eggs.forEach((egg, i) => {
    if (Date.now() >= egg.hatchTime) {
      anyHatched = true;
    }
  });
  
  if (anyHatched) {
    renderEggs();
  }
}

function triggerEvolution() {
  showTempMessage('🌟 Great streak! Your Pokémon are getting stronger!', 2000, 'success');
}

function quitToMenu() {
  state.lastQuestion = null;
  retryState = null;
  currentQuestionType = null;
  
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
    gameTimerInterval = null;
  }
  
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'small center';
  encounterArea.innerHTML = '';
  continueBtn.style.display = 'none';
  inputRow.style.display = 'none';
  hintBtn.style.display = 'none';
  optEl.innerHTML = '';
  
  save();
  showScreen('menu');
}

function renderProgressMap() {
  const gradeContent = getGradeContent();
  const mapGrid = document.getElementById('mapGrid');
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
    
    mapGrid.appendChild(item);
  }
}

function renderPokedex() {
  const dexGrid = document.getElementById('dexGrid');
  const progress = document.getElementById('dexProgress');
  
  progress.textContent = `${state.collection.length} / ${creatures.length} caught`;
  
  dexGrid.innerHTML = creatures.map(creature => {
    const caught = state.collection.includes(creature.name);
    return `
      <div class="dex-item ${caught ? 'caught' : ''} ${creature.rarity === 'legendary' ? 'legendary' : ''}">
        <div class="dex-pokemon">${caught ? creature.emoji : '❓'}</div>
        <div class="dex-name">${caught ? creature.name : '???'}</div>
        <div class="dex-number">#${creatures.indexOf(creature) + 1}</div>
      </div>
    `;
  }).join('');
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
  load();
  showScreen('menu');
  updateCollectionBar();
  renderAchievements();
  renderEggs();
  updateModeButtons();
  updateGradeButtons();
  
  gameTimerInterval = setInterval(checkEggs, 1000);

  // Grade level selection
  const gradeDescriptions = {
    1: 'Grade 1: Numbers 1-20, simple addition, basic sight words, telling time to the hour',
    2: 'Grade 2: Numbers 1-50, addition to 50, more sight words, half past and quarter past',
    3: 'Grade 3: Numbers 1-100, addition to 100, longer words, digital time and schedules',
    4: 'Grade 4: Numbers 1-150, addition to 150, complex words, time zones and calendars',
    5: 'Grade 5: Numbers 1-200, addition to 200, advanced vocabulary, time calculations',
    6: 'Grade 6: Numbers 1-200, advanced math, complex reading, world time and science'
  };
  
  function updateGradeButtons() {
    document.querySelectorAll('.grade-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`grade${state.gradeLevel}`).classList.add('active');
    document.getElementById('gradeDescription').textContent = gradeDescriptions[state.gradeLevel];
  }
  
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`grade${i}`).onclick = () => {
      state.gradeLevel = i;
      updateGradeButtons();
      save();
    };
  }
  
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
  
  // Screen navigation
  document.getElementById('playBtn').onclick = () => {
    showScreen('game');
    updateStats();
    nextQuestion();
  };
  
  document.getElementById('mapBtn').onclick = () => {
    renderProgressMap();
    showScreen('map');
  };
  
  document.getElementById('dexBtn').onclick = () => {
    renderPokedex();
    showScreen('dex');
  };
  
  document.getElementById('analyticsBtn').onclick = () => {
    renderAnalytics();
    showScreen('analytics');
  };
  
  document.getElementById('backFromMap').onclick = () => showScreen('menu');
  document.getElementById('backFromDex').onclick = () => showScreen('menu');
  document.getElementById('backFromAnalytics').onclick = () => showScreen('menu');
  
  // Game controls
  document.getElementById('quitBtn').onclick = quitToMenu;
  document.getElementById('continueBtn').onclick = nextQuestion;
  document.getElementById('submitBtn').onclick = submitAnswer;
  document.getElementById('hintBtn').onclick = showHint;
  
  // Team Rocket battle controls
  document.getElementById('forfeitRocket').onclick = forfeitRocketBattle;
  document.getElementById('continueFromVictory').onclick = () => {
    showScreen('game');
    nextQuestion();
  };
  
  // Settings
  soundToggle.onchange = () => {
    state.sound = soundToggle.checked;
    save();
  };
  
  hintsToggle.onchange = () => {
    state.hints = hintsToggle.checked;
    save();
  };
  
  document.getElementById('resetBtn').onclick = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  };
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    if (e.key === ' ' && continueBtn.style.display !== 'none') {
      e.preventDefault();
      nextQuestion();
    }
    if (e.key === 'h' && hintBtn.style.display !== 'none') {
      e.preventDefault();
      showHint();
    }
    if (e.key === 'Enter' && inputRow.style.display !== 'none') {
      e.preventDefault();
      submitAnswer();
    }
  });
  
  // Input handling
  answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });
});

function updateModeButtons() {
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(state.gameMode + 'Mode').classList.add('active');
}

// Make checkEgg available globally for onclick handlers
window.checkEgg = checkEgg;
