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
import SettingList from './popUpModal/DeleteModal'
import Dial from './Dial';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SelectActive = (props) => {

  const selectFun = () => {
    if (props.numActive === props.num) {
      props.setNumActive(0);
    } else {
      props.setNumActive(props.num);
    }
  };

  return (
    <TouchableOpacity key={props.num} onPress={() => { selectFun() }} style={styles.controlBtn}>
      {props.name == "temp" ? (
        <Image
          source={
            props.numActive != props.num
              ? require('./assets/image/settingView/tempBtnOff.png')
              : require('./assets/image/settingView/tempBtnOn.png')
          }
          resizeMode="contain"
          style={styles.contolImg}
        />
      ) : props.name != "hum" ? (
        <Image
          source={
            props.numActive != props.num
              ? require('./assets/image/settingView/humBtnOff.png')
              : require('./assets/image/settingView/humBtnOn.png')
          }
          resizeMode="contain"
          style={styles.contolImg}
        />
      ) : (
        <Image
          source={
            props.numActive != props.num
              ? require('./assets/image/settingView/timeBtnOff.png')
              : require('./assets/image/settingView/timeBtnOn.png')
          }
          resizeMode="contain"
          style={styles.contolImg}
        />
      )}
    </TouchableOpacity>
  );
};


export default function RecipeSetting({ navigation }) {
    
  const [numActive, setNumActive] = useState(1);
  console.log(numActive, "numActive")
  
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
            <Dial selectNum={numActive}/>
            <View style={styles.controlBox}>
              <SelectActive num={1} name="temp" numActive={numActive} setNumActive={setNumActive}/>
              <SelectActive num={2} name="hum" numActive={numActive} setNumActive={setNumActive}/>
              <SelectActive num={3} name="time" numActive={numActive} setNumActive={setNumActive}/>
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
  })