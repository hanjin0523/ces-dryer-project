import  React, { useCallback, useEffect, useState } from 'react';
import { Button, Dimensions, View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { combineTransition, event } from 'react-native-reanimated';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeList = () => {
    
    const RecipeStage = (props) => {



        return(
            <View style={style.recipeBack1}>
                <BouncyCheckbox 
                    size={22}
                    fillColor="#763AFF"
                    unfillColor="#E1E3E6"
                    iconStyle={{borderRadius:5, borderWidth:0}}
                    innerIconStyle={{borderWidth:0}}
                    style={style.checkBox}
                />
                <Text>{props.name}</Text>
                <Text>{props.time}</Text>
                <Text>{props.stage}</Text>
            </View>
        );
    };

    return(
        <>
        <View style={style.recipeBack}>
            <BouncyCheckbox 
                size={22}
                fillColor="#763AFF"
                unfillColor="#E1E3E6"
                iconStyle={{borderRadius:5, borderWidth:0}}
                innerIconStyle={{borderWidth:0}}
                style={style.checkBox}
            />
            <Text style={style.select}>레시피 이름</Text>
            <Text style={style.select}>총 건조시간</Text>
            <Text style={style.select1}>스테이지</Text>
        </View>    
        <RecipeStage name="청양고추건조" time="13시간 21분 16초" stage="4"/>
        </>
    );
};

const DayBtn = () => {
    
    const [btnActive, setBtnActive] = useState(0);
    const [date, setDate] = useState(0);
    const [num, setNum] = useState(0);

    console.log(num)
    console.log(btnActive)
    
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
                style={btnActive ? style.dayBtn : style.dayBtnAct}
                onPress={(props) => setBtnActive(!btnActive)}>
                <Text style={!btnActive ? style.BoxText : style.BoxTextAct}>{daylist}</Text>
                <Text style={!btnActive ? style.BoxText : style.BoxTextAct}>{intNumber}</Text>
            </TouchableOpacity>
        )
    }

    // for(var i = 4; i>=0; i--){
    //     const dayNumber = new Date(year, month-1,(date1-i))
    //     const number5 = String(dayNumber)
    //     const intNumber = number5.substring(8, 10)
    //     const daylist = (day[dayNumber.getDay()]+"요일")
    //     test.push(
    //         <TouchableOpacity key={i}
    //             style={btnActive ? style.dayBtn : style.dayBtnAct}
    //             onPress={(event) => setBtnActive(!btnActive)}>
    //             <View></View>
    //             <Text style={!btnActive ? style.BoxText : style.BoxTextAct}>{daylist}</Text>
    //             <Text style={!btnActive ? style.BoxText : style.BoxTextAct}>{intNumber}</Text>
    //         </TouchableOpacity>
    //     )
    // }
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
        <View>
            <View></View>
        </View>
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

const TemHumImg = props => {
    return(
        <ImageBackground source={
            props.imgName === "temperature1" ?
            require("./assets/image/temperature1.png") :
            require("./assets/image/humidity1.png")} 
            style={style.temHumImg}
            resizeMode="contain">
            <Text style={style.imgInnerText}>{props.TemNumber}
                <Text style={{fontSize:20,}}>{props.unit}</Text>
            </Text>    
            </ImageBackground>
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
                <View style={{flexDirection:"row",marginTop: height/12.6811,marginBottom: height/30.7368}}>
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
                <View style={{}}>
                    <Image source={
                        require('./assets/image/wait.png')} 
                        resizeMode="contain"
                        style={style.waitImg}/>
                </View>
                <View style={{flexDirection:"row", alignItems:"center", width:width/4.7, marginTop: height/21.3380}}>
                    <SubText main="Temperature" sub="온도"/>
                    <SubText main="Humidity" sub="습도"/>
                </View>
                <View style={{flexDirection:"row", width: width/4.7}}>
                    <TemHumImg TemNumber="18" imgName="temperature1" unit="°C"/>
                    <TemHumImg TemNumber="42" imgName="humidity1" unit="%"/>
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
    recipeBack1: {
        width: width/2.43,
        height: height/18.6382,
        marginLeft: width/35.4430,
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "row",
        borderBottomColor: "#A3A2A8",
        borderBottomWidth: 1,
    },
    select1:{
        fontSize: 20, 
        color: "black",
        lineHeight: 55,
        marginRight: width/34.5679
    },
    select:{
        fontSize: 20, 
        color: "black",
        lineHeight: 55,
        marginRight: width/10.9527
    },
    checkBox: {
        marginLeft: width/37.5679,
        marginRight: width/140.3333
        },
    recipeBack: {
        width: width/2.43,
        height: height/18.6382,
        marginLeft: width/35.4430,
        marginTop: height/17.52,
        backgroundColor: "#F5F6FA",
        borderRadius: 10,
        justifyContent: "center",
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
        height: height/9.3191,
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
        height: height/9.3191,
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
    timeText: {
        fontSize: height/55,
        fontWeight: "bold",
        color: "black",
        lineHeight: 65,
        marginLeft: width/84.8484,
    },
    dayText: {
        fontSize: height/29.7317,
        fontWeight: "bold",
        color: "black"
    },
    secondBoxTitle: {
        height: height/14,
        width: width/2.43,
        marginLeft: width/35.4430,
        marginTop: height/12.6956,
        flexDirection: "row",
        borderBottomColor: "#D0D0D4",
        borderBottomWidth: 1,
        paddingBottom: height/32.4444,
        marginBottom: height/29.2,
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
    waitImg: {
        width: width/5.7851,
        marginTop: height/38.9777,
        height: height/2.9107,
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
    temHumImg: {
        width: width/10.7,
        height: height/5,
        marginLeft: width/300,
        marginRight: width/55.6666,
    },
    imgInnerText: {
        fontSize: 40,
        fontWeight: "bold",
        marginTop: height/14,
        marginLeft: width/33,
        color: "black"
    }
  })
