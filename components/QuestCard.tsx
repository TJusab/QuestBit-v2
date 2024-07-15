// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import { Quest } from "@/constants/types";

// interface QuestCardProps {
//   item: Quest;
//   onUpdate: () => void;
// }

// const QuestCard: React.FC<QuestCardProps> = ({ item, onUpdate }) => {
//   const handleQuestPress = (quest: Quest) => {
//     console.log("Quest Pressed:", quest);
//   };

//   const handleMoreOptionsPress = (quest: Quest) => {
//     setQuestToDelete(quest);
//     setDeleteModalVisible(true);
//   };

//   return (
//     <TouchableOpacity
//       className="mb-5 p-5 bg-blue-200 rounded-xl mx-5"
//       onPress={() => handleQuestPress(item)}
//     >
//       <View className="flex-row justify-between items-center">
//         {icons[item.$id] && (
//           <Image source={icons[item.$id]} style={{ width: 48, height: 48 }} />
//         )}
//         <TouchableOpacity
//           onPress={() => handleMoreOptionsPress(item)}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <Icon name="ellipsis-v" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//       <View className="py-4 flex-1">
//         <Text className="font-press text-xl" style={globalStyles.questTitle}>
//           {item.title}
//         </Text>
//         <Text className="font-zcool text-lg text-white">{item.questInfo}</Text>
//       </View>
//       <View style={globalStyles.progress_bar}>
//         <View style={[globalStyles.progress, { width: `${item.progress}%` }]} />
//       </View>
//       <View className="flex-row justify-between items-center">
//         <Text className="font-zcool text-lg text-white">Progress</Text>
//         <Text className="font-zcool text-lg text-white">{item.progress}%</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default QuestCard;
