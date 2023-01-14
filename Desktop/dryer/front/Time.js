import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Time = () => {
    
    const [setTime, setSetTime] = useState("00:00:00");
    const [setDay, setSetDay] = useState("00월00일0요일");

    const currentTime = () => {
        let day = ['일', '월', '화', '수', '목', '금', '토'];
        var today = new Date();

        const month1 = (today.getMonth()+1)
        const date1 = today.getDate()  
        const day1 = day[today.getDay()]
        const hour = String(today.getHours()).padStart(2,"0")
        const minute = String(today.getMinutes()).padStart(2,"0")
        const second = String(today.getSeconds()).padStart(2,"0") 
        
        setSetTime(`${hour}:${minute}:${second}`)
        setSetDay(`${month1}월 ${date1}일 ${day1}요일`)
    }
    const startTime = () => {
        setInterval(currentTime, 1000)
    }
    startTime();

    return(
        <>
        <View style={style.secondBoxTitle}>
            <Text style={style.dayText}>{setDay}</Text>
            <Text style={style.timeText}>{setTime}</Text>
        </View>
        </>
    );
};
export default React.memo(Time)

const style = StyleSheet.create({
    secondBoxTitle: {
        height: height/14,
        width: width/2.43,
        marginLeft: width/35.4430,
        marginTop: height/15.6811,
        flexDirection: "row",
        borderBottomColor: "#D0D0D4",
        borderBottomWidth: 1,
        paddingBottom: height/32.4444,
        marginBottom: height/29.2,
    },
    dayText: {
        fontSize: height/29.7317,
        fontWeight: "bold",
        color: "black"
    },
    timeText: {
        fontSize: height/55,
        fontWeight: "bold",
        color: "black",
        lineHeight: 65,
        marginLeft: width/84.8484,
    },

})