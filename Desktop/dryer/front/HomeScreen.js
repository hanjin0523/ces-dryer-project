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
import config, { FRONT_URL, PORT } from './config'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeList = (props, navigation) => {

    
    const [stage, setStage] = useState(0);
    const [speechBubble, setSpeechBubble] = useState(0);
    const [sendRecipe, setSendRecipe] = useState([]);
    const [recipeList, setRecipeList] = useState([]);

    const RecipeStage = ({props}) => {
        
        const [checked1, setChecked1] = useState('');
        const [button, setButton] = useState(true);
        const [button1, setButton1] = useState(true);
        const [getDryRecipe, setGetDryRecipe] = useState('');
        const [stageNum, setStageNum] = useState(0);
        const [stageNumBase, setStageNumBase] = useState(0);
        
        const fetchDryRecipe = async (param) => {
            const dryRecipeResponse = await axios.get(`http://${FRONT_URL}${PORT}/getDryRecipe?param=${param}`);
            setGetDryRecipe(dryRecipeResponse.data);
        };
        console.log(getDryRecipe,"모르겠다")
        useEffect(() => {
            fetchDryRecipe(props);
        }, []);
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
        if (!props) {
            return null;
        }
        return(
            <View style={style.recipeBack1}>
                <BouncyCheckbox
                    isChecked={checked1}
                    size={16}
                    fillColor="#763AFF"
                    unfillColor="#E1E3E6"
                    iconStyle={{borderRadius:3, borderWidth:0}}
                    innerIconStyle={{borderWidth:0}}
                    style={style.checkBox1}
                    onPress={() => {setChecked1(!checked1);}}
                />
                <View style={{marginRight: width/25.1,width:width/11}}>
                    <Text style={style.recipeText}>{getDryRecipe[0]}</Text>
                </View>
                <View style={{marginRight: width/13.7, width:width/10.5}}>
                    <Text style={style.recipeText}>{timeConversion(getDryRecipe[3])}</Text>
                </View>
                <View style={{marginRight: width/20 ,flexDirection:"row"}}>
                    <Text style={style.recipeText}>{getDryRecipe[2]}</Text>
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
                <RecipeStage props={props.props}/>
            </ScrollViewIndicator>
        </View>
        <View style={style.comBtnBox}>
            <ImageBackground 
                source={require('./assets/image/talkbuble.png')}
                resizeMode="cover"
                style={speechBubble ? style.talkbubble : style.talkbubbleNone}
                >
                <Text style={speechBubble ? style.talkText : null}>
                    레시피의 온도, 습도, 시간을 조정해 보세요
                </Text>
            </ImageBackground>
            <TouchableOpacity onPress={() => props.navigation.navigate('RecipeSetting')}>
                <View style={style.comBtn}>
                    <Text style={style.comBtnText}>건조 시작</Text>
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

const DayBtn = ({ navigation, setDate }) => {
    const [dryList, setDryList] = useState([]);
    const [btnActive, setBtnActive] = useState(1);
    const [getDryRecipe, setGetDryRecipe] = useState([]);

    const fetchDryList = async () => {
        const dryListResponse = await axios.get(`http://${FRONT_URL}${PORT}/dryList`);
        setDryList(dryListResponse.data);
    };
    
    
    
    useEffect(() => {
        fetchDryList();
    }, []);

    const dryListElements = dryList.map((item, idx) => (
        <TouchableOpacity
            key={idx}
            style={btnActive == idx+1 ? style.dayBtn : style.dayBtnAct}
            onPress={() => {setBtnActive(idx+1);}}>
            <Text style={btnActive != idx+1 ? style.BoxText : style.BoxTextAct}>{item[1]}</Text>
        </TouchableOpacity>
    ));

    return (
        <>
            <View style={{ flexDirection: "row", marginLeft: width / 35.4430, alignItems: "center" }}>
                <TouchableOpacity
                    style={{ marginRight: width / 68.2926 }}
                    onPress={() => setDate(1)}>
                    <Image
                        source={require('./assets/image/listbtn.png')}
                        style={style.listbtn}
                        resizeMode="contain" />
                </TouchableOpacity>
                <View style={style.dryListBtn}>{dryListElements}</View>
                <TouchableOpacity style={{ marginLeft: width / 2.52, position: 'absolute' }}
                    onPress={() => setDate(1)}>
                    <Image
                        source={require('./assets/image/listbtnR.png')}
                        style={style.listbtn1}
                        resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <RecipeList style={style.recipeListMain} navigation={navigation} props={btnActive}/>
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
    stageBtn: {
        marginRight: width/130,
        marginTop: height/56.0571,
        width: width/90,
        height: height/50,
    },
    recipeText: {
        fontSize: 15, 
        color: "#A3A2A8",
        lineHeight: 41,
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
        marginLeft: width/31.0679,
        marginRight: 0
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
