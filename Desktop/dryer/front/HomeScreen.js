import  React, { useCallback, useEffect, useState, } from 'react';
import { Button, 
        Dimensions, 
        View, 
        Image, 
        Text, 
        StyleSheet, 
        ImageBackground, 
        TouchableOpacity, 
        ScrollView, 
        FlatList,
        Alert } from 'react-native';
import 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { combineTransition, event } from 'react-native-reanimated';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { template } from '@babel/core';

import TempImg from './TempImg';
import HumImg from './HumImg';
import Operation from './Operation'
import Time from './Time';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeList = () => {
    
    const [checked1, setChecked1] = useState(0);
    const [stage, setStage] = useState(0);

console.log(stage)

    const RecipeStage = (props) => {
    const stageNumBase = props.stage

    const [stageNum, setStageNum] = useState(stageNumBase);
    const [button, setButton] = useState(true);
    const [button1, setButton1] = useState(true);
    
    const maxStage = (stageNum) => {
        if(stageNum < stageNumBase){
            setStageNum(stageNum+1)
        }
    }
    const minStage = (stageNum) => {
        if(stageNum > 1){
            setStageNum(stageNum-1)
        }
    }


        return(
            <View style={style.recipeBack1}>
                <BouncyCheckbox
                    isChecked={checked1 === props.num}
                    size={22}
                    fillColor="#763AFF"
                    unfillColor="#E1E3E6"
                    iconStyle={{borderRadius:5, borderWidth:0}}
                    innerIconStyle={{borderWidth:0}}
                    style={style.checkBox1}
                    onPress={() => {setChecked1(props.num); setStage(stageNum)}}
                />
                <View style={{marginRight: width/25.1,width:width/11}}>
                    <Text style={style.recipeText}>{props.name}</Text>
                </View>
                <View style={{marginRight: width/13.7, width:width/10.5}}>
                    <Text style={style.recipeText}>{props.time}</Text>
                </View>
                <View style={{marginRight: width/20 ,flexDirection:"row"}}>
                    <Text style={style.recipeText}>{stageNum}</Text>
                    <TouchableOpacity activeOpacity={1}
                        onPressIn={() => setButton1(false)}
                        onPressOut={() => setButton1(true)} 
                        onPress={() => maxStage(stageNum)}>
                        <Image 
                        style={style.stageBtn}
                        source={
                            button1 ?
                            require("./assets/image/stagecontrolbtnOn.png"):
                            require("./assets/image/stagecontrolbtnOffdown.png")}
                        resizeMode="contain"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}
                        onPressIn={() => setButton(false)}
                        onPressOut={() => setButton(true)} 
                        onPress={() => minStage(stageNum)}>
                        <Image 
                        style={style.stageBtn}
                        source={
                            !button ?
                            require("./assets/image/stagecontrolbtnOff.png"):
                            require("./assets/image/stagecontrolOndown.png")}
                        resizeMode="contain"/>
                    </TouchableOpacity>
                </View>     
            </View>
        );
    };

    return(
        <>
        <View style={style.recipeBack}>
            <Text style={style.select}>레시피 이름</Text>
            <Text style={style.select}>총 건조시간</Text>
            <Text style={style.select1}>스테이지</Text>
        </View>
        <View style={{height: height/4.4, width:width/2.265}}>
            <ScrollViewIndicator
                persistentScrollbar={true}
                shouldIndicatorHide={false}
                scrollIndicatorStyle={{ backgroundColor: "#753CEF", height:height/9}}
                scrollIndicatorContainerStyle={{ backgroundColor: "#EFEDF1"}}
                >    
                <RecipeStage name="청양고추건조" time="14시 21분 16초" stage={4} num={1}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={2}/>
                <RecipeStage name="마늘건조" time="14시 21분 16초" stage={6} num={3}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={4}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={5}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={6}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={7}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={8}/>
                <RecipeStage name="파프리카건조" time="07시 10분 55초" stage={5} num={9}/>
            </ScrollViewIndicator>
        </View>
        <View style={style.comBtnBox}>
            <TouchableOpacity>
                <View style={style.comBtn}>
                    <Text style={style.comBtnText}>레시피설정</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={style.comBtn1}>
                    <Text style={style.comBtnText1}>송풍(탈취)가동</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    );
};

