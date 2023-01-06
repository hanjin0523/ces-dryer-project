import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="home" size={30} color="#900" />;

const CustomSidebarMenu = (props) => {
    const BASE_PATH ='./assets/image/';
    const proileImage = 'operationbtn.png';

    return (
    <SafeAreaView style={{ flex: 1,}}>
      {/*Top Large Image */}
        <View style={styles.sideMenuBox}>
            <Text style={styles.sideMainText}>Crispy<Text style={{fontWeight:"normal", color: "black"}}> recipe</Text></Text>
            <Image
            source={require(BASE_PATH+'operationbtn.png')}
            style={styles.sideMenuProfileIcon}
            />
        </View>
        <DrawerContentScrollView {...props} style={{ marginLeft:"12%", width:"70%"}}>
        <DrawerItemList {...props}/>
        {/* <Icon */}
        <View>
        <DrawerItem
            label="Visit Us"
            onPress={() => (console.log('visit'))}
        />
        </View>
        <View style={styles.customItem}>
            <Text
            onPress={() => {
            }}>
            Rate Us
            </Text>
            <Image
            source={{ uri: BASE_PATH + 'star_filled.png' }}
            style={styles.iconStyle}
            />
        </View>
        </DrawerContentScrollView>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey', marginBottom: "15%"}}>
        영농조함페페
        </Text>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuBox: {
        alignItems: "center", 
        flexDirection: "row", 
        marginLeft: "8.79629%",
        marginTop: "8.4474%",
        marginBottom: "3.6529%",
    },
    sideMainText: {
        fontSize: 23,
        marginTop: "15%",
        fontWeight: "bold",
        color: "black",
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: "19.4444%",
        height: "30%",
        marginTop: "17.4474%",
        marginLeft: "3.7037%",
        // alignSelf: 'center',
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;