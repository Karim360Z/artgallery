import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { StatusBar } from 'react-native';
import COLORS from '../consts/color';
import DetailsScreen from '../screens/DetailsScreen';
import StoreFront from '../screens/StoreFront';

const ShopStackScreen = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <Stack.Navigator screenOptions={{ header: () => null }}>
                <Stack.Screen name="Home" component={StoreFront} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </>
    );
};

export default ShopStackScreen;