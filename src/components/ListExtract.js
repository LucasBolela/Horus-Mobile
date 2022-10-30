import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function ListExtracts ({data}){
    return (
        <View key={data.id}
            style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                backgroundColor: '#fff',
                height: 70,
                borderRadius: 10
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",

                    flex: 1
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flex: 1,
                    padding: 15,
                    marginRight: 5
                }}>
                    <AntDesign
                        name="swap"
                        size={20}
                        color={ data.amount > 0 ? '#2b961f' : "#666"}
                        
                    />
                    <View style={{marginLeft: 10, }}
                    >
                        <Text numberOfLines={1}
                            style={{color:  data.amount > 0 ? '#2b961f' : "#999", fontWeight: "bold"}}
                        >
                            {data.type}
                        </Text>
                        <Text numberOfLines={1}
                            style={{color:  data.amount > 0 ? '#2b961f' : "#000", textTransform: "uppercase"}}
                        >
                            {data.description}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingRight: 25
                    }}
                >
                    <Text style={{
                        color:  data.amount > 0 ? '#2b961f' : "#000",
                    }}>R$ {formatNumber(data.amount) }</Text>
                </View>

            </View>

        </View>
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