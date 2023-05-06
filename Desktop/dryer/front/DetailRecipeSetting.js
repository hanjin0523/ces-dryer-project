import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import ScrollViewIndicator from 'react-native-scroll-indicator';

import config, { FRONT_URL, PORT, SERVER_IP, SERVER_PORT } from './config';
import StageAddModal from './popUpModal/StageAddModal';
import DeleteButton from './popUpModal/DeleteModal';

const DetailRecipeSetting = (props) => {
    const [stage, setState] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [settingTime, setSettingTime] = useState('');
    const [isActive, setIsActive] = useState([]);
    const [addStageModalVisible, setStageAddModalVisible] = useState(false);
    const [delModalVisible, setDelModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteStageId,setDeleteStageId ] = useState('');
    const [detailRecipeList,setdetailRecipeList ] = useState('');


    const stageDetailHandler = async () => {
        ////스테이지 불러오기/////
        try {
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/detailRecipeList?selectNum=${props.num}`);
            if(!response.ok){
                throw new Error('서버 오류 발생');
            }
            const responseData = await response.json();
            setdetailRecipeList(responseData)
            //함수작동후 다음함수~?
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        stageDetailHandler();
    },[props.num])

    const handleAddSubmit = async (addInputValue) => {
        try {
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/stageAdd`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serverNum: props.num,
                    addStageValue : addInputValue
                })
            });
            console.log("서버전송완료")
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            const responseData = await response.json();
            setStageAddModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const timeConversion =(seconds) => {
        var hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
        var min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
        var sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

        return hour+":"+min+":"+sec;
    }

    const handleDeleteConfirm = async() => {
        //삭제 로직 처리
        try {
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/stageDelete?stageNum=${deleteStageId}`);
        
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            // 서버의 응답 처리 로직
            const responseData = await response.json();
            // setAddModalVisible(false);
            } catch (error) {
                console.error(error);
            }
        console.log("삭제완료")
        setDelModalVisible(false);
    };
    const handleDelete = (itemId) => {
        console.log(itemId)
        setDeleteStageId(itemId)
        setDelModalVisible(true);
    };
    
    const handleDeleteCancel = () => {
        setDelModalVisible(false);
    };
    const test = detailRecipeList ? detailRecipeList.map((item, idx) => (
        <TouchableOpacity  key={idx} style={styles.stageMain} onLongPress={() => {handleDelete(item[0])}}>
            <View style={styles.stageBtn}>
                <View style={styles.stageBox}>
                    <Image source={require('./assets/image/stageClick.png')} style={styles.stageActive}/>
                    <Text style={styles.stageText}>Stage{item[2]+idx}</Text>
                </View>
                <View style={styles.leftBox}>
                    <View style={styles.leftInnerBox}>
                        <View style={styles.tempHumBox}>
                        <Text style={styles.tempText}>{item[4]}
                            <Text style={{fontSize:17}}>°C</Text>
                        </Text>
                        <View style={styles.divider}/>
                        <Text style={styles.tempText1}>{item[5]}
                            <Text style={{fontSize:17}}>%</Text>
                        </Text>
                        <View style={styles.stageTime}>
                            <Image source={require('./assets/image/stageTime.png')} style={styles.stageTimeImg} />
                            <Text style={styles.timeText}>{timeConversion(item[6])}</Text>
                        </View>
                        {/* <TouchableOpacity 
                            onPress={() => {testBtn()}}
                            style={{position:'absolute', marginLeft: 30,marginTop: -10, backgroundColor:'red'}}>
                            <Text style={{color:"white"}}>수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {console.log("하하")}}
                            style={{position:'absolute', marginLeft: 80, marginTop: -10, backgroundColor:'red'}}>
                            <Text style={{color:"white"}}>삭제</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                </View> 
            </View>
        </TouchableOpacity>
        )): <View><Text>11</Text></View>
        

    return (
        <View style={styles.mainBox}>
            <View style={styles.secondsBox}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {/* <View> */}
                    {test}
                    {/* </View> */}
                </ScrollView>
            </View>
            <View style={styles.stageAddOutBox}>
                <StageAddModal visible={addStageModalVisible}
                        onSubmit={handleAddSubmit}
                        onClose={() => setStageAddModalVisible(false)}
                        props={props.num}
                        />
                <DeleteButton 
                        isvisible={delModalVisible} 
                        handleDeleteConfirm={handleDeleteConfirm} 
                        handleDeleteCancel={handleDeleteCancel} />
                <TouchableOpacity style={styles.addBox} onPress={() => {setStageAddModalVisible(true)}}>
                    <Image style={styles.stageAddBoxImg} source={require('./assets/image/stageAddBtn.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.stageSettingBtn} onPress={() => {console.log('OPERaitng')}}>
                    <Text style={styles.stageSettingBtnText}>설정완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 
export default DetailRecipeSetting;

const styles = StyleSheet.create({
    scrollView:{
        height:'22%'
    },
    stageMain: {
        height: '8.7%',
        marginBottom: 12,
    },  
    contentContainer: {
        marginBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        minHeight: 800,
    },
    secondsBox: {
        borderColor: 'gray',
        // borderWidth: 1,
        height: '63%',
        width: '80%',
    },
    stageSettingBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    stageSettingBtn: {
        width: '91%',
        height: '65%',
        borderRadius: 5, 
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#753CEF',
        marginLeft: 21,
    },
    stageAddBoxImg: {
        width: '90%',
        height: '100%',
        resizeMode: 'center',
    }, 
    addBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginLeft: 2
    },
    stageAddOutBox: {
        width: '80%',
        height: '18%',
    },
    timeText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    timeTextDisable: {
        fontSize: 18,
        color: '#EEEFF0',
        fontWeight: 'bold',
    },  
    stageTimeImg: {
        width: '17%',
        height: '33%',
        marginRight: 5,
        marginTop: 1,
    },
    stageTimeImgDisable: {
        width: '17%',
        height: '33%',
        marginRight: 5,
        marginTop: 1,
        tintColor: '#EEEFF0',
    },
    stageTime: {
        // borderColor: 'gray',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    tempText: {
        borderColor: '#DCDCDC',
        borderRightWidth: 1,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempTextDisabled:{
        borderColor: '#EEEFF0',
        borderRightWidth: 1,
        color: '#EEEFF0',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempText1: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempText1Disabled: {
        color: '#EEEFF0',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempHumBox: {
        flexDirection: 'row',
        height: '100%',
    },
    leftInnerBox: {
        // borderColor: 'gray',
        // borderWidth: 1,
        width : '80%',
        height: '60%',
        },
    leftBox: {
        width: '77%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },  
    stageText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    stageTextDisabled: {
        color: '#E7E7EC',
        fontWeight: 'bold'
    },
    mainBox: {
        width: '100%',
        height: '74%', 
        alignItems:'center',
        marginTop: 10,
    },
    stageBtn: {
        width: '85%',
        height: '100%',
        borderRadius: 5, 
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 23,
        backgroundColor: 'white',
        marginTop: 5,
    },
    stageBox: {
        // borderColor: 'gray',
        // borderWidth: 1,
        width: '29%',
        height: '100%',
        backgroundColor: '#753CEF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 10,
    },  
    stageBoxDis: {
        width: '29%',
        height: '100%',
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 10,
    },
    stageActive: {
        width:'27.5%',
        height: '40.0%',
    },
})