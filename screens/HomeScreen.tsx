import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Pin from '../components/pin';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ScrollView style={styles.container}>
        <Pin pin={{
          title: "Title",
          image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg"
          }}
        />
        <Pin pin={{
          title: "2nd Title",
          image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg"
          }}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
    
  },
});
