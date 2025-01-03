import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import moment from "moment";
import PixelButton from "./PixelButton";
import { BlurView } from "expo-blur";

interface CalendarPopUpProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (date: string) => void;
  initialDate?: string; // Optional initial date prop
}

const CalendarPopUp: React.FC<CalendarPopUpProps> = ({
  visible,
  onClose,
  onUpdate,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const customTheme = {
    calendarBackground: "#E7EFF7",
    textMonthFontFamily: "ZCOOL",
    textDayFontFamily: "ZCOOL",
    textDayHeaderFontFamily: "ZCOOL",
    textSectionTitleColor: "#b6c1cd",
    todayTextColor: "#6abe30",
    selectedDayBackgroundColor: "#6abe30",
    arrowColor: "#2E3A59",
    dayTextColor: "#2E3A59",
    textMonthFontSize: 20,
    textDayFontSize: 16,
    textDayHeaderFontSize: 14,
  };

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onUpdate(day.dateString);
    onClose();
  };

  const renderCustomHeader = (date?: Date) => {
    if (!date) return null;

    const momentDate = moment(date.toISOString());
    const monthName = momentDate.format("MMMM yyyy");
    return (
      <View>
        <Text className="font-zcool text-xl py-5 text-navy">{monthName}</Text>
      </View>
    );
  };

  const handlePressArrowLeft = (subtractMonth: () => void) => {
    subtractMonth();
  };

  const handlePressArrowRight = (addMonth: () => void) => {
    addMonth();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={100} style={styles.blurContainer}>
        <View className="bg-lightgray rounded-3xl px-10 py-3">
          <Calendar
            theme={customTheme}
            renderHeader={renderCustomHeader}
            monthFormat={"yyyy MM"}
            hideArrows={false}
            hideExtraDays={true}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={handlePressArrowLeft}
            onPressArrowRight={handlePressArrowRight}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
            onDayPress={handleDayPress}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: "#6abe30",
                    },
                  }
                : {}
            }
          />
          <PixelButton
            text="Cancel"
            textStyle="text-sm"
            color="red"
            onPress={onClose}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default CalendarPopUp;

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
