import React, {useState, useEffect} from "react";

import { View, Text, Button, SafeAreaView, ScrollView } from "react-native";
import ListExtracts from "../components/ListExtract";

import { data } from "../services/mock";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function HomeScreen (){
    const [accounts, setAccounts] = useState([]);
    // const accounts = getExtract();\


    async function getExtract() {
        try {
            const token = await getData();
            await axios({
                method: 'GET',
                url: 'https://still-meadow-57659.herokuapp.com/api/pluggy/list/transactions',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }).then(resp => {
                console.log(resp.data.accounts)
                setAccounts(resp.data.accounts);
                // navigation.navigate('Tabs');
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
            console.log('Chave recebida')
            console.log(value)
            return value;
        }
        } catch(e) {
        // error reading value
        }
    };

    useEffect(() => {
        getExtract();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
                
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text 
                        style={{ fontSize: 20, fontWeight: "bold", margin: 30}}>Fluxo de Caixa
                    </Text>

                    <View style={{
                        flex: 1, 
                        flexDirection: 'column',
                        // alignItems: "start",
                        marginBottom: 20,
                        backgroundColor: '#00b0ff',
                        // height: 70,
                        borderRadius: 10,
                        width: '100%'
                    }}>
                        <Text 
                            style={{ fontSize: 16 , color: '#fffc', margin: 15, marginBottom: 5}}>Saldo Atual
                        </Text>
                        <Text 
                            style={{ fontSize: 16, fontWeight: "bold", color: '#fffc', margin: 15, marginTop: 0}}>R$ {
                                accounts.length ? 
                                formatNumber(accounts.filter((transaction) => transaction.amount >= 0).map((transaction) => transaction.amount).reduce((a, b) => a + b)
                                - accounts.filter((transaction) => transaction.amount < 0).map((transaction) => transaction.amount).reduce((a, b) => a - b))
                                :
                                '00,00'
                                
                            }
                        </Text>
                    </View>
                    {
                        accounts.map(val => <ListExtracts data={val}/>)
                    }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const formatNumber = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
};