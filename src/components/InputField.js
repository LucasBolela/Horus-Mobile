import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
    label, 
    icon,
    onChange,
    inputType,
    errorMessage,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
}) {
    return (
        <>

            <View
                style={{
                    flexDirection: 'row',
                    borderBottomColor: errorMessage ? 'red' : '#ccc',
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                    marginBottom: 25,
                    alignItems: 'center'
                }}
            >
                {icon}
                {inputType == 'password' ? (
                    <TextInput 
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={{flex: 1, paddingVertical: 0}}
                        secureTextEntry={true}
                        onChangeText={onChange}
                        errorMessage={errorMessage}
                    />
                    ) : (
                        <TextInput 
                        placeholder={label}
                        keyboardType={keyboardType}
                        style={{flex: 1, paddingVertical: 0}}
                        onChangeText={onChange}
                        errorMessage={errorMessage}
                    />
                )}
                <TouchableOpacity onPress={fieldButtonFunction}>
                    <Text style={{color: '#227bed', fontWeight: 'bold'}}>{fieldButtonLabel}</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: 'red', top: -20}}>
                {errorMessage}
            </Text>
        </>
    );
}
