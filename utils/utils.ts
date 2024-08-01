import { QuestBit } from "@/constants/types";
import { Difficulty, RecurrenceValue, Status, UserIcon } from "../constants/enums";

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

export const getColorFromDifficulty = (status: Difficulty) => {
  switch (status) {
    case Difficulty.Easy:
      return "yellow";
    case Difficulty.EasyPeasy:
      return "blue";
    case Difficulty.Medium:
      return "pink";
    case Difficulty.Hard:
      return "green";
    case Difficulty.ExtremelyHard:
      return "green";
    case Difficulty.DieHard:
      return "green";
  }
};

export const getPointsFromDifficulty = (status: Difficulty) => {
  switch (status) {
    case Difficulty.Easy:
      return "50";
    case Difficulty.EasyPeasy:
      return "100";
    case Difficulty.Medium:
      return "200";
    case Difficulty.Hard:
      return "300";
    case Difficulty.ExtremelyHard:
      return "350";
    case Difficulty.DieHard:
      return "400";
  }
};

export const getTextFromDates = (dueDates: Date[]) => {
  switch(dueDates.length) {
    case 1:
      return "Does not repeat";
    default:
      return "Repeats";
  }
};

export const getColorFromRecurrence = (rec: string): "red" | "blue" | "pink" | "yellow" | "green" => {
  switch (rec) {
    case "Does not repeat":
      return "red";
    case "Weekly":
      return "blue";
    case "Biweekly":
      return "pink";
    case "Monthly":
      return "yellow";
    default:
      return "green";
  }
};

export const getColorFromDates = (dueDates: Date[]) => {
  switch(dueDates.length) {
    case 1:
      return "red";
    default:
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
