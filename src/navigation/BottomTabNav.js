import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Terms from '../screens/TermsScreen';


const CustomTabBarButton = ({children, onPress}) => {
    <TouchableOpacity
        style={{
            top: -30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...style.shadow,
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#165194',
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
}

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        height: 60,
                        ...style.shadow
                    },
                    null
                ]
            }}        
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (

                        <View>
                            <MaterialCommunityIcons
                                name="bank-transfer"
                                size={35}
                                color={focused ? "#165194" : "#ddd"}
                                // style={{marginRight: 5}}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Terms" 
                component={Terms} 
                options={{
                    // tabBarIcon: ({focused}) => (
                    //     <MaterialCommunityIcons
                    //         name="bank-plus"
                    //         size={35}
                    //         color={focused ? "#165194" : "#ddd"}
                    //         // style={{marginRight: 5}}
                    //     />
                    // ),
                    tabBarButton: (props) => {
                        console.log(props.children)
                        return (
                            <CustomTabBarButton children={props} />
                        )}

                }}
            />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}


const style = StyleSheet.create({

    shadow: {
        shadowColor: '#165194',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});