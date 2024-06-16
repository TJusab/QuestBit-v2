import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the icon based on the package you're using
import { getQuests } from '../../lib/database';
import { getQuestIcon } from '../../lib/icon';

const Quest = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    const fetchQuestsAndIcon = async () => {
      try {
        // Fetch quests
        const response = await getQuests();
        setQuests(response); // Set the quests state with the response

        // Fetch icons
        const iconsToFetch = {};
        for (const quest of response) {
          const questIcon = await getQuestIcon(quest.icon);
          iconsToFetch[quest.id] = { questIcon };
        }
        setIcons(iconsToFetch);

      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestsAndIcon();
  }, []);

  const renderQuestItem = ({ item }) => (  <TouchableOpacity
      className="mb-10 p-5 bg-blue-200 rounded-xl"
      onPress={() => handleQuestPress(item)}
    >
      <View className="flex-row justify-between items-center">
          {icons[item.id] && (
            <Image source={icons[item.id]} style={{ width: 48, height: 48 }} />
          )}
        <TouchableOpacity
          onPress={() => handleMoreOptionsPress(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View className="py-4 flex-1">
        <Text className="font-press text-2xl text-white" style={styles.questTitle}>{item.title}</Text>
        <Text className="font-zcool text-lg text-white">{item.questInfo}</Text>
      </View>
      <View style={styles.progress_bar}>
        <View style={[styles.progress, { width: `${item.progress}%` }]} />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="font-zcool text-lg text-white">Progress</Text>
        <Text className="font-zcool text-lg text-white">{item.progress}%</Text>
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
      <View className="flex-1 align-items-center" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <Text className="text-3xl mt-20 mb-10 mx-auto font-press text-navy">My Quests!</Text>
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
  },
  progress_bar: {
    height: 5,
    width: '100%',
    backgroundColor: '#8AD1F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
};

export default Quest;