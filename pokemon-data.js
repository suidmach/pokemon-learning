// ========== POKEMON DATABASE ==========

// Complete 151 Pokemon database with detailed information
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
  { name: 'Pidgey', rarity: 'common', type: 'Flying', emoji: '🐦', description: 'A tiny bird Pokémon' },
  { name: 'Pidgeotto', rarity: 'uncommon', type: 'Flying', emoji: '🦅', description: 'A bird Pokémon' },
  { name: 'Pidgeot', rarity: 'rare', type: 'Flying', emoji: '🦅', description: 'A bird Pokémon with keen eyes' },
  { name: 'Rattata', rarity: 'common', type: 'Normal', emoji: '🐭', description: 'A mouse Pokémon' },
  { name: 'Raticate', rarity: 'uncommon', type: 'Normal', emoji: '🐭', description: 'A mouse Pokémon with big teeth' },
  
  { name: 'Spearow', rarity: 'common', type: 'Flying', emoji: '🐦', description: 'A tiny bird Pokémon' },
  { name: 'Fearow', rarity: 'uncommon', type: 'Flying', emoji: '🦅', description: 'A beak Pokémon' },
  { name: 'Ekans', rarity: 'common', type: 'Poison', emoji: '🐍', description: 'A snake Pokémon' },
  { name: 'Arbok', rarity: 'uncommon', type: 'Poison', emoji: '🐍', description: 'A cobra Pokémon' },
  { name: 'Pikachu', rarity: 'uncommon', type: 'Electric', emoji: '⚡', description: 'A mouse Pokémon with electric cheeks' },
  { name: 'Raichu', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'A mouse Pokémon that stores electricity' },
  { name: 'Sandshrew', rarity: 'common', type: 'Ground', emoji: '🏜️', description: 'A mouse Pokémon that lives in deserts' },
  { name: 'Sandslash', rarity: 'uncommon', type: 'Ground', emoji: '🏜️', description: 'A mouse Pokémon with sharp claws' },
  { name: 'Nidoran♀', rarity: 'common', type: 'Poison', emoji: '💜', description: 'A poison pin Pokémon' },
  { name: 'Nidorina', rarity: 'uncommon', type: 'Poison', emoji: '💜', description: 'A poison pin Pokémon' },
  
  { name: 'Nidoqueen', rarity: 'rare', type: 'Poison', emoji: '💜', description: 'A drill Pokémon' },
  { name: 'Nidoran♂', rarity: 'common', type: 'Poison', emoji: '💙', description: 'A poison pin Pokémon' },
  { name: 'Nidorino', rarity: 'uncommon', type: 'Poison', emoji: '💙', description: 'A poison pin Pokémon' },
  { name: 'Nidoking', rarity: 'rare', type: 'Poison', emoji: '💙', description: 'A drill Pokémon' },
  { name: 'Clefairy', rarity: 'uncommon', type: 'Fairy', emoji: '🌙', description: 'A fairy Pokémon' },
  { name: 'Clefable', rarity: 'rare', type: 'Fairy', emoji: '🌙', description: 'A fairy Pokémon' },
  { name: 'Vulpix', rarity: 'uncommon', type: 'Fire', emoji: '🦊', description: 'A fox Pokémon with six tails' },
  { name: 'Ninetales', rarity: 'rare', type: 'Fire', emoji: '🦊', description: 'A fox Pokémon with nine tails' },
  { name: 'Jigglypuff', rarity: 'uncommon', type: 'Fairy', emoji: '🎵', description: 'A balloon Pokémon that sings' },
  { name: 'Wigglytuff', rarity: 'rare', type: 'Fairy', emoji: '🎵', description: 'A balloon Pokémon with soft fur' },
  
  { name: 'Zubat', rarity: 'common', type: 'Flying', emoji: '🦇', description: 'A bat Pokémon' },
  { name: 'Golbat', rarity: 'uncommon', type: 'Flying', emoji: '🦇', description: 'A bat Pokémon with big fangs' },
  { name: 'Oddish', rarity: 'common', type: 'Grass', emoji: '🌱', description: 'A weed Pokémon' },
  { name: 'Gloom', rarity: 'uncommon', type: 'Grass', emoji: '🌺', description: 'A weed Pokémon that smells bad' },
  { name: 'Vileplume', rarity: 'rare', type: 'Grass', emoji: '🌺', description: 'A flower Pokémon with toxic pollen' },
  { name: 'Paras', rarity: 'common', type: 'Bug', emoji: '🍄', description: 'A mushroom Pokémon' },
  { name: 'Parasect', rarity: 'uncommon', type: 'Bug', emoji: '🍄', description: 'A mushroom Pokémon controlled by fungi' },
  { name: 'Venonat', rarity: 'common', type: 'Bug', emoji: '🐛', description: 'An insect Pokémon with big eyes' },
  { name: 'Venomoth', rarity: 'uncommon', type: 'Bug', emoji: '🦋', description: 'A poison moth Pokémon' },
  { name: 'Diglett', rarity: 'common', type: 'Ground', emoji: '🕳️', description: 'A mole Pokémon that lives underground' },
  
  { name: 'Dugtrio', rarity: 'uncommon', type: 'Ground', emoji: '🕳️', description: 'A mole Pokémon with three heads' },
  { name: 'Meowth', rarity: 'common', type: 'Normal', emoji: '😺', description: 'A scratch cat Pokémon' },
  { name: 'Persian', rarity: 'uncommon', type: 'Normal', emoji: '😸', description: 'A classy cat Pokémon' },
  { name: 'Psyduck', rarity: 'common', type: 'Water', emoji: '🦆', description: 'A duck Pokémon with headaches' },
  { name: 'Golduck', rarity: 'uncommon', type: 'Water', emoji: '🦆', description: 'A duck Pokémon with psychic powers' },
  { name: 'Mankey', rarity: 'common', type: 'Fighting', emoji: '🐒', description: 'A pig monkey Pokémon' },
  { name: 'Primeape', rarity: 'uncommon', type: 'Fighting', emoji: '🐒', description: 'A pig monkey Pokémon that's always angry' },
  { name: 'Growlithe', rarity: 'uncommon', type: 'Fire', emoji: '🐕', description: 'A puppy Pokémon' },
  { name: 'Arcanine', rarity: 'rare', type: 'Fire', emoji: '🐕', description: 'A legendary Pokémon with great speed' },
  { name: 'Poliwag', rarity: 'common', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon' },
  
  { name: 'Poliwhirl', rarity: 'uncommon', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon that can walk on land' },
  { name: 'Poliwrath', rarity: 'rare', type: 'Water', emoji: '🐸', description: 'A tadpole Pokémon that's a strong swimmer' },
  { name: 'Abra', rarity: 'uncommon', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon that teleports' },
  { name: 'Kadabra', rarity: 'rare', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon with strong psychic powers' },
  { name: 'Alakazam', rarity: 'legendary', type: 'Psychic', emoji: '🔮', description: 'A psi Pokémon with incredible intelligence' },
  { name: 'Machop', rarity: 'common', type: 'Fighting', emoji: '💪', description: 'A superpower Pokémon' },
  { name: 'Machoke', rarity: 'uncommon', type: 'Fighting', emoji: '💪', description: 'A superpower Pokémon with great strength' },
  { name: 'Machamp', rarity: 'rare', type: 'Fighting', emoji: '💪', description: 'A superpower Pokémon with four arms' },
  { name: 'Bellsprout', rarity: 'common', type: 'Grass', emoji: '🌱', description: 'A flower Pokémon' },
  { name: 'Weepinbell', rarity: 'uncommon', type: 'Grass', emoji: '🌺', description: 'A flycatcher Pokémon' },
  
  { name: 'Victreebel', rarity: 'rare', type: 'Grass', emoji: '🌺', description: 'A flycatcher Pokémon that swallows prey' },
  { name: 'Tentacool', rarity: 'common', type: 'Water', emoji: '🪼', description: 'A jellyfish Pokémon' },
  { name: 'Tentacruel', rarity: 'uncommon', type: 'Water', emoji: '🪼', description: 'A jellyfish Pokémon with 80 tentacles' },
  { name: 'Geodude', rarity: 'common', type: 'Rock', emoji: '🗿', description: 'A rock Pokémon' },
  { name: 'Graveler', rarity: 'uncommon', type: 'Rock', emoji: '🗿', description: 'A rock Pokémon that rolls down hills' },
  { name: 'Golem', rarity: 'rare', type: 'Rock', emoji: '🗿', description: 'A megaton Pokémon with explosive power' },
  { name: 'Ponyta', rarity: 'uncommon', type: 'Fire', emoji: '🐴', description: 'A fire horse Pokémon' },
  { name: 'Rapidash', rarity: 'rare', type: 'Fire', emoji: '🐴', description: 'A fire horse Pokémon that runs very fast' },
  { name: 'Slowpoke', rarity: 'common', type: 'Water', emoji: '🦛', description: 'A dopey Pokémon' },
  { name: 'Slowbro', rarity: 'uncommon', type: 'Water', emoji: '🦛', description: 'A hermit crab Pokémon' },
  
  { name: 'Magnemite', rarity: 'common', type: 'Electric', emoji: '🧲', description: 'A magnet Pokémon' },
  { name: 'Magneton', rarity: 'uncommon', type: 'Electric', emoji: '🧲', description: 'A magnet Pokémon with three units' },
  { name: 'Farfetchd', rarity: 'uncommon', type: 'Flying', emoji: '🦆', description: 'A wild duck Pokémon with a leek' },
  { name: 'Doduo', rarity: 'common', type: 'Flying', emoji: '🦜', description: 'A twin bird Pokémon' },
  { name: 'Dodrio', rarity: 'uncommon', type: 'Flying', emoji: '🦜', description: 'A triple bird Pokémon' },
  { name: 'Seel', rarity: 'common', type: 'Water', emoji: '🦭', description: 'A sea lion Pokémon' },
  { name: 'Dewgong', rarity: 'uncommon', type: 'Water', emoji: '🦭', description: 'A sea lion Pokémon that loves cold water' },
  { name: 'Grimer', rarity: 'common', type: 'Poison', emoji: '☢️', description: 'A sludge Pokémon' },
  { name: 'Muk', rarity: 'uncommon', type: 'Poison', emoji: '☢️', description: 'A sludge Pokémon made of toxic waste' },
  { name: 'Shellder', rarity: 'common', type: 'Water', emoji: '🐚', description: 'A bivalve Pokémon' },
  
  { name: 'Cloyster', rarity: 'uncommon', type: 'Water', emoji: '🐚', description: 'A bivalve Pokémon with spikes' },
  { name: 'Gastly', rarity: 'common', type: 'Ghost', emoji: '👻', description: 'A gas Pokémon' },
  { name: 'Haunter', rarity: 'uncommon', type: 'Ghost', emoji: '👻', description: 'A gas Pokémon that hides in darkness' },
  { name: 'Gengar', rarity: 'rare', type: 'Ghost', emoji: '👻', description: 'A shadow Pokémon that lurks in rooms' },
  { name: 'Onix', rarity: 'uncommon', type: 'Rock', emoji: '🐍', description: 'A rock snake Pokémon' },
  { name: 'Drowzee', rarity: 'common', type: 'Psychic', emoji: '😴', description: 'A hypnosis Pokémon' },
  { name: 'Hypno', rarity: 'uncommon', type: 'Psychic', emoji: '😴', description: 'A hypnosis Pokémon with a pendulum' },
  { name: 'Krabby', rarity: 'common', type: 'Water', emoji: '🦀', description: 'A river crab Pokémon' },
  { name: 'Kingler', rarity: 'uncommon', type: 'Water', emoji: '🦀', description: 'A pincer Pokémon with strong claws' },
  { name: 'Voltorb', rarity: 'common', type: 'Electric', emoji: '⚡', description: 'A ball Pokémon that looks like a Poké Ball' },
  
  { name: 'Electrode', rarity: 'uncommon', type: 'Electric', emoji: '⚡', description: 'A ball Pokémon that explodes' },
  { name: 'Exeggcute', rarity: 'common', type: 'Grass', emoji: '🥚', description: 'An egg Pokémon' },
  { name: 'Exeggutor', rarity: 'uncommon', type: 'Grass', emoji: '🌴', description: 'A coconut Pokémon with three heads' },
  { name: 'Cubone', rarity: 'common', type: 'Ground', emoji: '🦴', description: 'A lonely Pokémon that wears a skull' },
  { name: 'Marowak', rarity: 'uncommon', type: 'Ground', emoji: '🦴', description: 'A bone keeper Pokémon' },
  { name: 'Hitmonlee', rarity: 'rare', type: 'Fighting', emoji: '🥋', description: 'A kicking Pokémon' },
  { name: 'Hitmonchan', rarity: 'rare', type: 'Fighting', emoji: '🥊', description: 'A punching Pokémon' },
  { name: 'Lickitung', rarity: 'uncommon', type: 'Normal', emoji: '👅', description: 'A licking Pokémon' },
  { name: 'Koffing', rarity: 'common', type: 'Poison', emoji: '☁️', description: 'A poison gas Pokémon' },
  { name: 'Weezing', rarity: 'uncommon', type: 'Poison', emoji: '☁️', description: 'A poison gas Pokémon with two heads' },
  
  { name: 'Rhyhorn', rarity: 'common', type: 'Rock', emoji: '🦏', description: 'A spikes Pokémon' },
  { name: 'Rhydon', rarity: 'uncommon', type: 'Rock', emoji: '🦏', description: 'A drill Pokémon with a horn' },
  { name: 'Chansey', rarity: 'rare', type: 'Normal', emoji: '🩷', description: 'An egg Pokémon that brings happiness' },
  { name: 'Tangela', rarity: 'uncommon', type: 'Grass', emoji: '🌿', description: 'A vine Pokémon covered in vines' },
  { name: 'Kangaskhan', rarity: 'rare', type: 'Normal', emoji: '🦘', description: 'A parent Pokémon with a pouch' },
  { name: 'Horsea', rarity: 'common', type: 'Water', emoji: '🐴', description: 'A dragon Pokémon' },
  { name: 'Seadra', rarity: 'uncommon', type: 'Water', emoji: '🐴', description: 'A dragon Pokémon with poison spikes' },
  { name: 'Goldeen', rarity: 'common', type: 'Water', emoji: '🐠', description: 'A goldfish Pokémon' },
  { name: 'Seaking', rarity: 'uncommon', type: 'Water', emoji: '🐠', description: 'A goldfish Pokémon with a horn' },
  { name: 'Staryu', rarity: 'common', type: 'Water', emoji: '⭐', description: 'A star shape Pokémon' },
  
  { name: 'Starmie', rarity: 'uncommon', type: 'Water', emoji: '⭐', description: 'A mysterious Pokémon with a gem' },
  { name: 'Mr. Mime', rarity: 'rare', type: 'Psychic', emoji: '🎭', description: 'A barrier Pokémon that mimes' },
  { name: 'Scyther', rarity: 'rare', type: 'Bug', emoji: '🦂', description: 'A mantis Pokémon with scythe arms' },
  { name: 'Jynx', rarity: 'rare', type: 'Ice', emoji: '💋', description: 'A human shape Pokémon' },
  { name: 'Electabuzz', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'An electric Pokémon' },
  { name: 'Magmar', rarity: 'rare', type: 'Fire', emoji: '🔥', description: 'A spitfire Pokémon' },
  { name: 'Pinsir', rarity: 'rare', type: 'Bug', emoji: '🪲', description: 'A stag beetle Pokémon' },
  { name: 'Tauros', rarity: 'rare', type: 'Normal', emoji: '🐂', description: 'A wild bull Pokémon' },
  { name: 'Magikarp', rarity: 'common', type: 'Water', emoji: '🐟', description: 'A fish Pokémon that splashes' },
  { name: 'Gyarados', rarity: 'legendary', type: 'Water', emoji: '🐉', description: 'An atrocious Pokémon' },
  
  { name: 'Lapras', rarity: 'legendary', type: 'Water', emoji: '🦕', description: 'A transport Pokémon' },
  { name: 'Ditto', rarity: 'rare', type: 'Normal', emoji: '🟣', description: 'A transform Pokémon' },
  { name: 'Eevee', rarity: 'rare', type: 'Normal', emoji: '🦊', description: 'An evolution Pokémon' },
  { name: 'Vaporeon', rarity: 'rare', type: 'Water', emoji: '🌊', description: 'A bubble jet Pokémon' },
  { name: 'Jolteon', rarity: 'rare', type: 'Electric', emoji: '⚡', description: 'A lightning Pokémon' },
  { name: 'Flareon', rarity: 'rare', type: 'Fire', emoji: '🔥', description: 'A flame Pokémon' },
  { name: 'Porygon', rarity: 'rare', type: 'Normal', emoji: '🔷', description: 'A virtual Pokémon' },
  { name: 'Omanyte', rarity: 'rare', type: 'Rock', emoji: '🐚', description: 'A spiral Pokémon' },
  { name: 'Omastar', rarity: 'rare', type: 'Rock', emoji: '🐚', description: 'A spiral Pokémon with tentacles' },
  { name: 'Kabuto', rarity: 'rare', type: 'Rock', emoji: '🦀', description: 'A shellfish Pokémon' },
  
  { name: 'Kabutops', rarity: 'rare', type: 'Rock', emoji: '🦀', description: 'A shellfish Pokémon with scythes' },
  { name: 'Aerodactyl', rarity: 'legendary', type: 'Rock', emoji: '🦕', description: 'A fossil Pokémon' },
  { name: 'Snorlax', rarity: 'legendary', type: 'Normal', emoji: '😴', description: 'A sleeping Pokémon' },
  { name: 'Articuno', rarity: 'legendary', type: 'Ice', emoji: '🧊', description: 'A freeze Pokémon' },
  { name: 'Zapdos', rarity: 'legendary', type: 'Electric', emoji: '⚡', description: 'An electric Pokémon' },
  { name: 'Moltres', rarity: 'legendary', type: 'Fire', emoji: '🔥', description: 'A flame Pokémon' },
  { name: 'Dratini', rarity: 'rare', type: 'Dragon', emoji: '🐉', description: 'A dragon Pokémon' },
  { name: 'Dragonair', rarity: 'rare', type: 'Dragon', emoji: '🐉', description: 'A dragon Pokémon with orbs' },
  { name: 'Dragonite', rarity: 'legendary', type: 'Dragon', emoji: '🐉', description: 'A dragon Pokémon that can circle the globe' },
  { name: 'Mewtwo', rarity: 'legendary', type: 'Psychic', emoji: '🔮', description: 'A genetic Pokémon' },
  
  { name: 'Mew', rarity: 'legendary', type: 'Psychic', emoji: '🌟', description: 'A new species Pokémon' }
];

// Team Rocket Pokemon and battle system
const rocketPokemon = [
  { name: 'Ekans', emoji: '🐍', level: 5 },
  { name: 'Koffing', emoji: '☁️', level: 5 },
  { name: 'Meowth', emoji: '😺', level: 10 }
];

// Special encounter Pokemon for specific achievements
const specialEncounters = {
  firstCatch: ['Pikachu', 'Eevee', 'Ditto'],
  streakReward: ['Charizard', 'Blastoise', 'Venusaur'],
  legendary: ['Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew']
};

// Pokemon type effectiveness (simplified)
const typeEffectiveness = {
  'Fire': { strong: ['Grass', 'Bug', 'Ice'], weak: ['Water', 'Rock'] },
  'Water': { strong: ['Fire', 'Rock', 'Ground'], weak: ['Grass', 'Electric'] },
  'Grass': { strong: ['Water', 'Rock', 'Ground'], weak: ['Fire', 'Bug', 'Flying'] },
  'Electric': { strong: ['Water', 'Flying'], weak: ['Ground'] },
  'Flying': { strong: ['Grass', 'Bug', 'Fighting'], weak: ['Electric', 'Rock'] },
  'Bug': { strong: ['Grass', 'Psychic'], weak: ['Fire', 'Flying', 'Rock'] },
  'Normal': { strong: [], weak: ['Fighting'] },
  'Fighting': { strong: ['Normal', 'Rock'], weak: ['Flying', 'Psychic'] },
  'Poison': { strong: ['Grass'], weak: ['Ground', 'Psychic'] },
  'Ground': { strong: ['Electric', 'Fire', 'Poison', 'Rock'], weak: ['Water', 'Grass'] },
  'Rock': { strong: ['Fire', 'Flying', 'Bug'], weak: ['Water', 'Grass', 'Fighting', 'Ground'] },
  'Psychic': { strong: ['Fighting', 'Poison'], weak: ['Bug', 'Ghost'] },
  'Ice': { strong: ['Grass', 'Ground', 'Flying', 'Dragon'], weak: ['Fire', 'Fighting', 'Rock'] },
  'Dragon': { strong: ['Dragon'], weak: ['Ice', 'Dragon'] },
  'Ghost': { strong: ['Psychic', 'Ghost'], weak: ['Ghost'] },
  'Fairy': { strong: ['Fighting', 'Dragon'], weak: ['Poison'] }
};

// Habitat-based Pokemon encounters
const habitatPokemon = {
  'forest': ['Caterpie', 'Weedle', 'Pidgey', 'Oddish', 'Bellsprout', 'Zubat'],
  'water': ['Squirtle', 'Psyduck', 'Poliwag', 'Tentacool', 'Magikarp', 'Goldeen'],
  'mountain': ['Geodude', 'Machop', 'Graveler', 'Onix', 'Rhyhorn'],
  'cave': ['Zubat', 'Geodude', 'Gastly', 'Onix', 'Machop'],
  'grass': ['Bulbasaur', 'Caterpie', 'Oddish', 'Bellsprout', 'Tangela'],
  'urban': ['Pidgey', 'Rattata', 'Meowth', 'Grimer', 'Voltorb']
};

// Rarity weights for random encounters
const rarityWeights = {
  'common': 0.65,
  'uncommon': 0.25,
  'rare': 0.08,
  'legendary': 0.02
};

// Evolution chains (simplified)
const evolutionChains = {
  'Bulbasaur': 'Ivysaur',
  'Ivysaur': 'Venusaur',
  'Charmander': 'Charmeleon',
  'Charmeleon': 'Charizard',
  'Squirtle': 'Wartortle',
  'Wartortle': 'Blastoise',
  'Caterpie': 'Metapod',
  'Metapod': 'Butterfree',
  'Weedle': 'Kakuna',
  'Kakuna': 'Beedrill'
  // Add more as needed
};

// Pokemon that can be found in eggs
const eggPokemon = {
  'common': ['Caterpie', 'Weedle', 'Pidgey', 'Rattata', 'Spearow'],
  'uncommon': ['Pikachu', 'Clefairy', 'Jigglypuff', 'Psyduck', 'Mankey'],
  'rare': ['Eevee', 'Ditto', 'Porygon', 'Aerodactyl', 'Snorlax']
};

// Special shiny variants (very rare)
const shinyVariants = {
  'Pikachu': '✨⚡',
  'Charizard': '✨🐲',
  'Gyarados': '✨🐉',
  'Mewtwo': '✨🔮'
};

// Functions for Pokemon management
function getPokemonByName(name) {
  return creatures.find(p => p.name === name);
}

function getPokemonByType(type) {
  return creatures.filter(p => p.type === type);
}

function getPokemonByRarity(rarity) {
  return creatures.filter(p => p.rarity === rarity);
}

function getRandomPokemon(rarity = null) {
  if (rarity) {
    const pokemonOfRarity = getPokemonByRarity(rarity);
    return pokemonOfRarity[Math.floor(Math.random() * pokemonOfRarity.length)];
  }
  
  // Use rarity weights
  const random = Math.random();
  let targetRarity = 'common';
  
  if (random < rarityWeights.legendary) targetRarity = 'legendary';
  else if (random < rarityWeights.legendary + rarityWeights.rare) targetRarity = 'rare';
  else if (random < rarityWeights.legendary + rarityWeights.rare + rarityWeights.uncommon) targetRarity = 'uncommon';
  
  return getRandomPokemon(targetRarity);
}

function canEvolve(pokemonName) {
  return evolutionChains.hasOwnProperty(pokemonName);
}

function getEvolution(pokemonName) {
  return evolutionChains[pokemonName];
}

function isShiny() {
  return Math.random() < 0.001; // 0.1% chance
}

function getHabitatPokemon(habitat) {
  const habitatList = habitatPokemon[habitat] || habitatPokemon.grass;
  return habitatList[Math.floor(Math.random() * habitatList.length)];
}
