import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the icon based on the package you're using
import { getQuests } from '../../lib/database';

const Home = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await getQuests();
        setQuests(response); // Set the quests state with the response
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  const renderQuestItem = ({ item }) => (
    <TouchableOpacity
      className="mb-10 p-5 bg-blue-200 rounded-xl"
      onPress={() => handleQuestPress(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View className="p-4" style={{ flex: 1 }}>
          <Text className="font-press text-2xl text-white" style={styles.questTitle}>{item.title}</Text>
          <Text style={styles.questDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleMoreOptionsPress(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Adjust the hitSlop values as needed
        >
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleQuestPress = (quest) => {
    // Handle when a quest item is pressed
    console.log('Quest Pressed:');
  };

  const handleMoreOptionsPress = (quest) => {
    // Handle when the more options button is pressed
    console.log('More Options Pressed:');
    // Example: You can open a modal or show a context menu here
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text className="text-3xl mt-20 font-press text-navy">Pick your </Text>
      <Text className="text-3xl mb-20 mt-3 font-press text-navy">Quest!</Text>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.$id}
        renderItem={renderQuestItem}
      />
    </View>
  );
};

const styles = {
  questTitle: {
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  }
};

export default Home;