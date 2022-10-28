import React from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

export const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center', marginBottom: 50}}>
                    <Image style={{width: 100, height: 100, resizeMode: 'contain' }} source={require('../assets/logo-horus/Logo-Azul.png')} />
                </View>
                <Text
                    style={{
                        marginBottom: 30,
                        fontWeight: '700',
                        fontSize: 28,
                    }}
                >
                    Login
                </Text>
                
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
                    fieldButtonLabel={"Esqueceu a senha?"}
                    fieldButtonFunction={() => navigation.navigate('Register')}
                />

                <CustomButton 
                    label={"Entrar"} 
                    onPressFunction={() => navigation.navigate('Widget')} 
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30
                    }}
                >
                    <Text>Novo no app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{color: '#227bed', fontWeight: '700'}}> Cadastre-se aqui</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}