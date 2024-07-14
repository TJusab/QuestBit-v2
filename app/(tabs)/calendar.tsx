// import React, { useState, useEffect, useCallback } from "react";
// import { View, Text, FlatList } from "react-native";
// import { Calendar, DateData } from "react-native-calendars";
// import {
//   getQuestBits,
//   getQuestBitsForUser,
//   getQuests,
// } from "../../lib/database";
// import { getQuestColor } from "../../lib/icon";
// import moment from "moment";
// import QuestBitCard from "../../components/QuestBitComponent";
// import Header from "../../components/Header";
// import { QuestBit } from "../../constants/types";

// interface MarkedDate {
//   dots: { color: string }[];
//   selected?: boolean;
// }

// const CustomCalendar: React.FC = () => {
//   const [questbits, setQuestBits] = useState<QuestBit[]>([]);
//   const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>(
//     {}
//   );
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedQuestbits, setSelectedQuestbits] = useState<QuestBit[]>([]);

//   useEffect(() => {
//     // Simulated fetch from database
//     const fetchQuestBits = async () => {
//       try {
//         const response = await getQuestBitsForUser();

//         setQuestBits(response);
//         const newMarkedDates = {};

//         response.forEach((questbit) => {
//           if (questbit.dueDates && questbit.dueDates.length > 0) {
//             const questColor = getQuestColor(questbit.quests.icon);
//             const formattedDate = moment(questbit.dueDates[0]).format(
//               "YYYY-MM-DD"
//             );
//             if (!newMarkedDates[formattedDate]) {
//               newMarkedDates[formattedDate] = { dots: [] };
//             }
//             newMarkedDates[formattedDate].dots.push({ color: questColor });
//           }
//         });
//         setMarkedDates(newMarkedDates);
//       } catch (error) {
//         console.error("Error fetching quests:", error);
//       }
//     };

//     fetchQuestBits();
//   }, []);

//   const handleDayPress = (day: DateData) => {
//     setSelectedDate(day.dateString);
//     const questbitsForSelectedDate = questbits.filter((questbit) => {
//       if (questbit.dueDates && questbit.dueDates.length > 0) {
//         moment(questbit.dueDates[0]).format("YYYY-MM-DD") === day.dateString;
//       }
//     });
//     setSelectedQuestbits(questbitsForSelectedDate);
//   };

//   const customTheme = {
//     textMonthFontFamily: "ZCOOL",
//     textDayFontFamily: "ZCOOL",
//     textDayHeaderFontFamily: "ZCOOL",
//     textSectionTitleColor: "#b6c1cd",
//     todayTextColor: "#6abe30",
//     selectedDayBackgroundColor: "#6abe30",
//     arrowColor: "#2E3A59",
//     dayTextColor: "#2E3A59",
//     textMonthFontSize: 20,
//     textDayFontSize: 16,
//     textDayHeaderFontSize: 14,
//   };

//   const renderCustomHeader = (date: moment.Moment) => {
//     const monthName = date.toString("MMMM yyyy");
//     return (
//       <View>
//         <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
//       </View>
//     );
//   };

//   const renderQuestBit = ({ item }: { item: QuestBit}) => <QuestBitCard item={item} />;

//   return (
//     <View>
//       <Header header={"Calendar !"} />
//       <View className="w-[90%] mx-auto rounded-xl bg-white border">
//         <Calendar
//           theme={customTheme}
//           renderHeader={renderCustomHeader}
//           monthFormat={"yyyy MM"}
//           hideArrows={false}
//           hideExtraDays={true}
//           disableMonthChange={false}
//           firstDay={1}
//           hideDayNames={false}
//           showWeekNumbers={false}
//           onPressArrowLeft={(subtractMonth) => subtractMonth()}
//           onPressArrowRight={(addMonth) => addMonth()}
//           disableAllTouchEventsForDisabledDays={true}
//           enableSwipeMonths={true}
//           onDayPress={handleDayPress}
//           markingType={"multi-dot"}
//           markedDates={{
//             ...markedDates,
//             [selectedDate]: { ...markedDates[selectedDate], selected: true },
//           }}
//         />
//       </View>
//       <FlatList
//         data={selectedQuestbits}
//         keyExtractor={(questbit) => questbit.$id}
//         renderItem={renderQuestBit}
//       />
//     </View>
//   );
// };

// export default CustomCalendar;