const DayBtn = () => {
    
    const [btnActive, setBtnActive] = useState(0);
    const [date, setDate] = useState(0);
    const [num, setNum] = useState(0);
    
    let day = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth()+1);
    const date1 = (today.getDate()-date);

    const NumBox = (props) => {
        let test = new Array();
        let test1 = new Array();
        const dayNumber = new Date(year, month-1,(date1-props.num))
        const number5 = String(dayNumber)
        const intNumber = number5.substring(8, 10)
        const daylist = (day[dayNumber.getDay()]+"요일")
        return(
            <TouchableOpacity
                style={btnActive === intNumber ? style.dayBtn : style.dayBtnAct}
                onPress={(props) => setBtnActive(intNumber)} >
                <Text style={btnActive != intNumber ? style.BoxText : style.BoxTextAct}>{daylist}</Text>
                <Text style={btnActive != intNumber ? style.BoxText : style.BoxTextAct}>{intNumber}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={{flexDirection:"row", marginLeft: width/35.4430,alignItems:"center"}}>
            <TouchableOpacity 
                style={{marginRight: width/68.2926}}
                onPress={()=>setDate(date+1)}>
                <Image 
                    source={require('./assets/image/listbtn.png')} 
                    style={style.listbtn}
                    resizeMode="contain"/>
            </TouchableOpacity>
                <NumBox num={4}/>
                <NumBox num={3}/>
                <NumBox num={2}/>
                <NumBox num={1}/>
                <NumBox num={0}/>
            <TouchableOpacity style={{marginLeft: -width/300}}
                onPress={()=>setDate(date-1)}>
                <Image 
                    source={require('./assets/image/listbtnR.png')} 
                    style={style.listbtn1}
                    resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    );
};

const ImageAll = props => {
    return(
        <>
            <Text style={style.OnOffText}>
                {props.text}
            </Text>
            <Image source={
                !props.control ?
                require("./assets/image/Off.png") :
                require("./assets/image/On.png")}
                style={style.OnOffImg} resizeMode="contain"/>
        </>
)};

const SubText = props => {
    return(
        <View style={style.subText}>
            <Text style={style.main}>{props.main}</Text>
            <Text style={style.sub}>{props.sub}</Text>
        </View>
    );
};

