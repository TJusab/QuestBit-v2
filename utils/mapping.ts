import { Models } from "react-native-appwrite";
import { User, Quest, QuestBit } from "../constants/types";

export function documentToUser(document: Models.Document): User {
    if ('username' in document && 'email' in document && 'icon' in document) {
        return document as unknown as User;
    } else {
        throw new Error('Document does not match User type');
    }
}

export function documentToQuest(document: Models.Document): Quest {
    return {
        $id: document.$id as unknown as number,
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
    return {
        $id: document.$id as unknown as number,
        title: document.title,
        tags: document.tags ? document.tags : null,
        status: document.status,
        description: document.description,
        assignees: document.assignees ? document.assignees.map((assignee: Models.Document) => documentToUser(assignee)) : [],
        dueDates: document.dueDates ? document.dueDates : null,
        quests: document.quests
    };
}