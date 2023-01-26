import * as React from 'react';
import { Button, Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import 'react-native-gesture-handler';
import Dial from './dial';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function RecipeSetting({ navigation }) {

  const temp = 50;
  const hum = 10;
  const time = "08:10";
  
    return (
      <View style={style.homeMainBox}>
        <View style={style.homeInnerBox}>
          <View style={style.homeFirstBox}>
            <View style={style.homeFirstBoxTitle}>
              <Text style={style.BoxTitle}>
                          Program Settings
                      </Text>
                      <Text style={style.BoxTitleMini}>
                          프로그램 설정
                      </Text>
              </View>
              <View style={style.tempHumTimeBox}>
                <Image 
                      source={require("./assets/image/settingView/tempView.png")} 
                      resizeMode="contain"
                      style={style.tempIcon}/>
                <Text style={style.tempText}>{temp}<Text style={{fontSize:25}}>°C</Text></Text>
                <Image 
                      source={require("./assets/image/settingView/humView.png")} 
                      resizeMode="contain"
                      style={style.tempIcon}/>
                <Text style={style.tempText}>{hum}<Text style={{fontSize:25}}>%</Text></Text>
                <Image 
                      source={require("./assets/image/settingView/timeView.png")} 
                      resizeMode="contain"
                      style={style.tempIcon}/>
                <Text style={style.tempText}>{time}</Text>
              </View>
              <View >
                <Dial/>
              </View>
          </View>
          <View style={style.homeSecondBox}>

          </View>
        </View>
        {/* <Button
          onPress={() => navigation.navigate('Home')}
          title="test111111"
        /> */}
      </View>
    );
  }
  const style = StyleSheet.create({
    slideBtn: {
      height: 100,
    }, 
    tempText: {
      height: height/20,
      fontSize: height/26,
      fontWeight: "bold",
      lineHeight: 46,
      marginRight: width/100,
      color: "black"
    },
    tempIcon: {
      height: height/18,

    },
    tempHumTimeBox: {
      marginTop: height/25.00,
      marginLeft: width/16.4803,
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
      fontSize: height/27.7317,
      color: "black",
      fontWeight: "bold",
      marginRight: width/60.6333,
    },
    BoxTitleMini: {
        fontSize: height/55,
        lineHeight: 60,
        color: "black",
        marginLeft: -10,
    },
  })