import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceOption, setRecurrenceOption] = useState("Annually");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      title,
      dueDate,
      isRecurring,
      recurrenceOption,
      description,
      status,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.row}>
        <Text style={styles.label}>Recurring QuestBit?</Text>
        <Switch value={isRecurring} onValueChange={setIsRecurring} />
      </View>

      {isRecurring && (
        <View>
          <Text style={styles.label}>Recurrence Option</Text>
          <Picker
            selectedValue={recurrenceOption}
            onValueChange={(itemValue) => setRecurrenceOption(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Annually" value="Annually" />
            <Picker.Item label="Monthly" value="Monthly" />
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Daily" value="Daily" />
          </Picker>
        </View>
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />

      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Switch value={status} onValueChange={setStatus} />
      </View>

      <Text style={styles.label}>Assignee(s)</Text>
      <View style={styles.assigneeContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Replace with your image URI
          style={styles.assigneeImage}
        />
        <Text>Jxl_vu</Text>
      </View>

      <Button title="Create QuestBit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  textArea: {
    height: 80,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  assigneeImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
});

export default Create;
