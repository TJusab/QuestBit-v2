import { Models } from "react-native-appwrite";
import { User, Quest, QuestBit, Friendship } from "../constants/types";
import { FriendshipStatus, Status, Difficulty } from "@/constants/enums";

export function documentToUser(document: Models.Document): User {
    if ('username' in document && 'email' in document && 'icon' in document) {
        return document as unknown as User;
    } else {
        throw new Error('Document does not match User type');
    }
}

export function documentToQuest(document: Models.Document): Quest {
    return {
        $id: document.$id as unknown as string,
        owner: documentToUser(document.owner),
        title: document.title,
        progress: document.progress,
        icon: document.icon,
        questInfo: document.questInfo,
        deadline: document.deadline,
        adventurers: document.adventurers ? document.adventurers.map((adventurer: Models.Document) => documentToUser(adventurer)) : [],
        questbits: document.questbits ? document.questbits.map((questbit: Models.Document) => documentToQuestBit(questbit)) : [],
    };
}

export function documentToQuestBit(document: Models.Document): QuestBit {
    const questBit: QuestBit = {
        $id: document.$id as unknown as string,
        title: document.title,
        tags: document.tags ? document.tags : null,
        status: document.status as Status,
        difficulty: document.difficulty as Difficulty,
        description: document.description,
        assignees: document.assignees ? document.assignees.map((assignee: Models.Document) => documentToUser(assignee)) : [],
        dueDates: document.dueDates ? document.dueDates.map((dueDate: string) => new Date(dueDate)) : [],
        quests: document.quests
    };

    return questBit;
}

export function documentToFriendship(document: Models.Document): Friendship {
    const friendship: Friendship = {
        $id: document.$id as unknown as string,
        user1: document["userID-1"] as unknown as string,
        user2: document["userID-2"] as unknown as string,
        startOfFriendship: document.startOfFriendship,
        status: document.status as FriendshipStatus,
        user: document.user,
    };

    return friendship;
}