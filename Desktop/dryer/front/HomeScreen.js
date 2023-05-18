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
import Spinner from 'react-native-loading-spinner-overlay';
import BackgroundTimer from 'react-native-background-timer';
import { LogBox } from 'react-native'; LogBox.ignoreLogs(['new NativeEventEmitter']);

import TempImg from './TempImg';
import RecipeSetting from './RecipeSetting';
import HumImg from './HumImg';
import Operation from './Operation'
import Time from './Time';
import CountdownTimer from './CountdownTimer';
import config, { FRONT_URL, PORT, SERVER_IP, SERVER_PORT } from './config'
import { sendBroadcast } from 'android';




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeList = (props) => {
    
    const [checked1, setChecked1] = useState(false);
    const [getDryRecipe, setGetDryRecipe] = useState(1);
    const [stageNum, setStageNum] = useState(0);
    const [stageName, setStageName] = useState('');
    const [stageModify, setStageModify] = useState(0);
    const [dryNumber, setDryNumber] = useState(0);
    const [blowActive ,setBlowActive] = useState(true);
    const [operatingActive ,setOperatingActive] = useState(true);
    const [settingTime, setSettingTime] = useState(0);
    const [operSettingTime, setOperSettingTime] = useState(0);
    const [detailRecipeList, setdetailRecipeList] = useState(0);
    const [activeNum, setActiveNum] = useState(0);
    console.log(props.num, "프롭스네임")
    const stageDetailHandler = async () => {
        ////스테이지 불러오기/////
        try {
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/detailRecipeList?selectNum=${props.num}`);
            if(!response.ok){
                throw new Error('서버 오류 발생');
            }
            const responseData = await response.json();
            let sumTime = 0;
            let stage = 0;
            let stageName = '';
            for(let i = 0; i < responseData.length; i++){
                sumTime += responseData[i][6];
                stage += responseData[i][2]
                stageName = responseData[i][3]
            }
            setdetailRecipeList(responseData)
            setStageName(stageName)
            setSettingTime(sumTime)
            setStageNum(stage)
            setActiveNum(props.num)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        stageDetailHandler();
    },[props.props])
    
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('setingValue', JSON.stringify(detailRecipeList));
            console.log('Successfully stored data:', detailRecipeList);
            } catch (error) {
            console.log('Error storing data:', error);
            }
        };
        
        const removeData = async () => {
            try {
            await AsyncStorage.removeItem('setingValue');
            console.log('Successfully removed data');
            } catch (error) {
            console.log('Error removing data:', error);
            }
        };
        
        useEffect(() => {
            storeData();
            return removeData; // 컴포넌트가 unmount될 때 호출됩니다.
        }, [stageName]);

    const getData = async () => {
        try {
                const value = await AsyncStorage.getItem('setingValue');
                const data = JSON.parse(value);
                setOperSettingTime(data)
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
        getData()
    },[operatingActive===true])
console.log(operSettingTime,"오퍼레이팅셋팅타임")

    const timeConversion =(seconds) => {
        if(!isNaN(seconds)){
            var hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
            var min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
            var sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;
            return hour+"시 "+min+"분 "+sec+"초"
        }else{
            return " "
        }
    }
////테스트구간!!!!/////
    const operBtn = async() => {
        console.log(operSettingTime)
        try{
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/${operatingActive ? 'test1' : 'test'}`,{
                method: 'POST',
                headers : {"Content-Type":"application/json; charset=utf-8"},
                body: JSON.stringify({data : operSettingTime})
            });

        if (!response.ok) {
            throw new Error('서버 오류 발생');
        }
        const responseData = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        operBtn()
    },[operatingActive])

    const testBtn1 = async() => {
        try{
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/${blowActive ? 'testFan1' : 'testFan'}`)
            console.log(response.status)
        if (!response.ok) {
            throw new Error('서버 오류 발생');
        }
        const responseData = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        testBtn1()
    },[blowActive])
////////
    return(
        <>
        <View style={style.recipeBack}>
        {checked1 ? 
        <CountdownTimer time={settingTime} active={operatingActive} checked={checked1} /> : null}
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
                <View style={style.recipeBack1}>
                    <BouncyCheckbox
                        isChecked={checked1}
                        size={16}
                        fillColor="#763AFF" 
                        unfillColor="#E1E3E6"
                        iconStyle={{borderRadius:3, borderWidth:0}}
                        innerIconStyle={{borderWidth:0}}
                        style={style.checkBox1}
                        onPress={(checked1) => {
                            // setChecked1(checked1);
                            // storeData(checked1);
                        }}
                    />
                    <View style={{marginRight: width/25.1,width:width/11}}>
                        <Text style={style.recipeText1}>{stageName ? stageName : "레시피추가"}</Text>
                    </View>
                    <View style={{marginRight: width/13.7, width:width/10.5}}>
                        <Text style={style.recipeText2}>{timeConversion(settingTime)}</Text>
                    </View>
                    <View style={{marginRight: width/20 ,flexDirection:"row"}}>
                        <Text style={style.recipeText3}>{stageNum}</Text>
                    </View>     
                </View> 
            </ScrollViewIndicator>
        </View>
        <View style={style.comBtnBox}>
            <TouchableOpacity onPress={() => {setOperatingActive(!operatingActive);}}>
                <View style={style.comBtn}>
                    {operatingActive ?
                    <Text style={style.comBtnText}>건조 시작</Text> : 
                    <Image style={style.operatingStop} source={require("./assets/image/operatingStop.png")} />
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setBlowActive(!blowActive)}}>
                <View style={style.comBtn1}>
                    {blowActive ?
                        <Text style={style.comBtnText1}>송풍(탈취)가동</Text> :
                        <Text style={style.comBtnText1}>송풍(탈취)중지</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
        </>
    );
};

const DayBtn = () => {

    const [dryList, setDryList] = useState([]);
    const [btnActive, setBtnActive] = useState(1);
    const [getDryRecipe, setGetDryRecipe] = useState([]);
    const [startIndex, setStartIndex] = useState(0); // 추가된 상태 변수
    const [serverNum, setServerNum] =useState('');
    const [recipeName, setRecipeName] =useState('');

const fetchDryList = async () => {
    const dryListResponse = await axios.get(`http://${SERVER_IP}:${SERVER_PORT}/dryList`);
        setDryList(dryListResponse.data);
        setRecipeName(dryListResponse.data[0][1])
        setServerNum(dryListResponse.data[0][0])
};

useEffect(() => {
    fetchDryList();
}, [btnActive]);

const plusNum = () => {
    if (btnActive < dryList.length) {
        setBtnActive(btnActive + 1);
        if (btnActive - startIndex >= MAX_ITEMS) {
            setStartIndex(startIndex + 1);
        }
    }
};

const minusNum = () => {
    if (btnActive > 1) {
        setBtnActive(btnActive - 1);
        if (btnActive - startIndex <= 1) {
            setStartIndex(Math.max(0, startIndex - 1));
        }
    }
};
const MAX_ITEMS = 5;
 // 최대 보여줄 아이템 개수
const dryListElements =
    dryList.length > 0
        ? dryList
            .slice(startIndex, startIndex + MAX_ITEMS).map((item, idx) => (
                <TouchableOpacity
                    key={item[0]}
                    style={btnActive === startIndex + idx + 1 ? style.dayBtn : style.dayBtnAct}
                    onPress={() => {
                        {setBtnActive(startIndex + idx + 1); setServerNum(item[0]);}
                    }}>
                    <Text style={btnActive != startIndex + idx + 1 ? style.BoxText : style.BoxTextAct}>
                        {item[1]}
                    </Text>
                </TouchableOpacity>
            ))
    : (
                <TouchableOpacity style={style.dayBtn} disabled={true}>
                    <Text style={style.BoxText}>loading...</Text>
                </TouchableOpacity>
        );


    return (
        <>
            <View style={{ flexDirection: "row", marginLeft: width / 51.4430, alignItems: "center"}}>
                <TouchableOpacity
                    style={{ marginRight: width / 90.2926 , width:30, height:30, alignItems:"center", justifyContent:"center" }}
                    onPress={minusNum}>
                    <Image
                        source={require('./assets/image/listbtn.png')}
                        style={style.listbtn}
                        resizeMode="contain" />
                </TouchableOpacity>
                <View style={style.dryListBtn}>{dryListElements}</View>
                <TouchableOpacity style={{ marginLeft: width / 2.50, position: 'absolute', width:30, height:30, alignItems:"center", justifyContent:"center" }}
                    onPress={plusNum}>
                    <Image
                        source={require('./assets/image/listbtnR.png')}
                        style={style.listbtn1}
                        resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <RecipeList style={style.recipeListMain} props={btnActive} num={serverNum}/>
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

const FirstBox = () => {
    const [thermicRays, setThermicRays] = useState(1);
    const [blowing, setBlowing] = useState(0);
    const [learning, setLearning] = useState(1);
    const [actionCondtion, setActionCondition] = useState(0); 

    const [value, setValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const fetch_dryer_situation = async () => {
        try {
            const dryer_situation = await axios.get(
            `http://${SERVER_IP}:${SERVER_PORT}/testSenser`
            );
            console.log(dryer_situation.data)
            setValue(dryer_situation.data);
        } catch (error) {
            console.error("graphiteDB연결확인");
        }
        };
        const intervalId = setInterval(async() => {
            await fetch_dryer_situation();
        }, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    
    console.log(value)

    return (
        <View style={style.homeFirstBox}>
            <View style={{ flexDirection: "row", marginTop: height / 15.6811, marginBottom: height / 30.7368 }}>
                <Text style={style.BoxTitle}>
                    Recipe Progress
                </Text>
                <Text style={style.BoxTitleMini}>
                    현재 건조기 상태
                </Text>
            </View>
            <View style={style.OnOffBox}> 
                <ImageAll text="열선" control={null} />
                <ImageAll text="송풍" control={null} />
                <ImageAll text="배습" control={null} />
            </View>
            <Operation operationNum={'30'}/>
            <View style={{ flexDirection: "row", alignItems: "center", width: width / 4.7, marginTop: height / 21.3380 }}>
                <SubText main="Temperature" sub="온도" />
                <SubText main="Humidity" sub="습도" />
            </View>
            <View style={{ flexDirection: "row", width: width / 4.7 }}>
                <TempImg tem_num={value ? value[0][0] : null}/>
                <HumImg hum_num={value ? value[0][1] : null}/>
                {/* <TempImg tem_num={value ? value[4]['value'] : null}/>
                <HumImg hum_num={value ? value[5]['value'] : null}/> */}
            </View>
        </View>
        );
    };

export default function HomeScreen({ navigation }) {


    return (
    <View style={style.homeMainBox}>
        <View style={style.homeInnerBox}>
            <FirstBox />
            <View style={style.homeSecondBox}>
                <Time />
                <DayBtn />
            </View>
        </View>
    </View>
    );
}

const style = StyleSheet.create({
    recipeListMain: {
        flex : 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    dryListBtn: {
        flexDirection:"row",
    },
    talkText: {
        lineHeight: 35,
        color: "#67656E",
        marginLeft: 0,
        marginRight: 0,
        fontSize: 13,
    },
    talkbubble: {
        height: height/15, 
        width: width/4.9, 
        position: "absolute", 
        alignItems: 'center',
        zIndex:1,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 3,
    },
    talkbubbleNone: {
        display:'none'
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
    operatingStop: {
        width: width/3.5343,
        height: height/15.5,
    },
    stageBtn: {
        marginRight: width/130,
        marginTop: height/56.0571,
        width: width/90,
        height: height/50,
    },
    recipeText1: {
        fontSize: 15, 
        color: "#A3A2A8",
        lineHeight: 41,
        marginRight: width/250,
        marginLeft:  -9
    },
    recipeText2: {
        fontSize: 15, 
        color: "#A3A2A8",
        lineHeight: 41,
        marginRight: width/250,
        marginLeft:  12
    },
    recipeText3: {
        fontSize: 15, 
        color: "#A3A2A8",
        lineHeight: 41,
        marginRight: width/250,
        marginLeft:  34
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
        marginLeft: width/65,
        marginRight: 0
    },
    recipeBack: {
        width: width/2.43,
        height: height/16.6382,
        marginLeft: width/42.4430,
        marginTop: height/27.52,
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
        fontSize: 14.1,
        fontWeight: "bold",
        color: "#D0D0D4",
    },
    BoxTextAct : {
        fontSize: 14.1,
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
        marginRight: width/52.8301,
        textAlign: 'center'
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
