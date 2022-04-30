import { Entypo, Feather } from '@expo/vector-icons';
import { NhostReactProvider, useNhostClient, useSignOut, useUserId } from '@nhost/react';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import pins from '../assets/data/pins';
import MasonryList from '../components/MasonryList';
import { Text, View } from '../components/Themed';

const GET_USER_QUERY = `
  query MyQuery($id: uuid!){
    user(id: $id){
      id
      avatarUrl
      displayName
      pins{
        id
        image
        title
        created_at
      }
    }
  }
`;

export default function ProfileScreen() {
  const [user, setUser] = useState();

    const { signOut } = useSignOut();

    const userId = useUserId();
    const nhost = useNhostClient();

    const fetchUserData = async () => {
      const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
      if(result.error){
        Alert.alert("Error fetching the user");
      }else{
        setUser(result.data.user);
      }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    if(!user){
      return <ActivityIndicator />
    }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
            <Pressable onPress={signOut}>
              <Feather name="share" size={24} color="grey" style={styles.icon} />
            </Pressable>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color="grey"
              style={styles.icon}
            />
        </View>
          <Image source={{
              uri: user.avatarUrl,
          }}
          style={styles.image}
          />
        <Text style={styles.title}>Vadim</Text>
        <Text style={styles.subtitle}>123 Followers | 345 Followings</Text>
      </View>
      <MasonryList pins={user.pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
paddingHorizontal: 10,

  }
});
