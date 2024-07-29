import React, { useState, useEffect } from "react";
import { View, Text, Modal } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import moment from "moment";

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
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
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
              ? { [selectedDate]: { selected: true, selectedColor: "#6abe30" } }
              : {}
          }
        />
      </View>
    </Modal>
  );
};

export default CalendarPopUp;
