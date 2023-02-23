import React, { useState } from "react";
import { Image, Text , ImageBackground, StyleSheet, Dimensions} from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const TempImg = () => {

    const [temperature, setTemperature] = useState(32);

    if(temperature <= 20){
    return(
        <ImageBackground source={
            require("./assets/image/temp/temp20.png")} 
            style={style.temHumImg}
            resizeMode="contain">
            <Text style={style.imgInnerText}>{temperature}
                <Text style={{fontSize:20,}}>°C</Text>
            </Text>    
            </ImageBackground>
    )}
    if(temperature > 20 && temperature < 31){
        return(
            <ImageBackground source={
                require("./assets/image/temp/temp30.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{temperature}
                    <Text style={{fontSize:20,}}>°C</Text>
                </Text>    
                </ImageBackground>
        )}
    if(temperature >= 31 && temperature < 41){
        return(
            <ImageBackground source={
                require("./assets/image/temp/temp40.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{temperature}
                    <Text style={{fontSize:20,}}>°C</Text>
                </Text>    
                </ImageBackground>
        )}
        if(temperature >= 41 && temperature < 51){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp50.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{temperature}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(temperature >= 51 && temperature < 61){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp60.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{temperature}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(temperature >= 61 && temperature < 71){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp70.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{temperature}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(temperature >= 71 && temperature < 80){
            return(
                <ImageBackground source={
                    require("./assets/image/temp/temp80.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{temperature}
                        <Text style={{fontSize:20,}}>°C</Text>
                    </Text>  
                    </ImageBackground>
            )}
            if(temperature >= 80){
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