import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getQuestBits } from '../../lib/database'; 

const QuestBitDetails = () => {
  const [questbits, setQuestBits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const fetchQuestBits = async () => {
      try {
        const response = await getQuestBits();
        setQuestBits(response); 
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestBits(); 
  }, []); 

  const toggleEditing = () => {
    setIsEditing(!isEditing); 
  };

  const handleRecurrenceChange = (value) => {
    // Implement logic to handle recurrence change
    console.log('Recurrence changed:', value);
  };

  const renderQuestItem = ({ item }) => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}}>
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.status}></View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}}>
        <View style={styles.section}>
          <Text style={styles.label}>Due Date</Text>
          <View style={styles.row}>
            <MaterialIcons name="event" size={20} color="black" />
            <Text style={styles.value}>{item.dueDates[0].substring(0, 10)}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Recurrence</Text>
          <Text style={styles.value}>Annually</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{item.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Assignee(s)</Text>
        <View style={styles.row}>
          {item.assignees.map(assignee => (
            <View key={assignee.id} style={styles.assignee}>
              <Image source={require("../../assets/HD/character_48X48.png")} style={styles.character} resizeMethod='stretch' />
              <Text style={styles.username}>{assignee.username}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>QuestBit Diary</Text>
      </View>
      <View style={styles.log}>
        <Image source={require("../../assets/HD/scroll_small.png")} style={styles.scroll} resizeMethod='stretch' />
      </View>
    </View>
  );

  const EditableQuestItem = ({ item }) => {
    const [title, setTitle] = useState(item.title);
    const [status, setStatus] = useState(item.status);
    const [recurrence, setRecurrence] = useState(item.recurrence);
    const [description, setDescription] = useState(item.description);
  
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
          <View style={styles.section}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.title}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Status</Text>
            <TextInput
              style={styles.input}
              value={status}
              onChangeText={setStatus}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
          <View style={styles.section}>
            <Text style={styles.label}>Due Date</Text>
            <View style={styles.row}>
              <MaterialIcons name="event" size={20} color="black" />
              <Text style={styles.value}>{item.dueDates[0].substring(0, 10)}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Recurrence</Text>
            <Picker
              style={styles.picker}
              selectedValue={recurrence}
              onValueChange={handleRecurrenceChange}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Annually" value="annually" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Assignee(s)</Text>
          <View style={styles.row}>
            {item.assignees.map(assignee => (
              <View key={assignee.id} style={styles.assignee}>
                <Image source={require("../../assets/HD/character_48X48.png")} style={styles.character} resizeMode='stretch' />
                <Text style={styles.username}>{assignee.username}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          <TouchableOpacity onPress={toggleEditing}>
          <AntDesign name="form" size={25} color="black" />
          </TouchableOpacity>
        </View>
      <Text style={styles.header}>QuestBit Details</Text>
      {isEditing ? (
        <EditableQuestItem item={questbits[0]} /> 
      ) : (
        <FlatList
          data={questbits}
          keyExtractor={(item) => item.$id} 
          renderItem={renderQuestItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    height: 190,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 30
  },
  scroll: {
    width: '120%', 
    height: '100%', 
    marginBottom: 10,
    marginTop: -70,
  },
  character: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'ZCOOL', 
    fontSize: 40,
    marginTop: -8
  },
  username : {
    fontFamily: 'ZCOOL', 
    marginBottom: 7,
    fontSize: 18,
  },  
  header: {
    marginTop:20,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'PressStart2P', 
    color: 'black',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'ZCOOL',
    color: 'gray',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontFamily: 'ZCOOL', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    width: 100,
    height: 20,
    backgroundColor: 'gray',
  },
  assignee: {
    alignItems: 'center',
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    fontFamily: 'ZCOOL',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default QuestBitDetails;
