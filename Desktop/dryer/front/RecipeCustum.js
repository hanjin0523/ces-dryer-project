import React, { useState } from "react";
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeAdd = () => {
    
    return(
        <View></View>
    )
}

const RecipeBox = ({ name }) => {
    
    const [num, setNum] = useState(0)

    const test = () => {
        setNum()
    }
    if (name == null ){
        return <View>1</View>
    }
    return (
        <TouchableOpacity onPress={() => test()} style={styles.dayBtn}>
                <Text style={styles.name}>{name}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}
                    onPress={()=>console.log("펜슬")}>
                    <Icon name="pencil" size={17} color="#DDDDDD" />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.button}
                    onPress={()=>console.log("삭제")}>
                    <Icon name="trash-o" size={17} color="#DDDDDD" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const RecipeCustum = () => {
    
    const test = () => {
        console.log("레시피")
    }
    const tes = () => {
        console.log("레시피11")
    }

    return(
        <View style={{flexDirection:"row", marginLeft: width/35.4430,alignItems:"center"}}>
            <TouchableOpacity 
                style={{marginRight: width/68.2926}}
                onPress={()=>{test(); tes();}}>
                <Image 
                    source={require('./assets/image/listbtn.png')} 
                    style={styles.listbtn}
                    resizeMode="contain"/>
            </TouchableOpacity>
            <RecipeBox name={"매운고추건조"}/>
            <RecipeBox name={"파프리카건조"}/>
            <RecipeBox name={"청양고추건조"}/>
            <RecipeBox name={""}/>
            <TouchableOpacity 
                style={{marginLeft: -width/300}}
                onPress={()=> test()}>
                <Image 
                    source={require('./assets/image/listbtnR.png')} 
                    style={styles.listbtn1}
                    resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}
export default RecipeCustum;
const styles = StyleSheet.create({
    listbtn1: {
        height:height/40.8,
        width: width/70,
    },
    listbtn: {
        height:height/40.8,
        width: width/70,
    },
    dayBtnAct: {
        backgroundColor:"#753CEF",
        alignItems: "center",
        justifyContent:"center",
        padding : 10,
        height: height/8.7191,
        width: width/18.0645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301
    },
    dayBtn: {
        backgroundColor:"#FFFFFF",
        alignItems: "center",
        justifyContent:"center",
        padding : 10,
        height: height/8.7191,
        width: width/17.9645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301
    },
    container: {
        padding: 10,
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 13,
        color:'#DDDDDD'
    },
    buttons: {
        flexDirection: 'row',
        marginRight: 14,
        marginTop: 20,
    },
    button: {
        marginLeft: 14,
    },
    
})