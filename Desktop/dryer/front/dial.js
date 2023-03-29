import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, PixelRatio, Image, TouchableOpacity } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RadialVariant = () => {
  const [speed, setSpeed] = useState(0);

  const increaseSpeed = () => {
    setSpeed(speed + 5); // speed 상태값을 5 증가시킵니다.
  };

  const decreaseSpeed = () => {
    setSpeed(speed - 5); // speed 상태값을 5 감소시킵니다.
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseSpeed}>
        <Image 
          source={require('./assets/image/settingView/minusButton.png')} 
          resizeMode="center"
          style={styles.decreaseButton}/>
      </TouchableOpacity>
      <View style={{width:100,height:30,position:"absolute",marginTop:-70}}>
        <Text style={{marginLeft:30,fontSize:25, color:"black",fontWeight:"500"}}>40<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
      <View style={{width:470,height:30,position:"absolute",marginTop:140,marginRight:0}}>
        <Text style={{fontSize:25, color:"black",fontWeight:"500"}}>20<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
      <View style={{width:500,height:30,position:"absolute",marginTop:140}}>
        <Text style={{fontSize:25, color:"black",fontWeight:"500",marginLeft:450}}>80<Text style={{fontSize:14}}>°C</Text></Text>
      </View>
      <RadialSlider
        style={styles.mainCircle}
        variant={'radial-circle-slider'}
        value={speed}
        valueStyle={{fontSize:100,color:"black",alignItems:"center",justifyContent:"center"}}
        min={1}
        max={80}
        onChange={setSpeed}
        radius={170}
        buttonContainerStyle={{backgroundColor:"black"}}
        isHideSubtitle={Boolean}
        isHideTitle={Boolean}
        unit={'°C'}
        unitStyle={{marginLeft:0,fontWeight:"bold",marginTop:40}}
        thumbColor={'#FF7345'}
        thumbRadius={15}
        thumbBorderWidth={7}
        sliderWidth={5}
        linearGradient ={[ { offset: '0%', color:'#FFD76F' }, 
                        { offset: '100%', color: '#FF7345' }]}
      />
      <View style={styles.circle}></View>
      <TouchableOpacity onPress={increaseSpeed}>
        <Image 
          source={require('./assets/image/settingView/plusButton.png')} 
          resizeMode="center"
          style={styles.increaseButton}/>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  mainCircle: {
    marginTop: -38,
  },
  increaseButton: {
    marginTop: 80,
    marginLeft: 30,
  },
  decreaseButton: {
    marginTop:80,
    marginRight: 30,
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
  container: {
    marginTop:100,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

export default RadialVariant;