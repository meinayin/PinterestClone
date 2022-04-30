import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import { Alert } from 'react-native';
import RemoteImage from "../components/RemoteImage";

const GET_PIN_QUERY = `
    query MyQuery ($id: uuid!) {
        pins_by_pk(id: $id) {
            created_at
            id
            image
            title
            user_id
            user {
                avatarUrl
                displayName
            }
        }
    }
`

const PinScreen = () => {
    const [pin, setPin] = useState([]);

    const nhost = useNhostClient();

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();

    const pinId = route.params?.id;

    const fetchPin = async (pinId) => {
        const response = await nhost.graphql.request(GET_PIN_QUERY, { id: pinId });
        if(response.error){
            Alert.alert("Error fetching the pin", response.error.message);
        }else{
            setPin(response.data.pins_by_pk);
        }
    };

    const goBack = () => {
        navigation.goBack();
    };

    if(!pin){
        return <Text>Pin not found</Text>
    }

    useEffect(() => {
        fetchPin(pinId);
    }, [pinId]);

    return (
        <SafeAreaView style={{ backgroundColor: "black" }}>
            <StatusBar style="light" />
            <View style={styles.root}>
                <RemoteImage fileId={pin.image} />
                <Text style={styles.title}>{pin.title}</Text>
            </View>
            <Pressable onPress={goBack} style={[styles.backBtn, { top: insets.top + 20 }]}>
                <Ionicons name={"chevron-back"}  size={30} color={"white"} />
            </Pressable>
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
    },
    image: {
        width: "100%",
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
    },
    title: {
        margin: 10,
        fontSize: 24,
        fontWeight: "600",
        textAlign: 'center',
        lineHeight: 35,
    },
    backBtn: {
        position: "absolute",
        left: 10,
    }
})

export default PinScreen;
