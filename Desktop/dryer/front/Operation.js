import React, { useState } from "react";
import { Image, Text , ImageBackground, StyleSheet, Dimensions} from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Operation  = ({operationNum}) => {

    const [operation, setOperation] = useState(operationNum);
    
    if(operation === null){
        return(
            <ImageBackground source={
                require("./assets/image/operation/operation10.png")} 
                style={style.waitImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{"error"}
                    <Text style={{fontSize:62,}}></Text>
                </Text>    
            </ImageBackground>
        )}
    if(operation <= 10){
        return(
            <ImageBackground source={
                require("./assets/image/operation/operation10.png")} 
                style={style.waitImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{operation}
                    <Text style={{fontSize:62,}}>%</Text>
                </Text>    
            </ImageBackground>
        )}
    if(operation > 10 && operation < 36){
        return(
            <ImageBackground source={
                require("./assets/image/operation/operation35.png")} 
                style={style.waitImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{operation}
                    <Text style={{fontSize:50,}}>%</Text>
                </Text>    
            </ImageBackground>
        )}
    if(operation >= 35 && operation < 51){
        return(
            <ImageBackground source={
                require("./assets/image/operation/operation50.png")} 
                style={style.waitImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{operation}
                    <Text style={{fontSize:62,}}>%</Text>
                </Text>    
            </ImageBackground>
        )}
        if(operation >= 51 && operation < 76){
            return(
                <ImageBackground source={
                    require("./assets/image/operation/operation75.png")} 
                    style={style.waitImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{operation}
                        <Text style={style.imgMiniText}>%</Text>
                    </Text>    
                </ImageBackground>
            )}
        if(operation >= 75 && operation < 81){
            return(
                <ImageBackground source={
                    require("./assets/image/operation/operation80.png")} 
                    style={style.waitImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{operation}
                        <Text style={style.imgMiniText}>%</Text>
                    </Text>    
                </ImageBackground>
            )}
        if(operation >= 80 && operation < 91){
            return(
                <ImageBackground source={
                    require("./assets/image/operation/operation90.png")} 
                    style={style.waitImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{operation}
                        <Text style={style.imgMiniText}>%</Text>
                    </Text>    
                </ImageBackground>
            )}
        if(operation >= 90 && operation <= 99){
            return(
                <ImageBackground source={
                    require("./assets/image/operation/operation90.png")} 
                    style={style.waitImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{operation}
                        <Text style={style.imgMiniText}>%</Text>
                    </Text>    
                </ImageBackground>
            )}
        if(operation == 100){
            return(
                <ImageBackground source={
                    require("./assets/image/operation/operation100.png")} 
                    style={style.waitImg}
                    resizeMode="contain">
                </ImageBackground>
            )}
};
export default Operation;

const style = StyleSheet.create({

    waitImg: {
        width: width/5.7851,
        marginTop: height/38.9777,
        height: height/2.9107,
        justifyContent: "center",
        alignItems: "center",
    },
    imgInnerText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "black"
    },
    imgMiniText: {
        fontSize : 50
    }
})