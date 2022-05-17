import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color'
import arts from '../consts/art'

const width = Dimensions.get('window').width / 2 - 30;

const StoreFront = ({ navigation }) => {
    const [catergoryIndex, setCategoryIndex] = React.useState(0);

    const categories = ['POPULAR', 'PAINTED', 'NEW', 'ARTIST'];

    const CategoryList = () => {
        return (
            <View style={style.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setCategoryIndex(index)}>
                        <Text
                            style={[
                                style.categoryText,
                                catergoryIndex === index && style.categoryTextSelected,
                            ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const Card = ({ art }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Details', art)}>
                <View style={style.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={art.img}
                            style={{ resizeMode: 'cover', width: "100%", height: "100%" }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'normal', fontSize: 15, marginTop: 30 }}>
                        {art.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                            ${art.price}
                        </Text>
                        <View
                            style={{
                                height: 30,
                                width: 28,
                                backgroundColor: COLORS.green,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity onPress={{
                                
                            }}>
                                <Text
                                    style={{ fontSize: 22, color: COLORS.white, fontWeight: 'bold' }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 18, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#72757a' }}>Art Gallery</Text>
                    <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
                        Shop
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={style.searchContainer}>
                    <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                    <TextInput placeholder="Search" style={style.input} />
                </View>
            </View>
            <CategoryList />
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={arts}
                renderItem={({ item }) => {
                    return <Card art={item} />;
                }}
            />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 'bold'
    },
    categoryTextSelected: {
        color: COLORS.green,
        paddingBottom: 4,
        borderBottomWidth: 1.5,
        borderColor: COLORS.green,
    },
    card: {
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 40,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 14,
        fontWeight: 'normal',
        flex: 1,
        color: COLORS.dark,
    },

});
export default StoreFront;