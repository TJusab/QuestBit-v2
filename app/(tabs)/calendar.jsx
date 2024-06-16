import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomCalendar from '../../components/CustomCalendar';

const CalendarView = () => {
  return (
    <View className="mt-20" style={styles.container}>
      <CustomCalendar />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    width: '90%', // Set the desired width here
    alignSelf: 'center', // Center the calendar horizontally
  },
});

export default CalendarView;
