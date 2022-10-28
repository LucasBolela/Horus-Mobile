import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const OnboardingScreen = ({navigation}) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#2074d3',
                justifyContent: 'space-around',
                flexDirection: 'column'
            }}
        >
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 130, height: 130, resizeMode: 'contain' }} source={require('../assets/logo-horus/Logo-Branca.png')} />
                <Image style={{width: 200, height: 100}} source={require('../assets/logo-horus/Logo-extended-light.png')} />
            </View>
            <View style={{alignItems: 'center', paddingHorizontal: 10, marginBottom: 100}}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: '#fff'
                    }}
                > 
                    Seja Bem Vindo!
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: '#fffb',
                        textAlign: 'center',
                    }}
                > 
                    Nós somos a Horus Finance, uma revolução nos meios contábeis.
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    width: '90%',
                    borderRadius: 50,
                    marginBottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                onPress={() => navigation.navigate('Login')}>

                <Text 
                    style={{
                        color: '#165194',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }} 
                    >
                    VAMOS COMEÇAR!
                </Text>
                <MaterialCommunityIcons
                    name="chevron-double-right"
                    size={35}
                    color="#165194"
                    // style={{marginRight: 5}}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};