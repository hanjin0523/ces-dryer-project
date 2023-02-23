import React, { useState } from "react";
import { Image, Text , ImageBackground, StyleSheet, Dimensions} from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const HumImg = () => {

    const [humidity, setHumidity] = useState(40);

    if(humidity <= 10){
    return(
        <ImageBackground source={
            require("./assets/image/hum/hum10.png")} 
            style={style.temHumImg}
            resizeMode="contain">
            <Text style={style.imgInnerText}>{humidity}
                <Text style={{fontSize:20,}}>%</Text>
            </Text>    
            </ImageBackground>
    )}
    if(humidity > 10 && humidity< 36){
        return(
            <ImageBackground source={
                require("./assets/image/hum/hum35.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{humidity}
                    <Text style={{fontSize:20,}}>%</Text>
                </Text>    
                </ImageBackground>
        )}
    if(humidity >= 36 && humidity < 51){
        return(
            <ImageBackground source={
                require("./assets/image/hum/hum50.png")} 
                style={style.temHumImg}
                resizeMode="contain">
                <Text style={style.imgInnerText}>{humidity}
                    <Text style={{fontSize:20,}}>%</Text>
                </Text>    
                </ImageBackground>
        )}
        if(humidity >= 51 && humidity < 76){
            return(
                <ImageBackground source={
                    require("./assets/image/hum/hum75.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{humidity}
                        <Text style={{fontSize:20,}}>%</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(humidity >= 76 && humidity < 81){
            return(
                <ImageBackground source={
                    require("./assets/image/hum/hum80.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{humidity}
                        <Text style={{fontSize:20,}}>%</Text>
                    </Text>    
                    </ImageBackground>
            )}
        if(humidity >= 81 && humidity < 91){
            return(
                <ImageBackground source={
                    require("./assets/image/hum/hum90.png")} 
                    style={style.temHumImg}
                    resizeMode="contain">
                    <Text style={style.imgInnerText}>{humidity}
                        <Text style={{fontSize:20,}}>%</Text>
                    </Text>    
                    </ImageBackground>
            )}
            if(humidity > 90){
                return(
                    <ImageBackground source={
                        require("./assets/image/hum/humError.png")} 
                        style={style.temHumImg}
                        resizeMode="contain">
                        </ImageBackground>
                )}
};
export default HumImg;

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