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
import 'react-native-gesture-handler';
import axios from "axios"
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import TempImg from './TempImg';
import RecipeSetting from './RecipeSetting';
import HumImg from './HumImg';
import Operation from './Operation'
import Time from './Time';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeList = (props, navigation) => {
    
    const [checked1, setChecked1] = useState(4);
    const [stage, setStage] = useState(0);
    const [speechBubble, setSpeechBubble] = useState(0);
    const [sendRecipe, setSendRecipe] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const getRecipe = async () => {
        const getRecipeList = await axios
            .get("http://10.0.2.2:8000/recipe/"+props.day)
            .then((res) => setRecipeList(res.data))
            .catch(error => console.log('이상!!'));
    }
    useEffect(()=>{
        getRecipe()
    },[props.day])

    const recipeTimeSum = useCallback(() =>{
        let recipeRow = [];
        let i = 0;
        let reTimeSum = 0;
        let reStageSum = 0; 
        let reName = '';  
        for(let i = 0; i < recipeList.length; i++){
            reName = recipeList[0][1][0]
            reTimeSum += recipeList[0][0][3]
            reStageSum += recipeList[0][0][1]
            }
        recipeRow.push(
                        <RecipeStage 
                        key={i} 
                        name={recipeList} 
                        time={reTimeSum}
                        stage={reStageSum}></RecipeStage>
                        )
    return recipeRow})
    useEffect(() => {
        recipeTimeSum()
    },[props.day])

    const RecipeStage = (props) => {
        
        const stageNumBase = props.stage

        const [stageNum, setStageNum] = useState(stageNumBase);
        const [button, setButton] = useState(true);
        const [button1, setButton1] = useState(true);
        
        const timeConversion =(seconds) => {

            var hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
            var min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
            var sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

            return hour+"시 "+min+"분 "+sec+"초";
        }
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
                    size={16}
                    fillColor="#763AFF"
                    unfillColor="#E1E3E6"
                    iconStyle={{borderRadius:3, borderWidth:0}}
                    innerIconStyle={{borderWidth:0}}
                    style={style.checkBox1}
                    onPress={() => {setChecked1(props.num); setStage(stageNum); setSpeechBubble(!speechBubble)}}
                />
                <View style={{marginRight: width/25.1,width:width/11}}>
                    <Text style={style.recipeText}>{props.name}</Text>
                </View>
                <View style={{marginRight: width/13.7, width:width/10.5}}>
                    <Text style={style.recipeText}>{timeConversion(props.time)}</Text>
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
                {recipeTimeSum()}
            </ScrollViewIndicator>
        </View>
        <View style={style.comBtnBox}>
            <ImageBackground 
                source={require('./assets/image/talkbuble.png')}
                resizeMode="center"
                style={speechBubble ? style.talkbubble : style.talkbubbleNone}
                >
                <Text style={style.talkText}>
                    레시피의 온도, 습도, 시간을 조정해 보세요
                </Text>
            </ImageBackground>
            <TouchableOpacity onPress={() => props.navigation.navigate('RecipeSetting')}>
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

const DayBtn = (props, navigation) => {

    const [btnActive, setBtnActive] = useState(0);
    const [date, setDate] = useState(0);
    const [num, setNum] = useState(0);
    const today = new Date();
    const sendToday = format(today, 'yyyy-MM-dd')
    const [sendDate, setSendDate] = useState(sendToday);
    const [select, setSelect] = useState(0);
    const year = today.getFullYear();
    const month = (today.getMonth()+1);
    const date1 = (today.getDate()-date);
    let day = ['일', '월', '화', '수', '목', '금', '토'];
    
    const NumBox = (props) => {
        let test = new Array();
        let test1 = new Array();
        const dayNumber = new Date(year, month-1,(date1-props.num))
        const number5 = String(dayNumber)
        const sendDate1 = format(dayNumber, 'yyyy-MM-dd')
        const intNumber = number5.substring(8, 10)
        console.log(intNumber+"인트넘"+btnActive+"btnNum")
        const daylist = (day[dayNumber.getDay()]+"요일")

        return(
            <TouchableOpacity key={props.num}
                style={btnActive == props.num ? style.dayBtn : style.dayBtnAct}
                onPress={() => {setBtnActive(props.num); setSendDate(sendDate1); }} >
                <Text style={btnActive != props.num ? style.BoxText : style.BoxTextAct}>{daylist}</Text>
                <Text style={btnActive != props.num ? style.BoxText : style.BoxTextAct}>{intNumber}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <>
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
        <RecipeList navigation={props.navigation} day={sendDate}/>
        </>
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

    const [thermicRays, setThermicRays] = useState(1);
    const [blowing, setBlowing] = useState(1);
    const [learning, setLearning] = useState(0);
    const [actionCondtion, setActionCondition] = useState(0);
        
    // const serverTest = async () => {
    //         const test = await axios
    //             .get("http://10.0.2.2:8000/")
    //             .then((res) => setActionCondition(res.data))
    //             .catch(error => console.log(error));
    //     }
    //     useEffect(() => {
    //         serverTest();
    //     },[])

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
                <DayBtn navigation={navigation} />
            </View>
        </View>
    </View>
    );
}
const style = StyleSheet.create({
    talkText: {
        lineHeight: 55,
        color: "#67656E",
        marginLeft: 10,
        marginRight: 10,
        fontSize: 13,
    },
    talkbubble: {
        height: height/15, 
        width: width/5, 
        position: "absolute", 
        alignItems: "center",
        zIndex:1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    talkbubbleNone: {
        height: height/15, 
        width: width/5, 
        position: "absolute", 
        alignItems: "center",
        zIndex:1,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'none'
    },
    comBtnText1: {
        color: "#B5B3B9",
        fontSize: 18,
        fontWeight: "600"   
    },
    comBtnText: {
        color: "#FFDB5E",
        fontSize: 18,
        fontWeight: "600"   
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
        marginTop: height/45.0571,
        width: width/100,
        height: height/70,
    },
    recipeText: {
        fontSize: 15, 
        color: "#A3A2A8",
        lineHeight: 45,
        marginRight: width/250,
        marginLeft:  -9
    },
    recipeBack1: {
        width: width/2.38,
        height: height/17.6382,
        marginLeft: width/55.4430,
        borderRadius: 10,
        // justifyContent: "center",
        flexDirection: "row",
        borderBottomColor: "#E6E6E9",
        borderBottomWidth: 1,
    },
    select1:{
        fontSize: 16, 
        color: "black",
        lineHeight: 45,
        marginRight: width/44.5679,
        marginLeft: width/36,
    },
    select:{
        marginLeft: width/36,
        fontSize: 16, 
        color: "black",
        lineHeight: 45,
        marginRight: width/13.8927
    },
    checkBox1: {
        marginLeft: width/36.0679,
        marginRight: width/400.3333
        },
    recipeBack: {
        width: width/2.43,
        height: height/16.6382,
        marginLeft: width/42.4430,
        marginTop: height/15.52,
        backgroundColor: "#F5F6FA",
        borderRadius: 5,
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
        borderRadius: 5,
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
        fontSize: 15,
        fontWeight: "bold",
        color: "#D0D0D4",
    },
    BoxTextAct : {
        fontSize: 15,
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
        borderRadius: 5,
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
        lineHeight: 43,
        color: "black",
        marginLeft: -7,
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
        height: height/41.6666,
        marginLeft: width/270.3333,
        marginRight: width/78.6756
    },
    OnOffText: {
        fontSize: 13,
        color: "black",
    },
    subText: {
        flexDirection: "row",
        marginLeft: -5  
    },
    main: {
        fontSize: 18,
        fontWeight:"bold",
        marginRight: 10,
        color: "black"
    },
    sub: {
        fontSize: 12,
        lineHeight: 25,
        marginRight: 40,
        color: "black"
    },
})
