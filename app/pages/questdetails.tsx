// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const QuestDetails = ({ route, navigation }) => {
//   const { item } = route.params;

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
//         <MaterialIcons name="keyboard-backspace" size={30} color="black" />
//         <AntDesign name="form" size={25} color="black" />
//       </View>
//       <Text style={styles.header}>Quest Details</Text>
//       <View style={styles.section}>
//         <Text style={styles.label}>Title</Text>
//         <Text style={styles.title}>{item.title}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>Icon</Text>
//         <Image source={require("../../assets/HD/chest.png")} style={styles.character} resizeMode='stretch' />
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>Target Date</Text>
//         <View style={styles.row}>
//           <MaterialIcons name="event" size={20} color="black" />
//           <Text style={styles.value}>{item.dueDates[0].substring(0, 10)}</Text>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>Description</Text>
//         <Text style={styles.value}>{item.description}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>Owner(s)</Text>
//         <View style={styles.row}>
//           <View style={styles.assignee}>
//             <Image source={require("../../assets/HD/character_48X48.png")} style={styles.character} resizeMode='stretch' />
//             <Text style={styles.username}>{item.owner.username}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>Adventurer(s)</Text>
//         <View style={styles.row}>
//           {item.adventurers.map(assignee => (
//             <View key={assignee.id} style={styles.assignee}>
//               <Image source={require("../../assets/HD/character_48X48.png")} style={styles.character} resizeMode='stretch' />
//               <Text style={styles.username}>{assignee.username}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.label}>QuestBit Diary</Text>
//       </View>
//       <View style={styles.log}>
//         <Image source={require("../../assets/HD/scroll.png")} style={styles.scroll} resizeMode='stretch' />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//   },
//   header: {
//     fontSize: 18,
//     marginTop: 20,
//     marginBottom: 20,
//     fontFamily: 'PressStart2P',
//     color: 'black',
//   },
//   section: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     fontFamily: 'ZCOOL',
//     color: 'grey',
//     marginBottom: 8,
//   },
//   title: {
//     fontFamily: 'ZCOOL',
//     fontSize: 40,
//     marginTop: -8,
//   },
//   username: {
//     fontFamily: 'ZCOOL',
//     marginBottom: 7,
//     fontSize: 18,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   log: {
//     height: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   scroll: {
//     width: '100%',
//     height: '100%',
//     marginBottom: 10,
//   },
//   character: {
//     width: 90,
//     height: 90,
//     marginBottom: 10,
//   },
// });

// export default QuestDetails;
