import React, { useState } from "react";
import { Image, Text , ImageBackground, StyleSheet, Dimensions} from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const TempImg = ({tem_num}) => {

    if(tem_num === null){
        return(
            <ImageBackground source={
                require("./assets/image/temp/temp20.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{"error"}
                    <Text style={{fontSize:20,}}></Text>
                </Text>    
                </ImageBackground>
    )}
    if(tem_num <= 20){
    return(
        <ImageBackground source={
            require("./assets/image/temp/temp20.png")} 
            style={style.temHumImg}
            resizeMode="contain">
            <Text style={style.imgInnerText}>{tem_num}
                <Text style={{fontSize:20,}}>°C</Text>
            </Text>    
            </ImageBackground>
    )}
    if(tem_num > 20 && tem_num < 31){
        return(
            <ImageBackground source={
                require("./assets/image/temp/temp30.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{tem_num}
                    <Text style={{fontSize:20,}}>°C</Text>
                </Text>    
                </ImageBackground>
        )}
    if(tem_num >= 31 && tem_num < 41){
        return(
            <ImageBackground source={
                require("./assets/image/temp/temp40.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{tem_num}
                    <Text style={{fontSize:20,}}>°C</Text>
                </Text>    
                </ImageBackground>
        )}
        if(tem_num >= 41 && tem_num < 51){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp50.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{tem_num}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(tem_num >= 51 && tem_num < 61){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp60.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{tem_num}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(tem_num >= 61 && tem_num < 71){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp70.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{tem_num}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(tem_num >= 71 && tem_num < 80){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp80.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{tem_num}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>  
                    </ImageBackground>
            )}
            if(tem_num >= 80){
                return(
                    <ImageBackground source={
                        require("./assets/image/temp/temperror.png")} 
                        style={style.temHumImg}
                        resizeMode="contain">
                        </ImageBackground>
                )}
};
export default TempImg;

const style = StyleSheet.create({

    imgInnerText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "black"
    },
    temHumImg: {
        width: width/10.7,
        height: height/5,
        marginLeft: width/300,
        marginRight: width/55.6666,
        justifyContent:"center",
        alignItems: "center",
    },
})