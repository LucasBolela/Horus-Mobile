import React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

export default function Profile ({navigation}){
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#ddd'}}>
            <Text>Profile</Text>
            <Button
                title="clica aqui"
                onPress={() => alert('Button Clicado')}
            />
        </View>
    );
}