export default function HomeScreen({ navigation }) {

    const [thermicRays, setThermicRays] = useState(0);
    const [blowing, setBlowing] = useState(1);
    const [learning, setLearning] = useState(0);
    

    return (
    <View style={style.homeMainBox}>
        <View style={style.homeInnerBox}>
            <View style={style.homeFirstBox}>
                <View style={{flexDirection:"row",marginTop: height/15.6811,marginBottom: height/30.7368}}>
                    <Text style={style.BoxTitle}>
                        Recipe Progress
                    </Text>
                    <Text style={style.BoxTitleMini}>
                        현재 건조기 상태
                    </Text>
                </View>
                <View style={style.OnOffBox}>
                    <ImageAll text="열선" control={thermicRays}/>
                    <ImageAll text="송풍" control={blowing}/>
                    <ImageAll text="배습" control={learning}/>
                </View>
                <Operation />
                <View style={{flexDirection:"row", alignItems:"center", width:width/4.7, marginTop: height/21.3380}}>
                    <SubText main="Temperature" sub="온도"/>
                    <SubText main="Humidity" sub="습도"/>
                </View>
                <View style={{flexDirection:"row", width: width/4.7}}>
                    <TempImg />
                    <HumImg />
                </View>
            </View>
            <View style={style.homeSecondBox}>
                <Time />
                <DayBtn />
                <RecipeList />
            </View>
        </View>
        {/* <Button
        onPress={() => navigation.navigate('Notifications')}
        title="test"
        /> */}
    </View>
    );
}
const style = StyleSheet.create({
    comBtnText1: {
        color: "#B5B3B9",
        fontSize: 22.9   
    },
    comBtnText: {
        color: "#FFDB5E",
        fontSize: 22.9   
    },
    comBtn1: {
        backgroundColor:"#FFFFFF",
        width: width/3.5343,
        height: height/16.5,
        borderRadius: 7,
        borderColor:"#B5B3B9",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height/67.3846
    },
    comBtnBox: {
        flexDirection:"column",
        alignItems: "center",
    },
    comBtn: {
        backgroundColor:"#753CEF",
        width: width/3.5343,
        height: height/15.5,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height/22.4358,
    },
    stageBtn: {
        marginRight: width/130,
        marginTop: height/51.0571,
        width: width/100,
        height: height/70,
    },
    recipeText: {
        fontSize: 20, 
        color: "#A3A2A8",
        lineHeight: 60,
        marginRight: width/250,
        marginLeft: -width/200
    },
    recipeBack1: {
        width: width/2.49,
        height: height/17.6382,
        marginLeft: width/33.4430,
        borderRadius: 10,
        // justifyContent: "center",
        flexDirection: "row",
        borderBottomColor: "#E6E6E9",
        borderBottomWidth: 1,
    },
    select1:{
        fontSize: 20, 
        color: "black",
        lineHeight: 55,
        marginRight: width/44.5679,
        marginLeft: width/36,
    },
    select:{
        marginLeft: width/36,
        fontSize: 20, 
        color: "black",
        lineHeight: 55,
        marginRight: width/12.8927
    },
    checkBox1: {
        marginLeft: width/36.0679,
        marginRight: width/400.3333
        },
    recipeBack: {
        width: width/2.43,
        height: height/18.6382,
        marginLeft: width/33.4430,
        marginTop: height/15.52,
        backgroundColor: "#F5F6FA",
        borderRadius: 10,
        flexDirection: "row",
    },
    listbtn1: {
        height:height/40.8,
        width: width/70,
    },
    listbtn: {
        height:height/40.8,
        width: width/70,
    },
    dayBtnAct: {
        backgroundColor:"#FFFFFF",
        alignItems: "center",
        justifyContent:"center",
        padding : 10,
        height: height/8.7191,
        width: width/17.9645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301
    },
    BoxText : {
        fontSize: 22,
        fontWeight: "bold",
        color: "#D0D0D4",
    },
    BoxTextAct : {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    dayBtn: {
        backgroundColor:"#753CEF",
        alignItems: "center",
        justifyContent:"center",
        padding : 10,
        height: height/8.7191,
        width: width/18.0645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301
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
        backgroundColor : "#FFFFFF",
        width: width/3.3175,
        height: height/1.1571,
        marginRight: width/38.8888,
        borderRadius: 20,
        alignItems: "center"
    },
    homeSecondBox: {
        backgroundColor: "#FFFFFF",
        width: width/2.1406,
        borderRadius: 20, 
    },
    BoxTitle: {
        fontSize: height/29.7317,
        color: "black",
        fontWeight: "bold",
        marginRight: width/90.3333,
        marginLeft: width/380.2828,
    },
    BoxTitleMini: {
        fontSize: height/55,
        lineHeight: 60,
        color: "black",
        marginLeft: -10,
    },
    OnOffBox: {
        flexDirection: "row",
        width: width/6.5,
        height: height/20,
        marginTop: -19,
        // backgroundColor: "grey"r
    },
    OnOffImg: {
        width: width/41.7910,
        height: height/48.6666,
        marginLeft: width/270.3333,
        marginRight: width/78.6756
    },
    OnOffText: {
        fontSize: 16,
        color: "black",
    },
    subText: {
        flexDirection: "row"
    },
    main: {
        fontSize: 25,
        fontWeight:"bold",
        marginRight: width/170,
        color: "black"
    },
    sub: {
        fontSize: 15,
        lineHeight: 40,
        marginRight: width/38,
        color: "black"
    },
    
  })
