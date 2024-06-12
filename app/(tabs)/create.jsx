import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Design");
  const [date, setDate] = useState(null); // Initial state as null
  const [startTime, setStartTime] = useState(null); // Initial state as null
  const [endTime, setEndTime] = useState(null); // Initial state as null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const categories = [
    "Design",
    "Meeting",
    "Coding",
    "BOE",
    "Testing",
    "Quick Call",
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedDate) => {
    setShowStartTimePicker(false);
    if (selectedDate) {
      setStartTime(selectedDate);
    }
  };

  const handleEndTimeChange = (event, selectedDate) => {
    setShowEndTimePicker(false);
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const handleCategoryPress = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/title-bg.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create a QuestBit</Text>
        </View>
        <View style={styles.boxSection}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, styles.whiteText]}>Name</Text>
            <TextInput
              style={[styles.input, styles.whiteTextInput]}
              placeholder=""
              placeholderTextColor="#fff" // Ensures placeholder is also white
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, styles.whiteText]}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.dateText, styles.whiteText]}>
                {date ? date.toDateString() : ""}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.timeSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                <Text style={styles.timeText}>
                  {startTime ? startTime.toLocaleTimeString() : ""}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={handleStartTimeChange}
                />
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                <Text style={styles.timeText}>
                  {endTime ? endTime.toLocaleTimeString() : ""}
                </Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={handleEndTimeChange}
                />
              )}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder=""
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.selectedCategory,
                ]}
                onPress={() => handleCategoryPress(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>CREATE TASK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  header: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  boxSection: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  timeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#87ceeb",
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#87ceeb",
  },
  categoryText: {
    color: "#000",
  },
  createButton: {
    backgroundColor: "#8fbc8f",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  whiteText: {
    color: "#fff",
  },
  whiteTextInput: {
    borderBottomColor: "#fff",
    color: "#fff",
  },
});

export default Create;
