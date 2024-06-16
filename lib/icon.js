// Define a static map for user icons
const userIconMap = {
    woman: require("../assets/HD/character_48X48.png"),
    // Add all other user icons here...
    default: require("../assets/HD/character_48X48.png")
};

// Define a static map for quest icons
const questIconMap = {
    chest: require("../assets/HD/chest.png"),
    // Add all other quest icons here...
    default: require("../assets/HD/chest.png")
};

// Function to get user icon
export async function getUserIcon(icon) {
    return userIconMap[icon] || userIconMap.default;
}

// Function to get quest icon
export async function getQuestIcon(icon) {
    return questIconMap[icon] || questIconMap.default;
}
