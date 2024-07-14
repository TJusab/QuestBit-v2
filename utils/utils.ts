import { Status } from "../constants/enums";

export const getButtonImage = (color: "red" | "blue" | "pink" | "yellow" | "green") => {
  switch (color) {
    case "red":
      return require("../assets/HD/button_red.png");
    case "blue":
      return require("../assets/HD/button_blue.png");
    case "pink":
      return require("../assets/HD/button_pink.png");
    case "yellow":
      return require("../assets/HD/button_yellow.png");
    case "green":
    default:
      return require("../assets/HD/button_green.png");
  }
};

export const getColorFromStatus = (status: Status) => {
  switch (status) {
    case Status.Unassigned:
      return "yellow";
    case Status.OnGoing:
      return "blue";
    case Status.Assigned:
      return "pink";
    case Status.Completed:
      return "green";
  }
};