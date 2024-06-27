// import React, { useState } from 'react';
// import { StyleSheet, Alert } from 'react-native';
// // import { SelectCountry } from 'react-native-element-dropdown';
// import { getAllQuests } from '../lib/database';

// const local_data = [
//   {
//     value: '1',
//     label: 'Country 1',
//     image: {
//       uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
//     },
//   },
//   {
//     value: '2',
//     label: 'Country 2',
//     image: {
//       uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
//     },
//   },
//   {
//     value: '3',
//     label: 'Country 3',
//     image: {
//       uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
//     },
//   },
//   {
//     value: '4',
//     label: 'Country 4',
//     image: {
//       uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
//     },
//   },
//   {
//     value: '5',
//     label: 'Country 5',
//     image: {
//       uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
//     },
//   },
// ];
  
// const SelectCountryScreen = _props => {
//   const [country, setCountry] = useState('1');
//   const questTitles = [];
//   const icons = [];

//   const fetchAllQuestsAndIcons = async () => {
//     try {
//         // Fetch quests
//         const quests = await getAllQuests();
//         for (const quest of quests) {
//             questTitles.push(quest.title);
//             icons.push(quest.icon)
//         }
//     } catch (error) {
//         Alert.alert('Error', error.message);
//     }
//   }

//   fetchAllQuestsAndIcons();

//   const [quest, setQuest] = useState('All');

//   return (
//     <SelectCountry
//       style={styles.dropdown}
//       selectedTextStyle={styles.selectedTextStyle}
//       placeholderStyle={styles.placeholderStyle}
//       imageStyle={styles.imageStyle}
//       iconStyle={styles.iconStyle}
//       maxHeight={200}
//       value={quest}
//       data={local_data}
//       valueField="value"
//       labelField="label"
//       imageField="image"
//       placeholder="Select Quest"
//       onChange={e => {
//         setQuest(e.value);
//       }}
//     />
//   );
// };

// export default SelectCountryScreen;

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     width: 150,
//     backgroundColor: '#EEEEEE',
//     borderRadius: 22,
//     paddingHorizontal: 8,
//   },
//   imageStyle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
// });
