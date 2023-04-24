import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { RadialSlider } from 'react-native-radial-slider';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Dial = ({selectNum}) => {

  const [temp, setTemp] = useState(20);
  const [hum, setHum] = useState(20);
  const [time, setTime] = useState("02:00:00");

  console.log(selectNum,"selectNum",hum,"hum",time,"time")


  const increase = () => {
    setTemp(temp => temp + 5);
  };

  const decrease = () => {
    setTemp(temp => temp - 5); // speed 상태값을 5 감소시킵니다.
  };
  
  const handleChangeTemp = useCallback((value) => {
    setTemp(value);
  }, []);

  const handleChangeHum = useCallback((value) => {
    setHum(value);
  }, []);

  return(
    <>
      <View style={styles.tempHumTimeBox}>
        <Image 
              source={require("./assets/image/settingView/tempView.png")} 
              resizeMode="contain"
              style={styles.tempIcon}/>
        <Text style={styles.tempText}>{temp}<Text style={{fontSize:18}}>°C</Text></Text>
        <Image 
              source={require("./assets/image/settingView/humView.png")} 
              resizeMode="contain"
              style={styles.tempIcon}/>
        <Text style={styles.tempText}>{hum}<Text style={{fontSize:18}}>%</Text></Text>
        <Image 
              source={require("./assets/image/settingView/timeView.png")} 
              resizeMode="contain"
              style={styles.tempIcon}/>
        <Text style={styles.tempText}>{time}</Text>
      </View>
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={decrease}
      >
        <Image 
          source={require('./assets/image/settingView/minusButton.png')} 
          resizeMode="center"
          style={styles.decreaseButton}/>
      </TouchableOpacity>
      <View style={{width:100,height:30,position:"absolute",marginTop:-70}}>
        <Text style={{marginLeft:30,fontSize:20, color:"black",fontWeight:"500"}}>40<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
      <View style={{width:470,height:30,position:"absolute",marginTop:90,marginRight:0}}>
        <Text style={{fontSize:20, color:"black",fontWeight:"500", marginLeft:50}}>20<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
      <View style={{width:500,height:30,position:"absolute",marginTop:90}}>
        <Text style={{fontSize:20, color:"black",fontWeight:"500",marginLeft:400}}>80<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
        <RadialSlider
          style={styles.mainCircle}
          step={2}
          variant={'radial-circle-slider'}
          value={temp}
          valueStyle={{fontSize:60,color:"black",alignItems:"center",justifyContent:"center", marginTop:20}}
          min={0}
          max={80}
          onChange={handleChangeTemp}
          radius={123}
          isHideSubtitle={Boolean}
          isHideTitle={Boolean} 
          unit={'°C'}
          unitStyle={{marginLeft:0,fontWeight:"bold",marginTop:35}}
          thumbColor={'#FF7345'}
          thumbRadius={11}
          thumbBorderWidth={5}
          sliderWidth={7}
          linearGradient ={[ { offset: '0%', color:'#FFD76F' }, 
                          { offset: '100%', color: '#FF7345' }]}
        />
      <View style={styles.circle}></View>
      <TouchableOpacity
        onPress={increase}
      >
        <Image 
          source={require('./assets/image/settingView/plusButton.png')} 
          resizeMode="center"
          style={styles.increaseButton}/>
      </TouchableOpacity>
    </View>
    </>
  );
};
export default Dial;

const styles = StyleSheet.create({

  tempHumTimeBox: {
    marginTop: height/30.00,
    marginLeft: width/27.4803,
    flexDirection: "row",
    alignItems: "center"
  },
  tempText: {
    height: height/15,
    fontSize: height/26,
    fontWeight: "bold",
    marginRight: width/230,
    marginLeft: -15,
    color: "black"
  },
  tempIcon: {
    height: height/18,
  },
  container: {
    marginTop:100,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  increaseButton: {
    marginTop: 25,
    marginRight: 30,
  },
  decreaseButton: {
    marginTop:25,
    marginLeft: 30,
  },
  mainCircle: {
    marginTop: -29,
  },
  circle: {
    marginLeft: 32,
    width : width/5.8,
    height : height/3.54,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    borderRadius: (width/5)/2,
    zIndex: -1,
    elevation: 20,
  },
})