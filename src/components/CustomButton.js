import React from "react";
import { Text, TouchableOpacity} from 'react-native';

export default function CustomButton({
    label,
    onPressFunction
}){
    return (
        <TouchableOpacity 
            onPress={onPressFunction}
            style={{
                backgroundColor: '#227bed',
                padding: 15,
                borderRadius: 50,
                marginBottom: 30
            }}
        >
            <Text 
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#fff'
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}