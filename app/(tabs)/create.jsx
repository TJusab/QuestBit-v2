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
import CheckBox from "expo-checkbox";
import Picker from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Initial state as null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [recurrenceOption, setRecurrenceOption] = useState("Annually");
  const [recurrencePattern, setRecurrencePattern] = useState("Pattern 1");
  const [status, setStatus] = useState("Not Started");
  const [assignees, setAssignees] = useState(["Jxluu"]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/pixelArt/background_no_scroll.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View className="flex-1 w-full h-full">
          <Text className="font-press text-3xl text-navy text-center">
            Create a QuestBit
          </Text>
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
          <View />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recurring QuestBit?</Text>
            <CheckBox
              value={recurring}
              onValueChange={setRecurring}
              style={styles.checkbox}
            />
          </View>
          {recurring && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Recurrence Option</Text>
                <Picker
                  selectedValue={recurrenceOption}
                  style={styles.picker}
                  onValueChange={(itemValue) => setRecurrenceOption(itemValue)}
                >
                  <Picker.Item label="Annually" value="Annually" />
                  <Picker.Item label="Monthly" value="Monthly" />
                  <Picker.Item label="Weekly" value="Weekly" />
                </Picker>
              </View>
            </>
          )}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder=""
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.status}>
              <Text>{status}</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.assigneesRow}>
              <Text style={styles.label}>Assignee(s)</Text>
              <TouchableOpacity style={styles.addAssigneeButton}>
                <Text style={styles.addAssigneeText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.assignees}>
              {assignees.map((assignee, index) => (
                <View key={index} style={styles.assignee}>
                  <Text>{assignee}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>CREATE QUESTBIT</Text>
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
    elevation: 5,
    zIndex: 0,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputGroupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  picker: {
    height: 50,
    width: 150,
  },
  status: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  assigneesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  assignees: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  assignee: {
    backgroundColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  addAssigneeButton: {
    backgroundColor: "#87ceeb",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addAssigneeText: {
    color: "#fff",
    fontSize: 18,
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
  checkbox: {
    alignSelf: "center",
  },
});

export default Create;
