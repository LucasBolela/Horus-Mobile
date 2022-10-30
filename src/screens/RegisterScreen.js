import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';

import { registerClient } from "../services/auth";
import { useForm, Controller } from "react-hook-form";

import Validator from "../services/validators";

// import DatePicker from "react-native-date-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [doLabel, setDoLabel] = useState('Data');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({
		email: '',
        password: '',
        cnpj: '',
        registered_name: '',
        whatsapp: ''
	});


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
        setDoLabel(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear());
    };

    const { control, handleSubmit, formState: { errors } } = useForm();

    const teste = async (data) => {
        let datas = JSON.stringify({
            cnpj: data.cnpj,
            registered_name: data.registered_name,
            username: data.email,
            password: data.password,
            whatsapp: data.whatsapp
        });

        const response = await axios({
            method: 'POST',
            url: 'https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/',
            data: datas,
        });
        
        response.then(response => response.json())
        .then(response => {
            console.log(response)
            navigation.navigate('Tabs');
        });
        // postClient(data)
    };

    const handleRegister = () => {
    // async (data) => await postClient(data);
        // const { password, confirmPassword } = data;
        // setPassword(password);

        // if (password !== confirmPassword) {
        //     // errors.confirmPassword = { message: "Senhas devem ser iguais" }
        // }
        console.log(values)

        // if (errors) return;
        // async function postClient() {

        // }
        // teste(values)
        postClient(values, navigation);
    }

    return (
        // razão social, CNPJ, whatsapp, email e senha
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center', marginBottom: 50, marginTop: 130 }}>
                    <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={require('../assets/logo-horus/Logo-Azul.png')} />
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


                {/* <Controller
                    control={control}
                    name="registered_name"
                    rules={{
                        required: 'Informe a razão social',
                    }}
                    render={({ field: { onChange } }) => ( */}

                        <InputField
                            label={"Razão Social"}
                            // onChange={(text) => setValues(prevState => ({...prevState, registered_name: text}))}
                            onChange={(value) => setValues(prevState => ({...prevState, registered_name: value}))}
                            errorMessage={errors.registered_name?.message}
                            icon={<Ionicons
                                name="person-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />
                    {/* )}
                /> */}
                {/* <Controller
                    control={control}
                    name="cnpj"
                    rules={{
                        required: 'Informe o CNPJ',
                        pattern: {
                            value: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/i,
                            message: 'CNPJ Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => ( */}
                        <InputField
                            label={"CNPJ"}
                            onChange={(value) => setValues(prevState => ({...prevState, cnpj: value}))}
                            errorMessage={errors.cnpj?.message}
                            icon={<Ionicons
                                name="business"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />
                    {/* }
                /> */}
                {/* <Controller
                    control={control}
                    name="whatsapp"
                    rules={{
                        required: 'Informe o Whatsapp',
                        pattern: {
                            value: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/i,
                            message: 'Número Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => ( */}
                        <InputField
                            label={"WhatsApp"}
                            onChange={(value) => setValues(prevState => ({...prevState, whatsapp: value}))}
                            errorMessage={errors.whatsapp?.message}
                            icon={<Ionicons
                                name="logo-whatsapp"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />
                    {/* )}
                /> */}
                {/* <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Informe o Email',
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                            message: 'Formato de Email Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => ( */}
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
                    {/* )}
                /> */}
                {/* <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Informe a Senha',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                            message: 'Senha Inválida! Deve conter pelo menos 1 caracter Maiúsculo, 1 caracter minúsculo, número e carcater especial'
                        }
                    }}
                    render={({ field: { onChange } }) => ( */}
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
                    {/* )}
                /> */}
                {/* <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: 'Confirme a Senha',
                        pattern: {
                            value: password,
                            message: 'Senha Inválida! Deve conter pelo menos 1 caracter Maiúsculo, 1 caracter minúsculo, número e carcater especial'
                        }
                    }}
                    render={({ field: { onChange } }) => ( */}
                        <InputField
                            label={"Confirmar senha"}
                            onChange={(value) => setValues(prevState => ({...prevState, confirmPassword: value}))}
                            errorMessage={errors.confirmPassword?.message}
                            icon={<Ionicons
                                name="ios-lock-closed-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                            inputType={"password"}
                        />
                    {/* )}
                /> */}
                {/* <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30,
                        alignItems: 'center'
                    }}
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={{color: '#666', marginLeft:5, marginTop:5}}>
                            {doLabel}
                            {
                                open && (
                                    <DateTimePicker style={{marginLeft:15}}
                                        // modal
                                        // display="inline"
                                        // open={open}
                                        // date={date}
                                        // onConfirm={(date) => {
                                        //     setOpen(false);
                                        //     setDate(date)
                                        // }}
                                        // onCancel={() => {
                                        //     setOpen(false)
                                        // }}
                                        testID="dateTimePicker"
                                        value={date}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )
                            }
                        </Text>
                    </TouchableOpacity>
                </View> */}

                <CustomButton
                    label={"Finalizar"}
                    onPressFunction={handleRegister}
                        // handleSubmit(handleRegister)}
                        // async (data) => {
                        // let datas = JSON.stringify({
                        //     cnpj: data.cnpj,
                        //     registered_name: data.registered_name,
                        //     username: data.email,
                        //     password: data.password,
                        //     whatsapp: data.whatsapp
                        // });
                
                        // let res = await fetch('https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/', {
                        //     method: 'POST',
                        //     body: datas
                        // })
                
                        // let ress = res.json();
                        // console.log(ress)

                    //     try {
                    //         let datas = JSON.stringify({
                    //             cnpj: data.cnpj,
                    //             registered_name: data.registered_name,
                    //             username: data.email,
                    //             password: data.password,
                    //             whatsapp: data.whatsapp
                    //         });
                    
                    //         let teste = await axios({
                    //             method: 'POST',
                    //             url: 'https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/',
                    //             data: datas,
                    //         })
                            
                    //         teste.then(response => response.json())
                    //         .then(response => {
                    //             console.log(response)
                    //             navigation.navigate('Tabs');
                    //         });
                    
                    //         // Router.push('/admin/login');
                    //     } catch (error) {
                    //         console.log('aksjdklaj');
                    //         console.log(error);
                    //     }
                    // })}
                //     () => {
                    // handleSubmit(handleRegister())
                    // navigation.navigate('Widget')
                // }} 
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30
                    }}
                >
                    <Text>Já está cadastrado?</Text>
                    <TouchableOpacity onPress={() => {
                        postClient()
                    }}>
                        <Text style={{ color: '#227bed', fontWeight: '700' }}> Entre aqui</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

async function postClient(data, navigation) {
    console.log(data)
    try {
        let datas = JSON.stringify({
            cnpj: data.cnpj,
            registered_name: data.registered_name,
            username: data.email,
            password: data.password,
            whatsapp: data.whatsapp
        });

        const response = await axios({
            method: 'POST',
            url: 'https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/',
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

        // Router.push('/admin/login');
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