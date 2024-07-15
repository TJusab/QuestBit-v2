// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ImageSourcePropType,
// } from "react-native";
// import React, { useCallback, useState } from "react";
// import { getQuests, deleteQuest } from "../../lib/database";
// import { getQuestIcon } from "../../lib/icon";
// import Header from "../../components/Header";
// import { useFocusEffect, router } from "expo-router";
// import DeletePopUp from "../../components/DeletePopUp";
// import { Quest } from "@/constants/types";
// import QuestCard from "@/components/QuestCard";

// interface QuestItem {
//   item: Quest;
// }

// const Quest = () => {
//   const [quests, setQuests] = useState<Quest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [icons, setIcons] = useState<{ [key: string]: ImageSourcePropType }>(
//     {}
//   );
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [questToDelete, setQuestToDelete] = useState<Quest | null>(null);

//   const fetchQuestsAndIcons = async () => {
//     try {
//       // Fetch quests
//       const response: Quest[] = await getQuests();
//       setQuests(response); // Set the quests state with the response

//       // Fetch icons
//       const iconsToFetch: { [key: string]: ImageSourcePropType } = {};
//       for (const quest of response) {
//         const questIcon = getQuestIcon(quest.icon);
//         iconsToFetch[quest.$id] = questIcon;
//       }
//       setIcons(iconsToFetch);
//     } catch (error) {
//       Alert.alert("Error", (error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchQuestsAndIcons();
//     }, [])
//   );

//   const handleQuestUpdate = async () => {
//     await getQuests();
//   };

//   const handleDelete = async () => {
//     try {
//       if (questToDelete) {
//         await deleteQuest(questToDelete.$id);
//       }
//       fetchQuestsAndIcons();
//       setDeleteModalVisible(false);
//     } catch (error) {
//       console.error("Error deleting quest:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <View
//         className="flex-1 align-items-center"
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//       >
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View className="bg-blue-50 h-full">
//       <FlatList
//         data={quests}
//         keyExtractor={(item) => item.$id}
//         renderItem={({ item }) => (
//           <QuestCard item={item} onUpdate={handleQuestUpdate} />
//         )}
//         ListHeaderComponent={() => <Header header={"My Quests !"} />}
//       />
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => router.push("/pages/create_quest")}
//       >
//         <Image
//           source={require("../../assets/HD/add_circle_button.png")}
//           style={{ width: 48, height: 48 }}
//         />
//       </TouchableOpacity>
//       {questToDelete && (
//         <DeletePopUp
//           visible={deleteModalVisible}
//           onClose={() => setDeleteModalVisible(false)}
//           handleDelete={handleDelete}
//           text="Are you sure you want to delete this Quest?"
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   addButton: {
//     position: "absolute",
//     bottom: 30,
//     right: 30,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
// });

// export default Quest;
