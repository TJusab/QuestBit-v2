import { RecurrenceValue, Status } from "../constants/enums";

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

export const getIconButtonImage = (icon: "accept" | "reject") => {
  switch (icon) {
    case "accept":
      return require("../assets/HD/accept.png");
    case "reject":
      return require("../assets/HD/reject.png");
    default:
      return require("../assets/HD/accept.png");
  }
}

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

export const getStringFromStatus = (status: Status): string => {
  switch (status) {
    case Status.OnGoing:
      return "On Going";
    default:
      return status as string;
  }
}

export const getEnumFromStatus = (status: string): Status => {
  switch (status) {
    case "OnGoing" || "On Going":
      return Status.OnGoing;
    case "Unassigned":
      return Status.Unassigned;
    case "Assigned":
      return Status.Assigned;
    case "Completed":
      return Status.Completed;
    default:
      throw new Error(`Invalid status value: ${status}`);
  }
}
