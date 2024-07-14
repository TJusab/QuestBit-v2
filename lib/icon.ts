import { UserIcon, QuestIcon } from "../constants/enums";
import { ImageSourcePropType } from "react-native";

/**
 * Gets the specific image source of a user icon
 * @param icon the user icon
 * @returns the image source of the icon
 */
export function getUserIcon(icon: UserIcon): ImageSourcePropType {
  switch (icon) {
    case UserIcon.Woman:
      return require("../assets/HD/characters/witch_headshot.png");
    case UserIcon.Man:
      return require("../assets/HD/characters/fairy_headshot.png");
    default:
      return require("../assets/HD/characters/witch_headshot.png");
  }
}

/**
 * Gets the specific image source of a quest icon
 * @param icon the quest icon
 * @returns the image source of the icon
 */
export function getQuestIcon(icon: QuestIcon): ImageSourcePropType {
  switch (icon) {
    case QuestIcon.Chest:
      return require("../assets/HD/chest.png");
    default:
      return require("../assets/HD/chest.png");
  }
}

/**
 * Gets the specific color of a quest icon
 * @param icon the quest icon
 * @returns the color associated with the icon
 */
export function getQuestColor(icon: QuestIcon): string {
  switch (icon) {
    case QuestIcon.Chest:
      return "brown";
    default:
      return "green";
  }
}

/**
 * Gets all existing quest icons
 * @returns array of all existing quest icons
 */
export function getIcons(): QuestIcon[] {
  return Object.values(QuestIcon);
}