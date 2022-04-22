import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Pin from '../components/Pin';

interface IMasonryList {
    pins:{
        id: string;
        image: string;
        title: string;
    }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.column}>
                    {pins
                        .filter((item, index) => index % 2 === 0)
                        .map((pin => <Pin pin={pin} key={pin.id} />
                        ))}

                </View>

                <View style={styles.column}>
                    {pins
                        .filter((item, index) => index % 2 === 1)
                        .map((pin => <Pin pin={pin} key={pin.id} />
                        ))}
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: 'row',//split screen into two columns
      backgroundColor: "white",
    },
    column: {
      flex: 1,
    }
  });

export default MasonryList;