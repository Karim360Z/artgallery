import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import cartItems from '../consts/cartItems'

const width = Dimensions.get('window').width / 2 - 30;

const StoreFront = ({ }) => {

    const Card = ({ cartItems }) => {
        return (
            <View style={style.card}>
                <View
                    style={{
                        height: 100,
                        alignItems: 'center',
                    }}>
                    <Image
                        source={cartItems.img}
                        style={{ resizeMode: 'contain', width: "100%", height: "100%" }}
                    />
                </View>

                <Text style={{ fontWeight: 'normal', fontSize: 15, marginTop: 30, alignSelf: 'center' }}>
                    {cartItems.name}
                </Text>
                <View
                    style={{
                        marginTop: 10,
                    }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>
                        ${cartItems.price}
                    </Text>

                </View>
            </View>
        );
    };
    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 18, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <View style={{}}>
                    <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold', alignSelf: 'center' }}>
                        Cart
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={style.checkout}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fefefe' }}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={1}
                data={cartItems}
                renderItem={({ item }) => {
                    return <Card cartItems={item} />;
                }}
            />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    card: {
        height: 200,
        backgroundColor: COLORS.light,
        width: '65%',
        marginHorizontal: 1,
        borderRadius: 8,
        marginBottom: 15,
        padding: 15,
        alignSelf: 'center'
    },
    header: {
        marginTop: 30,
    },
    checkout: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#40e65c',
        borderRadius: 7,
        width: 300,
    }

});
export default StoreFront;