// Define a static map for user icons
const userIconMap = {
    "Woman": require("../assets/HD/characters/witch_headshot.png"),
    "Man": require("../assets/HD/magicien.png"),
    "Default": require("../assets/HD/characters/witch_headshot.png")
  };
  
  // Define a static map for quest icons
  const questIconMap = {
    "Chest": require("../assets/HD/chest.png"),
    // Add all other quest icons here...
    "Default": require("../assets/HD/chest.png")
  };
  // Define a static map for quest icons
  const questColorMap = {
    "Chest": "brown",
    // Add all other quest icons here...
    "Default": "green"
  };
  
  // Function to get user icon
  export function getUserIcon(icon) {
    return userIconMap[icon] || userIconMap['default'];
  }
  
  // Function to get quest icon
  export function getQuestIcon(icon) {
    return questIconMap[icon] || questIconMap['default'];
  }
  // Function to get quest icon
  export function getQuestColor(icon) {
    return questColorMap[icon] || questColorMap['default'];
  }
  
  