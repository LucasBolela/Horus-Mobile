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


export const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [doLabel, setDoLabel] = useState('Data');
    const [password, setPassword] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
        setDoLabel(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear());
    };

    const { control, handleSubmit, formState: { errors } } = useForm();

    function handleRegister(data) {
        const { password, confirmPassword } = data;
        setPassword(password);

        if (password !== confirmPassword) {
            // errors.confirmPassword = { message: "Senhas devem ser iguais" }
        }
        console.log(errors)

        // if (errors) return;

        postClient(data);
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
                <Controller
                    control={control}
                    name="registered_name"
                    rules={{
                        required: 'Informe a razão social',
                    }}
                    render={({ field: { onChange } }) => (

                        <InputField
                            label={"Razão Social"}
                            onChange={onChange}
                            errorMessage={errors.registered_name?.message}
                            icon={<Ionicons
                                name="person-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="cnpj"
                    rules={{
                        required: 'Informe o CNPJ',
                        pattern: {
                            value: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/i,
                            message: 'CNPJ Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => (
                        <InputField
                            label={"CNPJ"}
                            onChange={onChange}
                            errorMessage={errors.cnpj?.message}
                            icon={<Ionicons
                                name="business"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />)
                    }
                />
                <Controller
                    control={control}
                    name="whatsapp"
                    rules={{
                        required: 'Informe o Whatsapp',
                        pattern: {
                            value: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/i,
                            message: 'Número Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => (
                        <InputField
                            label={"WhatsApp"}
                            onChange={onChange}
                            errorMessage={errors.whatsapp?.message}
                            icon={<Ionicons
                                name="logo-whatsapp"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Informe o Email',
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                            message: 'Formato de Email Inválido'

                        }
                    }}
                    render={({ field: { onChange } }) => (
                        <InputField
                            label={"Email"}
                            onChange={onChange}
                            errorMessage={errors.email?.message}
                            icon={<MaterialIcons
                                name="alternate-email"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                            keyboardType={"email-address"}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Informe a Senha',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                            message: 'Senha Inválida! Deve conter pelo menos 1 caracter Maiúsculo, 1 caracter minúsculo, número e carcater especial'
                        }
                    }}
                    render={({ field: { onChange } }) => (
                        <InputField
                            label={"Senha"}
                            onChange={onChange}
                            errorMessage={errors.password?.message}
                            icon={<Ionicons
                                name="ios-lock-closed-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                            inputType={"password"}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: 'Confirme a Senha',
                        pattern: {
                            value: password,
                            message: 'Senha Inválida! Deve conter pelo menos 1 caracter Maiúsculo, 1 caracter minúsculo, número e carcater especial'
                        }
                    }}
                    render={({ field: { onChange } }) => (
                        <InputField
                            label={"Confirmar senha"}
                            onChange={onChange}
                            errorMessage={errors.confirmPassword?.message}
                            icon={<Ionicons
                                name="ios-lock-closed-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />}
                            inputType={"password"}
                        />
                    )}
                />
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
                    onPressFunction={handleSubmit(handleRegister)}
                //     () => {
                //     handleSubmit(handleRegister())
                //     // navigation.navigate('Widget')
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#227bed', fontWeight: '700' }}> Entre aqui</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

async function postClient(data) {
    try {
        await fetch('https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/', {
            method: 'POST',
            Haders: {
                "accept": "application/json",
                "content-type": "application/json",
                // "X-API-KEY": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNGI5YzgyMDE5N2FiYzdiZjZhZDRlOGMzN2FjN2IwMTc6M2NhMDBlNmI0NTYyYzVjNzZmMTZlOTA3MzhkMzQxYzY3YzI0ZWQyZmUwYzYzZDk2OGEwMmI0ZjUyNTU5MDQ0OTZlMDQzNzdkMjk4ZmYxNGRkMzRlYzZmNzA4Yzc3M2ExZmI4ZjEyNjcxMGI1ZDllZDdhNDNhZTZiY2ZjNDY1MDdkZjQ1Mjc0MWZmODdmZDliNzRkYTU1NWNiOWI3ODljOCIsImlhdCI6MTY2Njk3MjM1NCwiZXhwIjoxNjY2OTc5NTU0fQ.cZcLI5gKPbCridaLHnzQEppbc-uVetMkbsq79gZ-McDyTb2CF7p8zXOGY7MwY_t5GrHG--CHw3cY2NuYPMt1RATnMFEK8Rt4RGQ6ERaLmdgOcnkelPVUQrU5nxFRCVI9ME4C5v1UZO3HWHw5OizP9oJr2_OZ6oAFooDXe_7wSi9yJIGcas73umLQchg3MFaxi3BcOIGq7PTvoVoM9HO3DUTgY2oEMrrCMfEWEGyNoWDdehGiINENN90N6kh7tMdOqOtcTla6v1mN-obejYXCMxtYoglgN4xQNQ1Bj699hIT9_vPJ3Ei8xVCLcVBOMNuv5KrnaVt-OvEmnz4cdD4bww"
            },
            body: {
                cnpj: data.cnpj,
                registered_name: data.registered_name,
                username: data.username,
                password: data.password,
                whatsapp: data.whatsapp
            }
        }).then(response => {
            console.log(response.status)
            return response.status >= 400 ? response.json() : response.json()
        }).then(data => console.log(data))
        // const client = await fetch('https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/', {
        // method: 'POST',
        // headers: {
        //     "accept": "application/json",
        //     "content-type": "application/json",
        //     // "X-API-KEY": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNGI5YzgyMDE5N2FiYzdiZjZhZDRlOGMzN2FjN2IwMTc6M2NhMDBlNmI0NTYyYzVjNzZmMTZlOTA3MzhkMzQxYzY3YzI0ZWQyZmUwYzYzZDk2OGEwMmI0ZjUyNTU5MDQ0OTZlMDQzNzdkMjk4ZmYxNGRkMzRlYzZmNzA4Yzc3M2ExZmI4ZjEyNjcxMGI1ZDllZDdhNDNhZTZiY2ZjNDY1MDdkZjQ1Mjc0MWZmODdmZDliNzRkYTU1NWNiOWI3ODljOCIsImlhdCI6MTY2Njk3MjM1NCwiZXhwIjoxNjY2OTc5NTU0fQ.cZcLI5gKPbCridaLHnzQEppbc-uVetMkbsq79gZ-McDyTb2CF7p8zXOGY7MwY_t5GrHG--CHw3cY2NuYPMt1RATnMFEK8Rt4RGQ6ERaLmdgOcnkelPVUQrU5nxFRCVI9ME4C5v1UZO3HWHw5OizP9oJr2_OZ6oAFooDXe_7wSi9yJIGcas73umLQchg3MFaxi3BcOIGq7PTvoVoM9HO3DUTgY2oEMrrCMfEWEGyNoWDdehGiINENN90N6kh7tMdOqOtcTla6v1mN-obejYXCMxtYoglgN4xQNQ1Bj699hIT9_vPJ3Ei8xVCLcVBOMNuv5KrnaVt-OvEmnz4cdD4bww"
        // },
        // body: JSON.stringify({
        //     // connectToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjM5M2Y3YjE4LWU1ODYtNDg5Mi1iNzM0LWM0NzRiMmRjNDA0YiIsImRhdGEiOiJkNzJmNDI2MGM1Y2E4N2MzNjU0ZmVlM2E0MDZkNjhiZjpjZDMzYTUwN2RkOTRmYjViOGJmYjFiMmY5ZTg4NmQyMWZiNDg5Yzk3NjA5NjBlYzdlNWI1ZDQ5ODM2YzhkZjk3NTY0MzgzOGRhMDliYmZjMGQ3NWEzODMyMjFlNzI1MzFlN2Y1NmRiMGQ5MTc1OThiNzgzMzFiYjQ5MTBlYjJlYTA3MjUzNzIwZGFlY2JlYzM3MzY0MGNhNjRlMjI1MTc2NTUwZjc2ZDYwYzZhYTFhMzUyYWM5NjEwZTljMWQ4ODhiY2MwMGRlNDQzMWVkNmMyYzY4ZmYxYjEyYzllYmE5MjZhMGUwNDQ3NDQ2OGZmYTdjMzIyYjk0NjE4ODViODY2IiwiaWF0IjoxNjY2OTA2NTg5LCJleHAiOjE2NjY5MDgzODl9.LZReFGgGvy-M6gT583-OsDb0UrrEjk_mB8J5MC7q1Y-HoOWhMo34VAZaJ1fvyJB4ESvF7HDLqYSHvvwiqfuvUlQf3-mcmfzGEDDHidNGwJGwTiK9mPgMSRA4LGCC8adLFF_9IWwUybjGFElGYsPq3gAbQbASrP8YoJgafycFfI7CDVa2kAeVO9xbyK30HXRT7oLmpElgbhjXgtNlew0IBq1iYQU52PiGTC9Bdd6zwgunEiJ6OPH7d8-OklG_6_0SV5AjFYaV1hPAci2mrNs78DrG7ac5r4e4avPziavrEXDpnH76mFI35rfuuEqzZZIGrbVMWfmznbU5I_Ei_rJueQ',
        //         cnpj: data.cnpj,
        //         registered_name: data.registered_name,
        //         username: data.username,
        //         password: data.password,
        //         whatsapp: data.whatsapp
        //     }),
        // }).then(response => ({detail: response.json(), status: response.status}))
        // .then(({detail, status}) => {
        //     console.log(detail)
        //     console.log(status)
        //     if (response.status == 400) {
        //     } else {
        //         console.log('fake navigation')
        //         // navigation.navigate('Tabs')

        //     }
        // });

        // const responseJson = await client.json();

        // responseJson;

        // console.log('Client generated!')
    }
    catch (error) {
        return ({ message: error.message });
    }
}