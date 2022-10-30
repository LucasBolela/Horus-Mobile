import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

export const LoginScreen = ({navigation}) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [values, setValues] = useState({
		email: '',
        password: '',
	});

    function handleRegister() {
        console.log(values)
        console.log("-------------")

        postClient(values, navigation);
    }

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
                    onChange={(value) => setValues(prevState => ({...prevState, email: value}))}
                    errorMessage={errors.email?.message}
                    icon={<MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />}
                    keyboardType={"email-address"}
                />
                <InputField
                    label={"Senha"}
                    onChange={(value) => setValues(prevState => ({...prevState, password: value}))}
                    errorMessage={errors.password?.message}
                    icon={<Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />}
                    inputType={"password"}
                />
                {/* <InputField 
                    label={"Senha"}
                    icon={<Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />}
                    inputType={"password"}
                    fieldButtonLabel={"Esqueceu a senha?"}
                    fieldButtonFunction={() => navigation.navigate('Tabs')}
                /> */}

                <CustomButton 
                    label={"Entrar"}
                    onPressFunction={handleRegister}
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

async function postClient(data, navigation) {
    try {
        console.log(data)
        let datas = JSON.stringify({
            username: data.email,
            password: data.password,
        });

        const response = await axios({
            method: 'POST',
            url: 'https://still-meadow-57659.herokuapp.com/api/auth/client/login/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: datas,
        }).then(resp => {
            console.log(resp)
            storeData(resp.data.token)
            navigation.navigate('Tabs');
        });
        response;
    } catch (error) {
        console.log('aksjdklaj');
        console.log(error);
    }
}

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      console.log('Chave salva')
    } catch (e) {
      console.error(e)
    }
}