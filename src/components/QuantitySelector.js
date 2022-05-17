import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../consts/color'

const QuantitySelector = ({ quantity, setQuantity }) => {

    const onMinus = () => {
        setQuantity(Math.max(0, quantity - 1))
    }
    const onPlus = () => {
        setQuantity(quantity + 1)
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onMinus} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={onPlus} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.green,
        width: 120,
    },
    button: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ededed',
        borderWidth: 1,
        borderColor: COLORS.green,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark
    },
    quantity: {
        color: COLORS.dark,
        fontWeight: 'normal'
    },
})

export default QuantitySelector