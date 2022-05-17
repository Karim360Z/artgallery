import React, { useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QuantitySelector from '../components/QuantitySelector';
import COLORS from '../consts/color';

const DetailsScreen = ({ navigation, route }) => {
    const plant = route.params;
    const [quantity, setQuantity] = useState(1)

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>
            <View style={style.header}>
                <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
            </View>
            <View style={style.imageContainer}>
                <Image source={plant.img} style={{ resizeMode: 'contain', flex: 1 }} />
            </View>
            <View style={style.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{plant.name}</Text>
                    <View style={style.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            ${plant.price}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Description</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}>
                        {plant.about}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>

                            {/* QUANTITY SELECTOR */}
                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                            {/* <View style={style.borderBtn}>
                                <Text style={style.borderBtnText}>-</Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginHorizontal: 10,
                                    fontWeight: 'bold',
                                }}>
                                1
                            </Text>
                            <View style={style.borderBtn}>
                                <Text style={style.borderBtnText}>+</Text>
                            </View> */}
                        </View>
                        {/* END QUANTITY SELECTOR */}

                        <View style={style.buyBtn}>
                            <TouchableOpacity>
                                <Text
                                    style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                                    Add to Cart
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 5,
        borderRadius: 10,
        marginTop: 20,
        paddingTop: 30,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.green,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});

export default DetailsScreen;