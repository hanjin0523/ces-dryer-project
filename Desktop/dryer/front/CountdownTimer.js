import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { floor } from 'react-native-reanimated';


const CountdownTimer = (props) => {
    
    const [currentTime,setCurrentTime] = useState(props.time)
    const [intervalId, setIntervalId] = useState(null);

    console.log(props, "-------currentTime--------")
    
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
            setCurrentTime(props.time);
    }, [props.time]);

    useEffect(() => {
        if(props.active === false){
            const id = BackgroundTimer.setInterval(() => {
                setCurrentTime(currentTime => currentTime - 1);
            }, 1000);
            setIntervalId(id);

            return () => {
                //여기에 종료로직을 넣어야겠는데?
                BackgroundTimer.clearInterval(id);
        }}
    }, [props.active]);
console.log(typeof(currentTime))
    useEffect(() => {
        if (currentTime === 0) {
            BackgroundTimer.clearInterval(intervalId);
        }
    }, [currentTime]);

    const formattedTime = formatTime(currentTime);
    const aa = currentTime / props.time * 100
    const oper = aa.toFixed(2)
    console.log(aa.toFixed(2))
    if(props.time != 0){
    return (
        <> 
            <Text style={style.text}>{formattedTime}</Text>
            <Text style={style.text}>{oper}</Text>
        </>

    )};
};

export default CountdownTimer;

const style = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },
});