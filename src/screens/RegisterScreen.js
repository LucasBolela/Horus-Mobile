import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";


export const RegisterScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center', marginBottom: 50, marginTop: 130}}>
                    <Image style={{width: 100, height: 100, resizeMode: 'contain' }} source={require('../assets/logo-horus/Logo-Azul.png')} />
                </View>
                <Text
                    style={{
                        marginBottom: 30,
                        fontWeight: '700',
                        fontSize: 28,
                    }}
                >
                    Cadastro
                </Text>
                <InputField 
                    label={"Nome Completo"}
                    icon={<Ionicons
                        name="person-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />}
                />
                <InputField 
                    label={"Email"}
                    icon={<MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />}
                    keyboardType={"email-address"}
                />
                <InputField 
                    label={"Senha"}
                    icon={<Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />}
                    inputType={"password"}
                />
                <InputField 
                    label={"Confirmar senha"}
                    icon={<Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />}
                    inputType={"password"}
                />
                <CustomButton 
                    label={"Finalizar"} 
                    onPressFunction={() => navigation.navigate('Widget')} 
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30
                    }}
                >
                    <Text>Já está cadastrado?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{color: '#227bed', fontWeight: '700'}}> Entre aqui</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}