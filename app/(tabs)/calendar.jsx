import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getQuests } from '../../lib/database';
import { getQuestColor } from '../../lib/icon';
import moment from 'moment';
import QuestBit from "../../components/QuestBit";
import { globalStyles } from '../global_css';

const CustomCalendar = () => {
    const [quests, setQuests] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
    const [selectedQuestbits, setSelectedQuestbits] = useState([]); // State to store selected questbits
    
    useEffect(() => {
        // Simulated fetch from database
        const fetchQuestBits = async () => {
            try {
                // Replace this with your actual fetch logic
                const response = await getQuests(); // Replace with your fetch function
                setQuests(response); // Update state with fetched quests
                // Update marked dates
                const newMarkedDates = {};
                response.forEach((quest) => {
                    const questColor = getQuestColor(quest.icon)
                    console.log(quest.title);
                    quest.questbits.forEach((questbit) => {
                        const formattedDate = moment(questbit.dueDates[0]).format('YYYY-MM-DD');
                        
                        if (!newMarkedDates[formattedDate]) {
                            newMarkedDates[formattedDate] = { dots: [] };
                        }
                        newMarkedDates[formattedDate].dots.push({ color: questColor });
                    });
                });
                setMarkedDates(newMarkedDates);
            } catch (error) {
                console.error('Error fetching quests:', error);
            }
        };

        fetchQuestBits();
    }, []);

    // Function to handle day press
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        const questbitsForSelectedDate = quests
            .flatMap(quest => quest.questbits)
            .filter(questbit => moment(questbit.dueDates[0]).format('YYYY-MM-DD') === day.dateString);
        setSelectedQuestbits(questbitsForSelectedDate);
    };

    // Define a custom theme with your desired font family
    const customTheme = {
      textMonthFontFamily: 'ZCOOL', // Change this to your desired font family
      textDayFontFamily: 'ZCOOL', // Change this to your desired font family
      textDayHeaderFontFamily: 'ZCOOL', // Change this to your desired font family
      textSectionTitleColor: '#b6c1cd', // Optional: Change other styles as needed
      todayTextColor: '#6abe30',
      selectedDayBackgroundColor: '#6abe30',
      arrowColor: '#2E3A59',
      dayTextColor: '#2E3A59',
      textMonthFontSize: 20, // Optional: Change font size
      textDayFontSize: 16, // Optional: Change font size
      textDayHeaderFontSize: 14, // Optional: Change font size
    };

    const renderCustomHeader = (date) => {
        const monthName = date.toString('MMMM yyyy'); // Format the date to show Month and Year
        return (
            <View>
                <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
            </View>
        );
    };

  return (
    <View className="mt-20" >
      <View className="w-[90%] mx-auto rounded-xl bg-white" style={globalStyles.border}>
      <Calendar className="w-[90%] mx-auto"
            theme={customTheme} // Apply custom theme
            renderHeader={renderCustomHeader}
            
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
            console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            //renderArrow={(direction) => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            /** Replace default month and year title with custom one. the function receive a date as parameter. */
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}

            onDayPress={handleDayPress} // Handle day press
            markingType={'multi-dot'}
            markedDates={{
                ...markedDates,
                [selectedDate]: { ...markedDates[selectedDate], selected: true },
            }}
        />
      </View>
      <FlatList
          data={selectedQuestbits}
          keyExtractor={(questbit) => questbit.$id}
          renderItem={QuestBit}
      />
    </View>
  );
};

export default CustomCalendar;