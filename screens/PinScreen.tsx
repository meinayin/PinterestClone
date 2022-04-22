import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import pins from '../assets/data/pins'

const PinScreen = () => {
    const [ratio, setRatio] = useState(1);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();

    const pinId = route.params?.id;

    const pin = pins.find(p => p.id === pinId);

    const goBack = () => {
        navigation.goBack();
    };

    if(!pin){
        return <Text>Pin not found</Text>
    }

    useEffect(() => {
        if(pin.image){
          Image.getSize(pin.image, (width, height) => setRatio(width / height));
        }
      },[pin]);//set ratio as image changes

    return (
        <SafeAreaView style={{ backgroundColor: "black" }}>
            <StatusBar style="light" />
            <View style={styles.root}>
                <Image 
                    source={{ uri: pin.image }} 
                    style={[styles.image, { aspectRatio: ratio }]} 
                />
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
