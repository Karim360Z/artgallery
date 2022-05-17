import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import StoreFront from '../screens/StoreFront';
import ShopStackScreen from './ShopStackScreen';

const MainStackScreen = () => {

    const MainStack = createBottomTabNavigator()

    const screenOptions = (({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused }) => {
            let iconName = "home-outline"

            switch (route.name) {
                case "Home":
                    iconName = "home-outline";
                    break;

                case "Store":
                    iconName = "shopping-outline";
                    break;

                case "Post":
                    iconName = "add-circle-outline";
                    break;

                case "Cart":
                    iconName = "cart-outline";
                    break;

                case "Profile":
                    iconName = "account-settings-outline";
                    break;

                default:
                    iconName = "home-outline"
            }

            if (route.name === "Post") {
                return (
                    <Ionicons name='add-circle-outline' size={48} color="#5f965c" />
                )
            }

            if (route.name === "Home") {
                return (
                    <Ionicons name="home-outline" size={24} color={focused ? "#26d142" : "#545454"} />)
            }

            if (route.name === "Profile") {
                return (
                    <Feather name="user" size={24} color={focused ? "#26d142" : "#545454"} />)
            }



            return (
                <MaterialCommunityIcons name={iconName} size={24} color={focused ? "#26d142" : "#545454"} />
            )
        },
    }))

    return (
        <MainStack.Navigator screenOptions={screenOptions}>
            <MainStack.Screen name='Home' component={HomeScreen} />
            <MainStack.Screen name='Store' component={ShopStackScreen} />
            <MainStack.Screen name='Post' component={PostScreen} />
            <MainStack.Screen name='Cart' component={CartScreen} />
            <MainStack.Screen name='Profile' component={ProfileScreen} />
        </MainStack.Navigator>
    )
}

export default MainStackScreen