import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useState } from 'react';
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
    const width = useWindowDimensions().width;

    const numColumns = Math.ceil(width / 350);

    return (
        <ScrollView contentContainerStyle={{ width: "100%" }}>
            <View style={styles.container}>
                {Array.from(Array(numColumns)).map((_, colIndex) => (
                    <View style={styles.column}>
                    {pins
                        .filter((_, index) => index % numColumns === colIndex)
                        .map((pin => <Pin pin={pin} key={pin.id} />
                        ))}

                </View>
                ))}
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