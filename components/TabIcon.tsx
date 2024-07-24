import { View, Image, ImageSourcePropType } from 'react-native';

interface TabIconProps {
    source: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
  }
  
  const TabIcon: React.FC<TabIconProps> = ({ source, color, name, focused }) => {
    return (
      <View className="items-center justify-center">
        <Image
          source={source}
          style={{
            width: 30,
            height: 30,
            tintColor: color,
          }}
        />
      </View>
    );
  };

  export default TabIcon;