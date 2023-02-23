import React, { useEffect, useState } from 'react';
import { Button, Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { RadialSlider } from 'react-native-radial-slider';

import { useDispatch, useSelector } from 'react-redux';
import { plusNum
        ,minusNum
        ,updateNum } from '../src1/store/todos'
import Time from './Time';
import RecipeCustum from './RecipeCustum'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const Dial = () => {
  const { todos } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  console.log(todos+'다이얼값')
  const [temp, setTemp] = useState(0);
  return(
    <View style={styles.container}>
            <TouchableOpacity 
              onPress={() => dispatch(minusNum())}
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
              value={todos}
              valueStyle={{fontSize:60,color:"black",alignItems:"center",justifyContent:"center", marginTop:20}}
              min={10}
              max={80}
              onChange={(e)=>dispatch(updateNum(e))}
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
              onPress={() => dispatch(plusNum())}
            >
              <Image 
                source={require('./assets/image/settingView/plusButton.png')} 
                resizeMode="center"
                style={styles.increaseButton}/>
            </TouchableOpacity>
          </View>
  );
};


export default function RecipeSetting({ navigation }) {

  const { todos } = useSelector(state => state.todos);
  console.log(todos+"메인부 출력")
  const minTemp = 20;
  const hum = 10;
  const time = "08:10";

  const [numActive, setNumActive] = useState(1);
  
  
  
  const SelectActive = (props) => {

    const [selectActive, setSelectActive] = useState(0);
    
    return(
      <TouchableOpacity 
        key={props.num}
        onPress={() => {setNumActive(props.num);} }
        style={styles.controlBtn}>
        {props.name == "temp" ?
        (<Image 
          source={numActive != props.num ? require('./assets/image/settingView/tempBtnOff.png'):
          require('./assets/image/settingView/tempBtnOn.png')} 
          resizeMode="contain"
          style={styles.contolImg}/>) : props.name == "hum" ? 
          (<Image 
          source={numActive != props.num ? require('./assets/image/settingView/humBtnOff.png'):
          require('./assets/image/settingView/humBtnOn.png')} 
          resizeMode="contain"
          style={styles.contolImg}/>) : 
          (<Image 
            source={numActive != props.num ? require('./assets/image/settingView/timeBtnOff.png'):
            require('./assets/image/settingView/timeBtnOn.png')} 
            resizeMode="contain"
            style={styles.contolImg}/>) }
      </TouchableOpacity>
    );
  };

    return (
      <View style={styles.homeMainBox}>
        <View style={styles.homeInnerBox}>
          <View style={styles.homeFirstBox}>
            <View style={styles.homeFirstBoxTitle}>
              <Text style={styles.BoxTitle}>
                Recipe Settings
              </Text>
              <Text style={styles.BoxTitleMini}>
                  레시피 설정
              </Text>
            </View>
            <View style={styles.tempHumTimeBox}>
              <Image 
                    source={require("./assets/image/settingView/tempView.png")} 
                    resizeMode="contain"
                    style={styles.tempIcon}/>
              <Text style={styles.tempText}>{todos}<Text style={{fontSize:18}}>°C</Text></Text>
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
            <Dial props={todos}/>
            <View style={styles.controlBox}>
              <SelectActive num={1} name="temp"/>
              <SelectActive num={2} name="hum"/>
              <SelectActive num={3} name="time"/>
            </View>
          </View>
          <View style={styles.homeSecondBox}>
            <Time />
            <RecipeCustum />
          </View>
        </View>
          {/* <Button
            onPress={() => navigation.navigate('Home')}
            title="test111111"
          /> */}
      </View>
    );
  }
  const styles = StyleSheet.create({
    contolImg: {
      width: 90,
      height: 140,
    },
    controlBtn: {
      width:55,
      height:80,
      marginRight:0,
      marginLeft:34,
      marginBottom:38,
    },
    controlBox: {
      flexDirection:'row',
      width:width/3,
      marginLeft: width/16,
    },
    slideBtn: {
      height: 100,
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
    tempHumTimeBox: {
      marginTop: height/30.00,
      marginLeft: width/27.4803,
      flexDirection: "row",
      alignItems: "center"
    },
    homeSecondBox: {
      backgroundColor: "#FFFFFF",
      width: width/2.5996,
      borderRadius: 20, 
    },
    homeMainBox: {
      flex: 1, 
      alignItems: 'flex-end', 
      justifyContent: 'center', 
      backgroundColor: '#EFEAFF' 
    },
    homeInnerBox: {
      width : width/1.3011,
      height : height/1.1571,
      flexDirection: "row",
      marginRight: width/20
    },
    homeFirstBox : {
      width: width/2.5996,
      height: height/1.1571,
      marginRight: width/38.8888,
      borderRadius: 20,
    },
    homeFirstBoxTitle : {
      flexDirection:"row",
      marginTop: height/16.6811,
      marginBottom: height/30.7368,
    },
    BoxTitle: {
      fontSize: height/28.9317,
      color: "black",
      fontWeight: "bold",
      marginRight: width/60.6333,
      marginLeft: -6,
    },
    BoxTitleMini: {
        fontSize: height/55,
        lineHeight: 45,
        color: "black",
        marginLeft: -17,
    },
    mainCircle: {
      marginTop: -29,
    },
    increaseButton: {
      marginTop: 25,
      marginRight: 30,
    },
    decreaseButton: {
      marginTop:25,
      marginLeft: 30,
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

  })