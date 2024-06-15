import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getQuestBits } from '../../lib/database'; 

const QuestBitDetails = () => {
  const [questbits, setQuestBits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const renderQuestItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
    <MaterialIcons name="keyboard-backspace" size={30} color="black" />
      <AntDesign name="form" size={25} color="black" />
    </View>
      <Text style={styles.header}>QuestBit Details</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{item.title}</Text>
      </View>
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
      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.status}></View>
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
              <Image source={{ uri: assignee.avatar }} style={styles.avatar} />
              <Text style={styles.assigneeName}>{assignee.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>QuestBit Diary</Text>
      </View>
    </ScrollView>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={questbits}
      keyExtractor={(item) => item.$id.toString()} 
      renderItem={renderQuestItem}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 30,
  },
  header: {
    marginTop:20,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'PressStart2P', 
    color: 'black',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
    color: 'grey',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  assigneeName: {
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestBitDetails;
